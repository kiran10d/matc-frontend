//Base URL
const base_url = "http://localhost:1337";

//All Products
const products = `/api/products`;
const productsImages = `/api/products?populate=*`;


export const productsURL = () => `${base_url}${products}`;
export const deleteProductsURL = (id: number) => `${base_url}${products}/${id}`;

export const productsImgURL = () => `${base_url}${productsImages}`;
