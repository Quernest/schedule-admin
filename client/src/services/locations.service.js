import authHeader from '../helpers/auth-header';

const getAll = async () => {
  try {
    const response = await fetch('/api/locations');

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
    const response = await fetch(`/api/locations/${id}`);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const location = await response.json();

    return Promise.resolve(location);
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
    const response = await fetch('/api/locations/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const location = await response.json();

    return Promise.resolve(location);
  } catch (error) {
    return error;
  }
};

const edit = async (location) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ ...location }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/locations/edit', requestOptions);

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
    const response = await fetch('/api/locations/remove', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

const locationsService = {
  getAll,
  getById,
  edit,
  add,
  remove,
};

export default locationsService;
