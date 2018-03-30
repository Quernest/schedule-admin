const getAllGroups = async () => {
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

const groupsService = {
  getAllGroups,
};

export default groupsService;
