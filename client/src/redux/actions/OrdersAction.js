import axios from 'axios';
import GetConfig from '../../utils/GetConfig';
import { setCloseRate } from './AppAction';

export const ordersActions = {
    setOrdersByUser: "GET_ORDERS_BY_USER",
    setOrderQualification: "FOOD_QUALIFICATION_SELECT",
    setRateFood: "RATE_FOOD"
}

export const setOrdersByUser = orders => ({
    type: ordersActions.setOrdersByUser,
    payload: orders
});

export const setOrderQualification = idFood => ({
    type: ordersActions.setOrderQualification,
    payload: idFood
});

export const setRateFood = () => ({
    type: ordersActions.setRateFood,
});

export const getOrderByUserThunk = () => {
    return dispatch => {
        axios.get('http://localhost:2920/api/v1/orders/user', GetConfig())
            .then( res => dispatch(setOrdersByUser(res.data.orders)))
    }
}

export const rateFoodThunk = (idFood, data) => {
    return dispatch => {
        axios.post(`http://localhost:2920/api/v1/food/${idFood}/food_rate`, data, GetConfig())
            .then( res => {
                dispatch(setRateFood())
                dispatch(setCloseRate(false))
                dispatch(getOrderByUserThunk())
            })
    }
}