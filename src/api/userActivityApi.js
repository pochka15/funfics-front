import ApiUrls from "../apiUrls";
import {defaultAuthConfig, makePost} from "../utils/communicationWithServer";

/**
 * @param formData should contain username and password
 * @param {function(any)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function signIn(formData, responseDataHandler, errorHandler) {
  makePost(formData, ApiUrls.LOGIN, {}, responseDataHandler, errorHandler);
}

/**
 * @param formData should contain username, password, email and isAdmin
 * @param {function(any)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function signUp(formData, responseDataHandler, errorHandler) {
  makePost(formData, ApiUrls.REGISTER, {}, responseDataHandler, errorHandler);
}

/**
 * @param token - JWT token
 * @param currentPassword
 * @param newPassword
 * @param {function(any)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function changePassword(
  token,
  currentPassword,
  newPassword,
  responseDataHandler,
  errorHandler
) {
  makePost(
    { currentPassword, newPassword },
    ApiUrls.CHANGE_PASSWORD,
    defaultAuthConfig(token),
    responseDataHandler,
    errorHandler
  );
}

export { signIn, signUp, changePassword };
