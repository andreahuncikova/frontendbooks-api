import { ref } from 'vue';
import type { newProduct, Product } from '../interfaces/interfaces';


export const useProducts = () => {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const products = ref<Product[]>([]);

    const fetchProducts = async () : Promise<void> => {
        loading.value = true;

        try {
            const response = await fetch('https://api-e7dw.onrender.com/api/books');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: Product[] = await response.json();
            products.value = data;
            console.log('Fetched products:', products.value);
        }

        catch (err) {
           error.value = (err as Error).message; 

        } finally {
            loading.value = false;
        }
    };



    const getTokenAndUserId = (): { token: string; userId: string } => {
        const token = localStorage.getItem('lsToken');
            

            if (!token) {
                throw new Error('No token found');
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id;

            if (!userId) {
                throw new Error('No user ID found');
            }

            return { token, userId };
    };

    const validateProduct = (product: newProduct): void => {
        if (!product.title) {
            throw new Error('Title is required');
        }
        if (!product.author) {  
        throw new Error('Author is required');
    }
    };


    const setDefaultProducts = (product: newProduct, userId: string) => {
        return {
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
        }
    }

    const addProduct = async (product: Omit<Product, '_id'>) : Promise<void> => {
        try {
            const { token, userId } = getTokenAndUserId();
            validateProduct(product);
            const productWithDefaults = setDefaultProducts(product, userId);

            console.log('Sending product:', JSON.stringify(productWithDefaults));

            const response = await fetch('https://api-e7dw.onrender.com/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(productWithDefaults) 
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log('Server error response:', JSON.stringify(errorResponse));
                throw new Error(errorResponse.message || 'Failed to add product');
            }

            const createdProduct: Product = await response.json();
            products.value.push(createdProduct);
            console.log('Product added successfully:', createdProduct);
            await fetchProducts(); // Refresh the product list after adding a new product
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    };

    const deleteProductFromServer = async (id: string, token: string) : Promise<void> => {
            const response = await fetch(`https://api-e7dw.onrender.com/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': token
                }
            });

            if (!response.ok) {
                console.log('Failed to delete product with ID:', id);
                throw new Error('Failed to delete product');
            }        
        };
    
    const removeProductFromState = (id: string): void => {
        products.value = products.value.filter(product => product._id !== id);
        console.log('Product deleted successfully: ' + id);
    };

    const deleteProduct = async (id: string) : Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            await deleteProductFromServer(id, token);
            removeProductFromState(id);

            console.log('Deleting product with ID:', id);
            
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    };

    const updateProductOnServer = async (id: string, updatedProduct: Partial<Product>, token: string): Promise<Product> => {
        const response = await fetch(`https://api-e7dw.onrender.com/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const responseText = await response.text();
        try {            
            return JSON.parse(responseText);
        }
        catch (err) {
            return { message: responseText } as unknown as Product;
        }


        return await response.json();
    };      

    const updateProductInState = (id: string, updatedProduct: Product) => {
        const index = products.value.findIndex(product => product._id === id)
        if (index !== -1) {
            products.value[index] = updatedProduct;
        }
    }

    const updateProduct = async (id: string, updatedProduct: Partial<Product>) : Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            const updatedProductResponse = await updateProductOnServer(id, updatedProduct, token);
            updateProductInState(id, updatedProductResponse);
            await fetchProducts(); // Refresh the product list after updating a product
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    };

    return {
        error,
        loading,
        products,
        fetchProducts,
        deleteProduct,
        addProduct,
        updateProduct,
        getTokenAndUserId,
    };
}