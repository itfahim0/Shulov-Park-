export const CartService = {
    cart: [],

    init() {
        const saved = localStorage.getItem('shulov_cart');
        if (saved) {
            this.cart = JSON.parse(saved);
        }
    },

    getCart() {
        return this.cart;
    },

    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty++;
        } else {
            this.cart.push({ ...product, qty: 1 });
        }
        this._save();
    },

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this._save();
    },

    updateQty(id, change) {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                this.removeFromCart(id);
            } else {
                this._save();
            }
        }
    },

    clearCart() {
        this.cart = [];
        this._save();
    },

    getTotal() {
        return this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    },

    getItemCount() {
        return this.cart.reduce((acc, item) => acc + item.qty, 0);
    },

    _save() {
        localStorage.setItem('shulov_cart', JSON.stringify(this.cart));
        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('cart-updated'));
    }
};
