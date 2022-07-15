import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import categoryReducer from './CategoryReducer';
import foodReducer from './FoodReducer';
import appReducer from './AppReducer';
import cartReducer from './CartReducer';
import orderReducer from './OrderReducer';

const rootReducer = combineReducers({
    user: LoginReducer,
    categories: categoryReducer,
    foods: foodReducer,
    app: appReducer,
    cart: cartReducer,
    orders: orderReducer
});

export default rootReducer;