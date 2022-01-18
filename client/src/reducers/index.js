import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productDetailsReducer from "./productDetailsReducer";
import productReducer from './productReducer';

export default combineReducers({
    product: productReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer
})