import Globals from "../globals";
import {send} from "./communicationWithServer";

function signIn(formData, responseDataHandler, errorHandler) {
  send(formData, Globals.LOGIN_URL, {}, responseDataHandler, errorHandler)
}

function signUp(formData, responseDataHandler, errorHandler) {
  send(formData, Globals.REGISTER_URL, {}, responseDataHandler, errorHandler)
}

export {signIn, signUp};
