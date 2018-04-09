import authHeader from '../helpers/auth-header';

const getAll = async () => {
  try {
    const response = await fetch('/api/semesters');

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
    const response = await fetch('/api/semesters/add', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const semester = await response.json();

    return Promise.resolve(semester);
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
    const response = await fetch('/api/semesters/remove', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const response = await fetch(`/api/semesters/${id}`);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const semester = await response.json();

    return Promise.resolve(semester);
  } catch (error) {
    return error;
  }
};

const edit = async (data) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('/api/semesters/edit', requestOptions);

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const msg = await response.json();

    return Promise.resolve(msg);
  } catch (error) {
    return error;
  }
};

const semestersService = {
  getAll,
  getById,
  add,
  remove,
  edit,
};

export default semestersService;
