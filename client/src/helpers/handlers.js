export const handleResponseError = async (response) => {
  const json = await response.json();
  const { error } = json;

  return Promise.reject(error);
};
