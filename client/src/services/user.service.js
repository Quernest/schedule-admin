const login = async (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch('/api/login', requestOptions)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }

      return res.json();
    })
    .then((user) => {
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));

        return user;
      }

      return Promise.reject(Error('app.errors.user.token.invalid'));
    })
    .catch(err => Promise.reject(err));
};

const userService = {
  login,
};

export default userService;
