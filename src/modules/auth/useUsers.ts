import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../../interfaces/interfaces';
import { state } from '../globalState/state';

const API_URL = import.meta.env.VITE_API_URL;

export const useUsers = () => {
    const router = useRouter();
    const token = ref<string | null>(null);
    const error = ref<string | null>(null);
    const user = ref<User | null>(null);

    const name = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');

    const fetchToken = async (email: string, password: string): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const text = await response.text();
                let message = 'Login failed';
                try { message = JSON.parse(text).error || message; } catch { /* HTML response */ }
                throw new Error(message);
            }

            const authResponse = await response.json();
            token.value = authResponse.data.token;
            state.isLoggedIn = true;

            localStorage.setItem('lsToken', authResponse.data.token);
            localStorage.setItem('UserIDToken', authResponse.data.userId);

            router.push('/products');
        } catch (err) {
            error.value = (err as Error).message || 'An error occurred during login';
            state.isLoggedIn = false;
        }
    };

    const registerUser = async (name: string, email: string, password: string): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const text = await response.text();
                let message = 'Registration failed';
                try { message = JSON.parse(text).error || message; } catch { /* HTML response */ }
                throw new Error(message);
            }

            // register returns only the user ID, not a token — user must log in separately
            error.value = null;
        } catch (err) {
            error.value = (err as Error).message || 'An error occurred during registration';
        }
    };

    const logout = (): void => {
        token.value = null;
        user.value = null;
        state.isLoggedIn = false;
        localStorage.removeItem('lsToken');
        localStorage.removeItem('UserIDToken');
    };

    return { token, isLoggedIn: state.isLoggedIn, error, user, name, email, password, fetchToken, registerUser, logout };
}
