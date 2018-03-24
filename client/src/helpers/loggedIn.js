const loggedIn = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return user;
  }

  return undefined;
};

export default loggedIn;
