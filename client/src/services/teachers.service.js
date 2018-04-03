import authHeader from '../helpers/auth-header';

const getAll = async () => {
  try {
    const response = await fetch('/api/teachers');

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const list = await response.json();

    return Promise.resolve(list);
  } catch (error) {
    return error;
  }
};

const add = async (name) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/teachers/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const teacher = await response.json();

    return Promise.resolve(teacher);
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/teachers/remove', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

const teachersService = {
  getAll,
  add,
  remove,
};

export default teachersService;
