const axios = require("axios");

const response = (data, status) => {
  if (status >= 200 && status < 300) {
    return data;
  }
  return {
    error: `ERR: Status code ${status}`,
  };
};

const get = async (url, params = {}, headers = {}) => {
  const { data, status } = await axios.get(url, {
    params: params,
    headers: headers,
  });

  return response(data, status);
};

const post = async (url, _data, headers = {}, params = {}) => {
  const { data, status } = await axios.post(url, _data, {
    params: params,
    headers: headers,
  });
  return response(data, status);
};

module.exports = {
  get,
  post,
};
