const defaultProducts = [
    { id: 1, name: "Fresh Organic Bananas", category: "Fruits", price: 120, originalPrice: 150, image: "images/bananas.png", discount: "20% OFF" },
    { id: 2, name: "Farm Fresh Eggs (12pcs)", category: "Dairy & Eggs", price: 140, originalPrice: 160, image: "images/eggs.png", discount: null },
    { id: 3, name: "Premium Basmati Rice (5kg)", category: "Staples", price: 650, originalPrice: 750, image: "images/rice.png", discount: "Save 100" },
    { id: 4, name: "Fresh Tomatoes (1kg)", category: "Vegetables", price: 60, originalPrice: 80, image: "images/tomatoes.png", discount: "Fresh" },
    { id: 5, name: "Whole Milk (1L)", category: "Dairy", price: 90, originalPrice: null, image: "images/milk.png", discount: null },
    { id: 6, name: "Crispy Potato Chips", category: "Snacks", price: 25, originalPrice: null, image: "images/chips.png", discount: null },
    { id: 7, name: "Green Tea Pack", category: "Beverages", price: 220, originalPrice: 250, image: "images/tea.png", discount: "12% OFF" },
    { id: 8, name: "Cooking Oil (1L)", category: "Staples", price: 180, originalPrice: 195, image: "images/oil.png", discount: null }
];

const defaultCategories = [
    { name: "Fruits", icon: "fa-apple-alt" },
    { name: "Vegetables", icon: "fa-carrot" },
    { name: "Dairy & Eggs", icon: "fa-egg" },
    { name: "Staples", icon: "fa-bread-slice" },
    { name: "Snacks", icon: "fa-cookie-bite" },
    { name: "Beverages", icon: "fa-coffee" }
];

export const DataService = {
    getProducts() {
        const stored = localStorage.getItem('shulov_products');
        return stored ? JSON.parse(stored) : defaultProducts;
    },

    getCategories() {
        const stored = localStorage.getItem('shulov_categories');
        return stored ? JSON.parse(stored) : defaultCategories;
    },

    getDailyPrices() {
        return JSON.parse(localStorage.getItem('shulov_daily_prices') || '[]');
    },

    // In a real app, these would be admin-only API calls
    saveProduct(product) {
        let products = this.getProducts();
        if (product.id) {
            const idx = products.findIndex(p => p.id === product.id);
            if (idx !== -1) products[idx] = product;
        } else {
            product.id = Date.now(); // Better ID generation
            products.push(product);
        }
        localStorage.setItem('shulov_products', JSON.stringify(products));
    },

    deleteProduct(id) {
        let products = this.getProducts().filter(p => p.id !== id);
        localStorage.setItem('shulov_products', JSON.stringify(products));
    }
};
