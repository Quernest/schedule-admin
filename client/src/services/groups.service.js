import authHeader from '../helpers/auth-header';

const getAll = async () => {
  try {
    const response = await fetch('/api/groups');

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const list = response.json();

    return Promise.resolve(list);
  } catch (error) {
    return error;
  }
};

const add = async (name) => {
  console.log(name);

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/groups/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

const groupsService = {
  getAll,
  add,
};

export default groupsService;
