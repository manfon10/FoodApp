import { cartActions } from '../actions';

const INITIAL_STATE = {
    foodsInCart: []
}

const cartReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActions.getFoodsCart:
            return {
                ...state,
                foodsInCart: action.payload,
            }
    
        default:
            return state;
    }
}

export default cartReducer;