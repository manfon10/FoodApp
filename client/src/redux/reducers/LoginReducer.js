import { loginActions } from '../actions';

const INITIAL_STATE = {
    userInfo: [],
    infoUser: "",
    userError: "",
    isLoged: false
}

const LoginReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case loginActions.setUserInfo:
            return {
                ...state,
                userInfo: action.payload,
                isLoged: true
            }

        case loginActions.setUserError:
            return {
                ...state,
                userError: action.payload
            }

        case loginActions.setUserSignUp:
            return {
                ...state,
                infoUser: action.payload
            }
    
        default:
            return state;
    }
}

export default LoginReducer;