import authHeader from '../helpers/auth-header';

const getAll = async () => {
  try {
    const response = await fetch('/api/groups');

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const list = await response.json();

    return Promise.resolve(list);
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(`/api/groups/${id}`);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const group = await response.json();

    return Promise.resolve(group);
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
    const response = await fetch('/api/groups/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const group = await response.json();

    return Promise.resolve(group);
  } catch (error) {
    return error;
  }
};

const edit = async (group) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ ...group }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/groups/edit', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
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
    const response = await fetch('/api/groups/remove', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

const groupsService = {
  getAll,
  getById,
  add,
  edit,
  remove,
};

export default groupsService;
