import {
  CREATE_NOTIFICATION, DELETE_ALL_NOTIFICATION, DELETE_NOTIFICATION, GET_NOTIFICATION,
} from '../constants/notificationConstants';

const initialState = [];

const notificationReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION: {
      return [...action.payload];
    }
    case CREATE_NOTIFICATION: {
      return [...action.payload];
    }
    case DELETE_NOTIFICATION: {
      return [...action.payload];
    }
    case DELETE_ALL_NOTIFICATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default notificationReducer;

// export const notificationListReducer = (
//     state = { loading: true, notifications: [] },
//     action
// ) => {
//     switch (action.type) {
//         case NOTIFICATION_LIST_REQUEST:{
//           return { loading: true };
//         }
//         case NOTIFICATION_LIST_SUCCESS: {
//           return {
//                 loading: false,
//                 notifications: [ action.payload.notifications ],
//             }
//         }
//         case NOTIFICATION_LIST_FAIL: {
//           return { loading: false, error: action.payload }
//         }
//         default: {
//           return [state];
//         }

//     }
// };

// export const notificationCreateReducer = (
//     state = {}, action
// ) => {
//     switch (action.type) {
//         case NOTIFICATION_CREATE_REQUEST:
//             return { loading: true };
//         case NOTIFICATION_CREATE_SUCCESS:
//             return { loading: false, success: true, notification: action.payload };
//         case NOTIFICATION_CREATE_FAIL:
//             return { loading: false, error: action.payload };
//         case NOTIFICATION_CREATE_RESET:
//             return {};
//         default:
//             return state;
//     }
// };

// export const notificationDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//       case NOTIFICATION_DELETE_REQUEST:
//         return { loading: true };
//       case NOTIFICATION_DELETE_SUCCESS:
//         return { loading: false, success: true };
//       case NOTIFICATION_DELETE_FAIL:
//         return { loading: false, error: action.payload };
//       case NOTIFICATION_DELETE_RESET:
//         return {};
//       default:
//         return state;
//     }
// };

// export const notificationDeleteAllReducer = (state = {}, action) => {
//     switch (action.type) {
//       case NOTIFICATION_DELETE_ALL_REQUEST:
//         return { loading: true };
//       case NOTIFICATION_DELETE_ALL_SUCCESS:
//         return { loading: false, success: true };
//       case NOTIFICATION_DELETE_ALL_FAIL:
//         return { loading: false, error: action.payload };
//       case NOTIFICATION_DELETE_ALL_RESET:
//         return {};
//       default:
//         return state;
//     }
// };
