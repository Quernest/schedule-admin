import authHeader from '../helpers/auth-header';

const add = async (data) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/schedule/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const schedule = await response.json();

    return Promise.resolve(schedule);
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(`/api/schedule/${id}`);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const list = await response.json();

    return Promise.resolve(list);
  } catch (error) {
    return error;
  }
};

export default {
  add,
  getById,
};
