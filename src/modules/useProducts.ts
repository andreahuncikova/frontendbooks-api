import { ref } from 'vue';
import type { newProduct, Product } from '../interfaces/interfaces';

const API_URL = import.meta.env.VITE_API_URL;

export const useProducts = () => {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const products = ref<Product[]>([]);

    const fetchProducts = async (): Promise<void> => {
        loading.value = true;
        try {
            const response = await fetch(`${API_URL}/api/books`);
            if (!response.ok) throw new Error('Failed to fetch products');
            products.value = await response.json();
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    };

    const getTokenAndUserId = (): { token: string; userId: string } => {
        const token = localStorage.getItem('lsToken');
        if (!token) throw new Error('No token found');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        if (!userId) throw new Error('No user ID found');
        return { token, userId };
    };

    const validateProduct = (product: newProduct): void => {
        if (!product.title) throw new Error('Title is required');
        if (!product.author) throw new Error('Author is required');
    };

    const setDefaultProducts = (product: newProduct, userId: string) => ({
        title: product.title,
        author: product.author,
        image: product.image || 'https://picsum.photos/500/500',
        price: product.price || 0,
        genre: product.genre || 'Unknown',
        publishedYear: product.publishedYear || new Date().getFullYear(),
        pages: product.pages || 0,
        summary: product.summary || 'New product summary',
        available: product.available || true,
        _createdBy: userId,
        hasDiscount: product.hasDiscount || false,
        discount: product.discount || 0,
        hidden: product.hidden || false
    });

    const addProduct = async (product: Omit<Product, '_id'>): Promise<void> => {
        try {
            const { token, userId } = getTokenAndUserId();
            validateProduct(product);
            const productWithDefaults = setDefaultProducts(product, userId);

            const response = await fetch(`${API_URL}/api/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify(productWithDefaults)
            });

            if (!response.ok) {
                const text = await response.text();
                let message = 'Failed to add product';
                try { message = JSON.parse(text).message || message; } catch { /* HTML response */ }
                throw new Error(message);
            }

            const createdProduct: Product = await response.json();
            products.value.push(createdProduct);
            await fetchProducts();
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    const deleteProduct = async (id: string): Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            const response = await fetch(`${API_URL}/api/books/${id}`, {
                method: 'DELETE',
                headers: { 'auth-token': token }
            });
            if (!response.ok) throw new Error('Failed to delete product');
            products.value = products.value.filter(p => p._id !== id);
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            const response = await fetch(`${API_URL}/api/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) throw new Error('Failed to update product');
            await fetchProducts();
        } catch (err) {
            error.value = (err as Error).message;
        }
    };

    return { error, loading, products, fetchProducts, deleteProduct, addProduct, updateProduct, getTokenAndUserId };
}
