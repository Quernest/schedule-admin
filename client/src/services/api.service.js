const API_URL = '/api';

const getRequest = url =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.statusText);
    })
    .then(json => json)
    .catch(err => Promise.reject(err));

const postRequest = (url, opts) =>
  fetch(url, opts)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.statusText);
    })
    .then(json => json)
    .catch(err => Promise.reject(err));

class API {
  static getGroups() {
    const url = `${API_URL}/groups`;

    return getRequest(url);
  }

  static getGroupSchedule(id) {
    if (typeof id === 'number' && Number.isInteger(id)) {
      const url = `${API_URL}/group/${id}`;

      return getRequest(url);
    }

    return undefined;
  }

  static login(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    const url = `${API_URL}/login`;

    return postRequest(url, requestOptions)
      .then(user => Promise.resolve(user))
      .catch(err => Promise.reject(err));
  }
}

export default API;
