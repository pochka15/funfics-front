import axios from "axios";
import Globals from "../globals";

function send(funfic, responseDataHandler, errorHandler) {
  axios.post(Globals.FUNFICS_URL.toString(), funfic)
    .then(response => responseDataHandler(response.data))
    .catch(error => errorHandler(error));
}

function fetchFunficById(funficId, responseDataHandler, errorHandler) {
  axios.get(Globals.SINGLE_FUNFIC_URL.toString(), {
    params: {
      id: funficId
    }
  }).then(response => responseDataHandler(response.data))
    .catch(error => errorHandler(error))
}

function fetchFunficsWithoutContent(jsonDataHandler, errorHandler) {
  axios.get(Globals.FUNFICS_URL.toString())
    .then(response => {
      jsonDataHandler(response.data)
    })
    .catch(erorr => errorHandler(erorr))
}

export {send, fetchFunficById, fetchFunficsWithoutContent};