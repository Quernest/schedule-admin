import { handleError } from '../helpers/handlers';

const login = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  try {
    const res = await fetch('/api/login', requestOptions);
    const user = await res.json();

    if (user && typeof user === 'object' && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  } catch (err) {
    handleError(err);
  }
};

const userService = {
  login,
};

export default userService;
