import authHeader from '../helpers/auth-header';
import LS from '../helpers/localStorage';

const getAll = async (isUseStorage = true) => {
  const groups = LS.get('groups');

  if (!isUseStorage || !groups) {
    try {
      const response = await fetch('/api/groups');

      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      const list = await response.json();

      LS.set('groups', list);

      return Promise.resolve(list);
    } catch (error) {
      return error;
    }
  }

  return Promise.resolve(groups);
};

const add = async (name) => {
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

    const group = await response.json();

    return Promise.resolve(group);
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
  add,
  remove,
};

export default groupsService;
