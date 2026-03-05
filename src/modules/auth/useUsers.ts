import { ref } from 'vue';
import type { User } from '../../interfaces/interfaces';

export const useUsers = () => {
    const token = ref<string | null>(null);
    const isLoggedIn = ref<boolean>(false);
    const error = ref<string | null>(null);
    const user = ref<User | null>(null);

    const name = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');

    // fetchToken
    const fetchToken = async (email: string, password: string): Promise<void> => {
        try {
            const response = await fetch('https://api-e7dw.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('lsToken') || ''
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error(errorResponse.error || 'Unknown error');
                throw new Error('No data available');
            }

            const authResponse = await response.json();
            token.value = authResponse.data.token;
            user.value = authResponse.data.user;
            isLoggedIn.value = true;

            localStorage.setItem('lsToken', authResponse.data.token);
            localStorage.setItem('UserIDToken', authResponse.data.userID);
            console.log('Login successful:' + JSON.stringify(authResponse));
            console.log('Token stored in localStorage:', authResponse.data.token);
        }

        catch (err) {
            error.value = (err as Error).message || 'An error occurred during login';
            isLoggedIn.value = false;
        }
    };



    // registerUser
    const registerUser = async (name: string, email: string, password: string): Promise<void> => {
        try {
            const response = await fetch('https://api-e7dw.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) {
                throw new Error('No data available');
            }

            const authResponse = await response.json();
            token.value = authResponse.data.token;
            user.value = authResponse.data.user;

            localStorage.setItem('UserIDToken', authResponse.data.userID);
            console.log('Registration successful:' + JSON.stringify(authResponse));
        }

        catch (err) {
            error.value = (err as Error).message || 'An error occurred during registration';
            isLoggedIn.value = false;
        }
    };

    // logout function
    const logout = (): void => {
        token.value = null;
        user.value = null;
        isLoggedIn.value = false;
        localStorage.removeItem('lsToken');
        console.log('User logged out successfully');
    };


    return {
        token,
        isLoggedIn,
        error,
        user,
        name,
        email,
        password,
        fetchToken,
        registerUser,
        logout
    };
}
