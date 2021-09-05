import { SET_TOKEN, LOGIN_ERRORS } from "../constant";
import axiosinstance from "../../config/axios"


export const login = (User) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosinstance.post('/auth/login', User);
            localStorage.setItem('jwt', data.authToken);
            dispatch({ type:SET_TOKEN, payload: data.authToken});
        } catch (error) {
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.error });
        }

    }
}
