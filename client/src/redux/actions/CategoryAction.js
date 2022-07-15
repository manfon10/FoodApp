import axios from 'axios';
import GetConfig from '../../utils/GetConfig';

export const categoriesActions = {
    setCategories: "GET_CATEGORIES",
    createCategory: "CREATE_CATEGORY",
    updateCategory: "UPDATE_CATEGORY",
    deleteCategory: "DELETE_CATEGORY",
    setCategoryById: "GET_CATEGORY_BY_ID"
}

export const setCategories = categories => ({
    type: categoriesActions.setCategories,
    payload: categories
});

export const setCategoryById = () => ({
    type: categoriesActions.setCategoryById
});

export const createCategory = () => ({
    type: categoriesActions.createCategory,
});

export const updateCategory = () => ({
    type: categoriesActions.updateCategory,
});

export const deleteCategory = () => ({
    type: categoriesActions.deleteCategory,
});

export const getCategoriesThunk = () => {
    return dispatch => {
        axios.get('http://localhost:2920/api/v1/categories')
            .then( res => dispatch(setCategories(res.data.categories)))
    }
}

export const getCategoriesByIdThunk = (id) => {
    return dispatch => {
        return axios.get(`http://localhost:2920/api/v1/categories/${id}`)
            .finally( res => dispatch(setCategoryById()))
    }
}

export const createCategoryThunk = (data) => {
    return dispatch => {
        axios.post('http://localhost:2920/api/v1/categories', data, GetConfig())
            .then( res => {
                dispatch(createCategory())
                dispatch(getCategoriesThunk())
            })
    }
}

export const updateCategoryThunk = (id, data) => {
    return dispatch => {
        axios.patch(`http://localhost:2920/api/v1/categories/${id}`, data, GetConfig())
            .then( res => {
                dispatch(createCategory())
                dispatch(getCategoriesThunk())
            })
    }
}

export const deleteCategoryThunk = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:2920/api/v1/categories/${id}`, GetConfig())
            .then( res => {
                dispatch(createCategory())
                dispatch(getCategoriesThunk())
            })
    }
}