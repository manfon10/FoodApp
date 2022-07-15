import axios from 'axios';
import { setFoods } from './FoodActions';

export const appActions = {
    setOpenNav: "OPEN_NAV",
    setCloseNav: "CLOSE_NAV",
    setOpenCart: "OPEN_CART",
    setCloseCart: "CLOSE_CART",
    filterFood: "FILTER_FOODS_BY_NAME",
    setOpenRate: "OPEN_RATE",
    setCloseRate: "CLOSE_RATE"
}

export const setOpenNav = (isOpen) => ({
    type: appActions.setOpenNav,
    payload: isOpen
});

export const setCloseNav = (isClose) => ({
    type: appActions.setCloseNav,
    payload: isClose
});

export const setOpenCart = (isOpen) => ({
    type: appActions.setOpenCart,
    payload: isOpen
});

export const setCloseCart = (isClose) => ({
    type: appActions.setCloseCart,
    payload: isClose
});

export const setOpenRate = (isOpen) => ({
    type: appActions.setOpenRate,
    payload: isOpen
});

export const setCloseRate = (isClose) => ({
    type: appActions.setCloseRate,
    payload: isClose
});

export const filterFood = (foods) => ({
    type: appActions.setCloseCart,
    payload: foods
});

export const filterFoodThunk = (data) => {
    return dispatch => {
        axios.get(`http://localhost:2920/api/v1/food/filter?phrase=${data}`)
            .then( (res) => { 
                dispatch(filterFood())
                dispatch(setFoods(res.data.foods))
            })
    }
}