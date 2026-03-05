export type Product = {
  id: string,  
  title: string,
  author: string,
  image: string,
  price: number,
  genre: string,
  publishedYear: number,
  pages: number,
  summary: string,
  available: boolean,
  _createdBy: string
}

export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  registerDate: string
}