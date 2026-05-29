import { ref, watch, computed } from 'vue'
import type { CartItem, OrderItems } from '../../interfaces/interfaces'

// module-level — shared across all components
const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
const orders = ref<OrderItems[]>(JSON.parse(localStorage.getItem('orders') || '[]'));
const code = ref<string>('');
const cartCount = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0));

watch(cart, (val) => { localStorage.setItem('cart', JSON.stringify(val)); }, { deep: true });
watch(orders, (val) => { localStorage.setItem('orders', JSON.stringify(val)); }, { deep: true });

export const useCart = () => {

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.value.find(item => item._id === product._id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: string) => {
    const index = cart.value.findIndex(item => item._id === productId)
    if (index !== -1) {
      cart.value = cart.value.filter(item => item._id !== productId)
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.value.find(item => item._id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) removeFromCart(productId)
    }
  }

  const cartTotal = (): number =>
    Number(cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));

  const cartTotalIndividualProduct = (itemId: string): number => {
    const item = cart.value.find(item => item._id === itemId);
    return item ? item.price * item.quantity : 0;
  };

  const salesTax = (): number =>
    Math.round(cartTotal() * 0.10 * 100) / 100;

  const couponCodeDiscount = (codes: string): number =>
    codes === 'DISCOUNT' ? 0.9 : 1;

  const grandTotal = (): number =>
    Number(((cartTotal() + salesTax()) * couponCodeDiscount(code.value)).toFixed(2));

  const getUserName = (): string => {
    const token = localStorage.getItem('lsToken');
    if (!token) return 'Guest';
    try { return JSON.parse(atob(token.split('.')[1])).name || 'Guest'; }
    catch { return 'Guest'; }
  };

  const checkOutBuy = () => {
    const newOrder: OrderItems = {
      _id: `order_${Date.now()}`,
      orderDate: new Date().toISOString(),
      total: grandTotal(),
      orderStatus: 'Processing',
      userName: getUserName(),
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
  }

  return {
    cart,
    cartCount,
    orders,
    code,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartTotalIndividualProduct,
    salesTax,
    grandTotal,
    checkOutBuy
  };
}
