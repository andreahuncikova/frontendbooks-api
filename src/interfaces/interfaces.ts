export type Product = {
  _id: string,  
  title: string,
  author: string,
  image: string,
  price: number,
  genre: string,
  publishedYear: number,
  pages: number,
  summary: string,
  available: boolean,
  _createdBy: string,
  hasDiscount?: boolean;
  discount?: number;
  hidden?: boolean;
}

export type newProduct = Omit<Product, '_id'> & {
  _createdBy: string;
}


export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  registerDate: string
}

export type CartItem = {
  _id: string,
  title: string,
  price: number,
  quantity: number,
  image: string,
}

export type OrderItems = {
  _id: string,
  orderDate: string,
  total: number,
  userName: string,
  orderStatus: string,
  orderNumber: string,
  orderLine: Array<{book: Product, quantity: number}>
}