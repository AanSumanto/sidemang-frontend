import Axios from 'axios';
import { GET_NOTIFICATION } from '../constants/notificationConstants';

const API_URL = process.env.REACT_APP_URL_DEVELOPMENT;

export const getNotifications = () => (dispatch) => {
  Axios.get(`${API_URL}/api/notifications`).then((res) => {
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data,
    });
  });
};

// export const listNotifications = () => async (dispatch) => {
//     try {
//         const { data } = await Axios.get('/api/notifications');
//         dispatch({ type: GET_NOTIFICATION, payload: data });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message;
//     };
// };

// export const createNotification = (notification) => (dispatch) => {
//     axios.post('/api/notifications/add', { notification }).then((res) => {
//         dispatch({
//             type: CREATE_NOTIFICATION,
//             payload: res.data,
//         })
//     })
// }

// export const deleteNotification = (id) => (dispatch) => {
//     axios.post('/api/notifications/delete', { id }).then((res) => {
//         dispatch({
//             type: DELETE_NOTIFICATION,
//             payload: res.data,
//         })
//     })
// }

// export const deleteAllNotification = () => (dispatch) => {
//     axios.post('/api/notifications/delete-all').then((res) => {
//         dispatch({
//             type: DELETE_ALL_NOTIFICATION,
//             payload: res.data,
//         })
//     })
// }
