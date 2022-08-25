import { configureStore } from "@reduxjs/toolkit";
// import ProductsIdSlice from './ProductsIdSlice';
import ProductsSlice from "./ProductsSlice";
import ProductsCategorySlice from "./ProductsCategorySlice";
import CategorySlice from "./CategorySlice";

export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    productsCategory: ProductsCategorySlice,
    category: CategorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
