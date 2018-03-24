const handleError = (err) => {
  if (err && typeof err === 'string') {
    return Promise.reject(err);
  }

  return err.statusText;
};

const handleSuccess = (msg) => {
  if (msg && typeof msg === 'string') {
    return Promise.resolve(msg);
  }

  return msg.statusText;
};

export { handleError, handleSuccess };
