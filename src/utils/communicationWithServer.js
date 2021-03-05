import axios from "axios";

function send(data, url, config, responseDataHandler, errorHandler) {
  axios.post(url.toString(), data, config)
    .then(response => responseDataHandler(response.data))
    .catch(error => errorHandler(error));
}

export {send};