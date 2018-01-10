import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
    case userConstants.GET_USER_COMMUNITIES_REQUEST:
      return {
        loading: true
      };
    case userConstants.REQUEST_PASSWORD_RESET_REQUEST:
      return {
        reseting: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GET_USER_COMMUNITIES_SUCCESS:
      return {
        items: action.communities
      };
    case userConstants.REQUEST_PASSWORD_RESET_SUCCESS:
      return {
        request: action.request
      };
    case userConstants.GETALL_FAILURE:
    case userConstants.GET_USER_COMMUNITIES_FAILURE:
    case userConstants.REQUEST_PASSWORD_RESET_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}