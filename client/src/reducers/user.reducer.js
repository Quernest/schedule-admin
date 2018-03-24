import userConstants from '../constants/user.constants';

const u = JSON.parse(localStorage.getItem('user'));
const initialState = { ...u, loggedIn: true } || {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...action.user,
        loggedIn: true,
        loading: false,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
