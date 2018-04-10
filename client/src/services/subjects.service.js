import authHeader from '../helpers/auth-header';

const getAll = async () => {
  try {
    const response = await fetch('/api/subjects');

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const list = await response.json();

    return Promise.resolve(list);
  } catch (error) {
    return error;
  }
};

const add = async (data) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/subjects/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const subject = await response.json();

    return Promise.resolve(subject);
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
    const response = await fetch('/api/subjects/remove', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

export default {
  getAll,
  add,
  remove,
};
