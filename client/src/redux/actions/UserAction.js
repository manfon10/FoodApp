import axios from 'axios';
import GetConfig from '../../utils/GetConfig';

export const userActions = {
   setUpdateUser: "UPDATE_USER_DATA"
}

export const setUpdateUser = () => ({
    type: userActions.setUpdateUser
});

export const updateDataUserThunk = (id, data) => {
    return dispatch => {
        axios.patch(`http://localhost:2920/api/v1/users/update_user/${id}`, {data}, GetConfig())
            .then( res => dispatch(setUpdateUser()))
    }
}