import { ref, watch
 } from 'vue'

import type { CartItem, OrderItems } from '../../interfaces/interfaces'

export const useCart = () => {
  const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.value.find(item => item._id === product._id)
    if (existingItem) {
      existingItem.quantity += 1
      console.log('Product quantity updated in cart:', existingItem)
    } else {
        cart.value.push({ ...product, quantity: 1 })
        console.log('Product added to cart:', product)
    }
    localStorage.setItem('cart', JSON.stringify(cart.value))
    console.log('Current cart state:', cart.value)
  }


const removeFromCart = (productId: string) => {
  const existingItem = cart.value.findIndex(item => item._id === productId)
  if (existingItem) {
    cart.value = cart.value.filter(item => item._id !== productId)
    localStorage.setItem('cart', JSON.stringify(cart.value))
    }
}

const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.value.find(item => item._id === productId)
    localStorage.setItem('cart', JSON.stringify(cart.value))
    if (item) {
    item.quantity = quantity
    if (item.quantity <= 0) {
      removeFromCart(productId)}
      else {
      localStorage.setItem('cart', JSON.stringify(cart.value))
  }
  }
  console.log('Updated cart state:', cart.value)
  }

  const cartTotal = (): number => {
        return Number(cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
    }

  const cartTotalIndividualProduct = (itemId: string) => {
        const item = cart.value.find(item => item._id === itemId);
        return item ? item.price * item.quantity : 0;
    };

    const salesTax = (): number => {
        const taxRates = 0.25
        return Math.round(cartTotal() * taxRates * 100) / 100;
    }

    const code = ref<string>('');

    const couponCodeDiscount =(codes: string) => {
            const couponCodeAccepted = codes === 'DISCOUNT';
            return couponCodeAccepted ? 0.9 : 1;
    }

    const grandTotal = (): number => {
        return Number(((cartTotal() + salesTax()) * couponCodeDiscount(code.value)).toFixed(2));

    }

    const orders = ref<OrderItems[]>(JSON.parse(localStorage.getItem('orders') || '[]'));

     watch(orders, (newOrders) => {
        localStorage.setItem('orders', JSON.stringify(newOrders));
    }, { deep: true });

     const checkOutBuy = () => {
        const newOrder: OrderItems = {
            _id: `order${orders.value.length + 1}`,
            orderDate: new Date().toISOString(),
            total: cartTotal(),
            orderStatus: 'Processing',
            userName: 'John Doe',
            orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
            orderLine: cart.value.map(item => ({
                book: {
                    _id: item._id,
                    title: item.title,
                    author: '',
                    image: item.image,
                    price: item.price,
                    genre: '',
                    publishedYear: 0,
                    pages: 0,
                    summary: '',
                    available: true,
                    _createdBy: '',
                    discount: 0,
                    hidden: false,
                    hasDiscount: false
                },
                quantity: item.quantity
            }))
                
        };
        orders.value.push(newOrder);
        cart.value = [];
        localStorage.setItem('cart', JSON.stringify(cart.value));
        console.log('Order placed:', orders.value);
        localStorage.setItem('orders', JSON.stringify(orders.value));
    }

  return { 
    cart, 
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartTotalIndividualProduct,
    salesTax,
    code,
    grandTotal,
    orders,
    checkOutBuy
};
}

