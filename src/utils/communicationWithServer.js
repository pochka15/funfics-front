import axios from "axios";

function makePost(data, url, config, responseDataHandler, errorHandler) {
  axios
    .post(url.toString(), data, config)
    .then((response) => responseDataHandler(response.data))
    .catch((error) => errorHandler(error));
}

function makeGet(url, config, responseDataHandler, errorHandler) {
  axios
    .get(url.toString(), config)
    .then((response) => responseDataHandler(response.data))
    .catch(errorHandler);
}

export { makePost, makeGet };

export const defaultAuthConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
