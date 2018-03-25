import userConstants from '../constants/user.constants';
import userService from '../services/user.service';
import history from '../helpers/history';

const login = (username, password) => {
  const request = (username, password) => ({
    type: userConstants.LOGIN_REQUEST,
    username,
    password,
  });

  const success = user => ({
    type: userConstants.LOGIN_SUCCESS,
    user,
  });

  const failure = error => ({
    type: userConstants.LOGIN_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request(username, password));

    userService
      .login(username, password)
      .then((user) => {
        dispatch(success(user));
        history.push('/dashboard');
      })
      .catch(error => dispatch(failure(error)));
  };
};

const logout = () => {
  localStorage.removeItem('user');

  return {
    type: userConstants.LOGOUT,
    loggedIn: false,
  };
};

const userActions = {
  login,
  logout,
};

export default userActions;
