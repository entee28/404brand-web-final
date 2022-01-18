import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const cartLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const initialState = {
    cart: {
        cartItems: cartLocalStorage
    }
};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware),
));

export default store;