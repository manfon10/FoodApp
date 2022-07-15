import axios from 'axios';
import GetConfig from '../../utils/GetConfig';

export const foodsActions = {
    setFoods: "GET_FOODS",
    setFoodById: "GET_FOOD_BY_ID",
    setFoodByCategory: "GET_FOODS_BY_CATEGORY",
    setFoodFilter: "GET_FILTER_FOODS",
    setFoodAll: "GET_ALL_FOODS",
    setFoodCreate: "CREATE_FOOD"
}

export const setFoods = foods => ({
    type: foodsActions.setFoods,
    payload: foods
});

export const setFoodById = food => ({
    type: foodsActions.setFoodById,
    payload: food
});

export const setFoodByCategory = foods => ({
    type: foodsActions.setFoodByCategory,
    payload: foods
});

export const setFoodFilter = foods => ({
    type: foodsActions.setFoodFilter,
    payload: foods
});

export const setFoodCreate = () => ({
    type: foodsActions.setFoodCreate
});

export const getFoodsThunk = () => {
    return dispatch => {
        axios.get('http://localhost:2920/api/v1/food')
            .then( res => {
                dispatch(setFoods(res.data.foods))
                dispatch(setFoodFilter(res.data.foods))
            })
    }
}

export const getFoodByIdThunk = (id) => {
    return dispatch => {
        return axios.get(`http://localhost:2920/api/v1/food/${id}`)
            .then( res => dispatch(setFoodById(res.data.food)))
    }
}

export const getFoodByCategoryThunk = (id) => {
    return dispatch => {
        axios.get(`http://localhost:2920/api/v1/food/category/${id}`)
            .then( res => dispatch(setFoodByCategory(res.data.foods)))
    }
}

export const createFoodThunk = (data) => {
    return dispatch => {
        axios.post(`http://localhost:2920/api/v1/food`, data, GetConfig())
            .then( res => dispatch(setFoodCreate()))
    }
}