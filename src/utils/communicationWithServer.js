import axios from "axios";
import Globals from "../globals";

//TODO(@pochka15): impelment erorrs handling

function send(funfic) {
  console.log("Sending:", funfic)
  axios.post(Globals.FUNFICS_URL.toString(), funfic)
    .then(response => {
      console.log("Response:", response.data);
    })
    .catch(error => {
      console.log("Something went wrong", error);
      if (error.response) {
        console.log(error.response.data);
      }
    });
}

function fetchFunficById(funficId) {
  // TODO(@pochka15): make it better
  return axios.get(Globals.SINGLE_FUNFIC_URL.toString(), {
    params: {
      id: funficId
    }
  }).then(response => {
    console.log("Response:", response.data);
    return response.data;
  }).catch(error => console.log("Something went wrong", error))
}

export {send, fetchFunficById};