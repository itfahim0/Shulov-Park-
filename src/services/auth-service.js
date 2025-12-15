import { auth } from '../config/firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export const AuthService = {
    // Current user state
    currentUser: null,

    init(callback) {
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            // Also keep local storage for non-critical UI checks to avoid flicker, 
            // but rely on Firebase for real auth
            if (user) {
                localStorage.setItem('shulov_is_logged_in', 'true');
                localStorage.setItem('shulov_user_email', user.email);
            } else {
                localStorage.removeItem('shulov_is_logged_in');
                localStorage.removeItem('shulov_user_email');
            }
            if (callback) callback(user);
        });
    },

    async login(email, password) {
        // Temp: Handle the old "admin" hardcode securely-ish (or just remove it)
        // For now, we will assume if they type admin/admin123 they want the local admin
        // but for Real Auth we go to Firebase.
        if (email === 'admin' && password === 'admin123') {
            localStorage.setItem('shulov_admin_logged_in', 'true');
            return { user: { email: 'admin' }, isAdmin: true };
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { user: userCredential.user, isAdmin: false };
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    },

    async signup(email, password, name) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // In a real app, we would updateProfile with the name
            return userCredential.user;
        } catch (error) {
            console.error("Signup Error:", error);
            throw error;
        }
    },

    async logout() {
        await signOut(auth);
        localStorage.removeItem('shulov_admin_logged_in');
    },

    isAdmin() {
        // Simplistic check for prototype
        return localStorage.getItem('shulov_admin_logged_in') === 'true';
    }
};
