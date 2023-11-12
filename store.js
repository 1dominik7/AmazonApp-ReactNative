import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import FavReducer from "./redux/FavReducer";

export default configureStore({
    reducer:{
        cart: CartReducer,
        fav: FavReducer
    }
})