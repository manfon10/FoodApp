import { ordersActions } from '../actions';

const INITIAL_STATE = {
    orderByUserList: [],
    idFoodQualication: 0
}

const orderReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ordersActions.setOrdersByUser:
            return {
                ...state,
                orderByUserList: action.payload,
            }

        case ordersActions.setOrderQualification:
            return {
                ...state,
                idFoodQualication: action.payload,
            }
    
        default:
            return state;
    }
}

export default orderReducer;