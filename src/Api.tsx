//Base URL
const base_url = "http://localhost:1337";

//All Products
const products = `/api/products`;
const productsImages = `/api/products?populate=*`;
const productsCategorys = `/api/products?populate=categorys`;
const categorys = `/api/categorys`;




export const productsURL = () => `${base_url}${products}`;
export const productsCategorysURL = () => `${base_url}${productsCategorys}`;
export const categorysURL = () => `${base_url}${categorys}`;


export const ProductsURLWithID = (id: number) => `${base_url}${products}/${id}`;

export const productsImgURL = () => `${base_url}${productsImages}`;
