import { combineReducers } from 'redux';
import notificationReducer from './NotificationReducer';

const RootReducer = combineReducers({
	notifications: notificationReducer
});

export default RootReducer;
