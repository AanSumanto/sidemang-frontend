import Axios from 'axios';
import {
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNOUT
} from '../constants/userConstants';

export const register = (name, nik, nip, username, email, password) => async (
	dispatch
) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
	try {
		const response = await Axios.post('/api/users/register', {
			name,
			nik,
			nip,
			username,
			email,
			password
		});
		const { user } = response.data;
		dispatch({ type: USER_REGISTER_SUCCESS, payload: user });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
		localStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		const response = await Axios.post('/api/users/login', {
			email,
			password
		});
		const { accessToken, user } = response.data;

		dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
		// setSession(accessToken)
		localStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('user');
	// setSession(null);
	dispatch({ type: USER_SIGNOUT });
};
