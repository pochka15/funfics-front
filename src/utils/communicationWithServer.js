import axios from "axios";

function send(data, url, config, responseDataHandler, errorHandler) {
  axios.post(url.toString(), data, config)
    .then(response => responseDataHandler(response.data))
    .catch(error => errorHandler(error));
}

function receiveData(url, config, responseDataHandler, errorHandler) {
  axios.get(url.toString(), config)
    .then(response => responseDataHandler(response.data))
    .catch(error => errorHandler(error))
}

export {send, receiveData};

export const defaultAuthConfig = token => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
}