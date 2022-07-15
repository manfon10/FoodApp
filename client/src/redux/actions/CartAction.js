import axios from 'axios';
import GetConfig from '../../utils/GetConfig';
import { setCloseCart } from'./AppAction';

export const cartActions = {
    setFoodCart: "ADD_FOOD_TO_CART",
    getFoodsCart: "GET_FOODS_IN_CART",
    newQuantityFood: "NEW_QUANTITY_FOOD",
    deleteFoodInCart: "DELETE_FOOD_IN_CART",
    resetAmountFoodInCart: "RESET_QUANTITY_FOOD_IN_CART",
    purchaseCart: "PURCHASE_CART"
}

export const setFoodCart = () => ({
    type: cartActions.setFoodCart
});

export const getFoodsCart = (foods) => ({
    type: cartActions.getFoodsCart,
    payload: foods
});

export const newQuantityFood = () => ({
    type: cartActions.newQuantityFood
});

export const deleteFoodInCart = () => ({
    type: cartActions.deleteFoodInCart
});

export const resetAmountFoodInCart = () => ({
    type: cartActions.resetAmountFoodInCart
});

export const purchaseCart = () => ({
    type: cartActions.purchaseCart
});

export const addFoodCartThunk = (data) => {
    return dispatch => {
        axios.post('http://localhost:2920/api/v1/cart/add_food', data, GetConfig())
            .then( () => dispatch(setFoodCart()))
    }
}

export const getFoodsInCartThunk = () => {
    return dispatch => {
        axios.get('http://localhost:2920/api/v1/cart', GetConfig())
            .then( res => dispatch(getFoodsCart(res.data.foods)))
    }
}

export const newQuantityFoodThunk = (data) => {
    return dispatch => {
        axios.patch('http://localhost:2920/api/v1/cart/update_cart', data, GetConfig())
            .then( res => {
                dispatch(newQuantityFood())
                dispatch(getFoodsInCartThunk())
            })
    }
}

export const deleteFoodInCartThunk = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:2920/api/v1/cart/${id}`, GetConfig())
            .then( res => {
                dispatch(deleteFoodInCart())
                dispatch(getFoodsInCartThunk())
            })
    }
}

export const resetAmountFoodInCartThunk = (id) => {
    return dispatch => {
        axios.patch(`http://localhost:2920/api/v1/cart/reset_amount/${id}`, {}, GetConfig())
            .then( res => {
                dispatch(resetAmountFoodInCart())
                dispatch(getFoodsInCartThunk())
            })
    }
}

export const purchaseCartThunk = () => {
    return dispatch => {
        axios.post('http://localhost:2920/api/v1/cart/purchase', {}, GetConfig())
            .then( () => { 
                dispatch(purchaseCart())
                dispatch(setCloseCart(false))
            })
    }
}