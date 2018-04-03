import LS from '../helpers/localStorage';

const login = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  try {
    const response = await fetch('/api/login', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const user = await response.json();

    if (!user.token) {
      return Promise.reject(Error('app.errors.user.token.invalid'));
    }

    LS.set('user', user);
    return user;
  } catch (error) {
    return error;
  }
};

const userService = {
  login,
};

export default userService;
