import { appActions } from '../actions';

const INITIAL_STATE = {
    isOpenNav: false,
    isOpenCart: false,
    isOpenRate: false
}

const appReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appActions.setOpenNav:
            return {
                ...state,
                isOpenNav: action.payload,
            }

        case appActions.setCloseNav:
            return {
                ...state,
                isOpenNav: action.payload,
            }

        case appActions.setOpenCart:
            return {
                ...state,
                isOpenCart: action.payload,
            }

        case appActions.setCloseCart:
            return {
                ...state,
                isOpenCart: action.payload,
            }

        case appActions.setOpenRate:
            return {
                ...state,
                isOpenRate: action.payload,
            }

        case appActions.setCloseRate:
            return {
                ...state,
                isOpenRate: action.payload,
            }
    
        default:
            return state;
    }
}

export default appReducer;