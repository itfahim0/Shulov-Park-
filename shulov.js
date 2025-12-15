import { DataService } from './src/services/data-service.js';
import { CartService } from './src/services/cart-service.js';
import { AuthService } from './src/services/auth-service.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    CartService.init();
    AuthService.init(user => {
        updateAuthUI(user);
    });

    // UI Renderers requiring DOM access
    renderCategories();
    renderProducts();
    renderDailyPrices();
    updateCartCount();

    // Event Listeners for Search
    setupSearch();
});

// Expose functions to global window for HTML onclick attributes (legacy support)
// In a pure framework approach we would attach event listeners in JS, 
// but refactoring all HTML onclicks is too risky for this turn.
window.addToCart = (id, btn) => {
    const products = DataService.getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        CartService.addToCart(product);
        animateButton(btn);
    }
};

window.filterByCategory = (category) => {
    renderProducts(category === 'All' ? '__ALL__' : category);
};

// Listen for Cart Updates
window.addEventListener('cart-updated', () => {
    updateCartCount();
});

function updateCartCount() {
    const el = document.querySelector('.cart-count');
    if (el) el.textContent = CartService.getItemCount();
}

function updateAuthUI(user) {
    // If we were on index.html, we might change the "Account" link or icon
    // For now, no specific UI changes on home page needed
}

function renderCategories() {
    const grid = document.querySelector('.category-grid');
    if (!grid) return;

    const categories = DataService.getCategories();
    const allCard = `
        <div class="category-card" onclick="filterByCategory('All')">
            <div class="cat-icon"><i class="fas fa-th-large"></i></div>
            <h3>All Products</h3>
        </div>`;

    const catCards = categories.map(cat => `
        <div class="category-card" onclick="filterByCategory('${cat.name}')">
            <div class="cat-icon"><i class="fas ${cat.icon}"></i></div>
            <h3>${cat.name}</h3>
        </div>`).join('');

    grid.innerHTML = allCard + catCards;
}

function renderProducts(filterText = '') {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';
    const products = DataService.getProducts();

    const getCardHelper = (p) => `
        <div class="product-card">
            <div class="product-image">
                ${(p.originalPrice && p.originalPrice > p.price) ? `<span class="discount-badge">৳${p.originalPrice - p.price} OFF</span>` : ''}
                <img src="${p.image}" loading="lazy" alt="${p.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">
                    ৳${p.price}
                    ${p.originalPrice ? `<span class="original-price">৳${p.originalPrice}</span>` : ''}
                </div>
                <button class="add-btn" onclick="addToCart(${p.id}, this)">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>`;

    let filtered = products;
    if (filterText && filterText !== '__ALL__') {
        const lower = filterText.toLowerCase();
        filtered = products.filter(p => p.name.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower));

        if (filtered.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:2rem">No products found.</div>';
            return;
        }

        container.innerHTML = `
            <h2 class="section-title">Result: ${filterText}</h2>
            <div class="product-grid">${filtered.map(getCardHelper).join('')}</div>
        `;
    } else if (filterText === '__ALL__') {
        container.innerHTML = `
            <h2 class="section-title">All Products</h2>
            <div class="product-grid">${products.map(getCardHelper).join('')}</div>
        `;
    } else {
        // Default grouped view
        const cats = [...new Set(products.map(p => p.category))];
        cats.forEach(c => {
            const pList = products.filter(p => p.category === c);
            container.insertAdjacentHTML('beforeend', `
                <div style="margin-bottom:3rem;">
                    <h2 class="section-title">${c}</h2>
                    <div class="product-grid">${pList.map(getCardHelper).join('')}</div>
                </div>
            `);
        });
    }
}

function renderDailyPrices() {
    const container = document.getElementById('daily-prices-container');
    const section = document.getElementById('daily-prices-section');
    if (!container || !section) return;

    const prices = DataService.getDailyPrices();
    if (prices.length === 0) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';

    const html = prices.map(item => `
        <div class="daily-price-card">
            <div class="dp-name">${item.name}</div>
            <div class="dp-price">৳${item.price}</div>
            <div class="dp-unit">per ${item.unit}</div>
        </div>`).join('');

    container.innerHTML = `<div class="marquee-track">${html}${html}${html}${html}</div>`;
}

function setupSearch() {
    const input = document.querySelector('.search-bar input');
    const dropdown = document.querySelector('.search-dropdown');

    if (input) {
        input.addEventListener('input', (e) => {
            const val = e.target.value;
            renderProducts(val);

            // Dropdown logic
            if (!dropdown) return;
            if (!val) { dropdown.classList.remove('active'); return; }

            const matches = DataService.getProducts().filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
            if (matches.length === 0) {
                dropdown.innerHTML = '<div style="padding:1rem">No results</div>';
            } else {
                dropdown.innerHTML = matches.map(p => `
                    <div class="search-item" onclick="window.location.href='index.html?search=${encodeURIComponent(p.name)}'">
                        <img src="${p.image}" width="40">
                        <div>
                            <h4>${p.name}</h4>
                            <span>${p.category}</span>
                        </div>
                    </div>`).join('');
            }
            dropdown.classList.add('active');
        });
    }
}

function animateButton(btn) {
    const originalText = btn.innerHTML;
    const originalBg = btn.style.background;
    const originalColor = btn.style.color;

    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    btn.style.background = '#10B981';
    btn.style.color = 'white';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = originalBg;
        btn.style.color = originalColor;
    }, 2000);
}
