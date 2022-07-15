import { foodsActions } from '../actions';

const INITIAL_STATE = {
    foodsList: [],
    foodDetails: [],
    foodsCategory: [],
    foodsFilter: [] 
}

const foodReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case foodsActions.setFoods:
            return {
                ...state,
                foodsList: action.payload,
            }

        case foodsActions.setFoodById:
            return {
                ...state,
                foodDetails: action.payload,
            }

        case foodsActions.setFoodByCategory:
            return {
                ...state,
                foodsCategory: action.payload,
            }

        case foodsActions.setFoodFilter:
            return {
                ...state,
                foodsFilter: action.payload,
            }
    
        default:
            return state;
    }
}

export default foodReducer;