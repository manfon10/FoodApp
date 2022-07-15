import { categoriesActions } from '../actions';

const INITIAL_STATE = {
    categoryList: []
}

const categoryReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case categoriesActions.setCategories:
            return {
                ...state,
                categoryList: action.payload,
            }
    
        default:
            return state;
    }
}

export default categoryReducer;