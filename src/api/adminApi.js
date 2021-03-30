import {
  defaultAuthConfig,
  makeGet,
  makePost,
} from "../utils/communicationWithServer";
import ApiUrls from "../apiUrls";

function wrappedReceiveData(url, id, token, responseDataHandler, errorHandler) {
  makeGet(
    url,
    { ...defaultAuthConfig(token), params: { id: id } },
    responseDataHandler,
    errorHandler
  );
}

export function deleteUserById(id, token, onSuccess, errorHandler) {
  wrappedReceiveData(
    ApiUrls.ADMIN_DELETE_USER,
    id,
    token,
    onSuccess,
    errorHandler
  );
}

export function fetchUser(id, token, responseDataHandler, errorHandler) {
  wrappedReceiveData(
    ApiUrls.ADMIN_FETCH_USER,
    id,
    token,
    responseDataHandler,
    errorHandler
  );
}

export function blockUser(id, token, onSuccess, errorHandler) {
  wrappedReceiveData(
    ApiUrls.ADMIN_BLOCK_USER,
    id,
    token,
    onSuccess,
    errorHandler
  );
}

export function unblockUser(id, token, onSuccess, errorHandler) {
  wrappedReceiveData(
    ApiUrls.ADMIN_UNBLOCK_USER,
    id,
    token,
    onSuccess,
    errorHandler
  );
}

/**
 * Set roles = ['Administrator'] for the given user id
 * @param id - user id
 * @param token - jwt token
 * @param {function()} onSuccess - callback function on success
 * @param errorHandler - callback function on error
 */
export function makeAdmin(id, token, onSuccess, errorHandler) {
  wrappedReceiveData(ApiUrls.MAKE_ADMIN, id, token, onSuccess, errorHandler);
}

export function updateUserRoles(id, roles, token, onSuccess, errorHandler) {
  makePost(
    { roles, id },
    ApiUrls.ADMIN_SET_USER_ROLES,
    defaultAuthConfig(token),
    onSuccess,
    errorHandler
  );
}
