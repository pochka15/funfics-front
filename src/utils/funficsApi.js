import Globals from "../globals";
import axios from "axios";
import {send} from "./communicationWithServer";

function save(funfic, token, responseDataHandler, errorHandler) {
  send(funfic, Globals.SAVE_FUNFIC_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }, responseDataHandler, errorHandler)
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
    .catch(error => errorHandler(error))
}

export {save, fetchFunficById, fetchFunficsWithoutContent};