import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import errorReducer from "./errorReducer";
import productDetailsReducer from "./productDetailsReducer";
import productReducer from "./productReducer";
import userDetailsReducer from "./userDetailsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  error: errorReducer,
  auth: authReducer,
  users: userReducer,
  userDetails: userDetailsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
