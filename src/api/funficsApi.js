import ApiUrls from "../apiUrls";
import {defaultAuthConfig, receiveData, send} from "../utils/communicationWithServer";

/**
 * @param funfic
 * @param token - JWT token
 * @param {function(any)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function save(funfic, token, responseDataHandler, errorHandler) {
  send(funfic, ApiUrls.SAVE_FUNFIC, defaultAuthConfig(token), responseDataHandler, errorHandler)
}

function update(funfic, token, responseDataHandler, errorHandler) {
  send(funfic, ApiUrls.UPDATE_FUNFIC, defaultAuthConfig(token), responseDataHandler, errorHandler)
}

/**
 * @param {number} funficId
 * @param {function(JSON)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function fetchFunficById(funficId, responseDataHandler, errorHandler) {
  receiveData(ApiUrls.SINGLE_FUNFIC, {
    params: {id: funficId}
  }, responseDataHandler, errorHandler)
}

/**
 * Fetch all the funfics without their contents
 * @param {function(JSON)} jsonDataHandler
 * @param {function(any)} errorHandler
 */
function fetchFunficsWithoutContent(jsonDataHandler, errorHandler) {
  receiveData(ApiUrls.ALL_FUNFICS, {}, jsonDataHandler, errorHandler)
}

/**
 * @param token - JWT token
 * @param {function(JSON)} jsonDataHandler
 * @param {function(any)} errorHandler
 */
function fetchUserFunfics(token, jsonDataHandler, errorHandler) {
  receiveData(ApiUrls.PERSONAL_FUNFICS, defaultAuthConfig(token), jsonDataHandler, errorHandler)
}

/**
 *
 * @param token - JWT token
 * @param funficIds - Array of id numbers
 * @param {function()} onSuccess
 * @param {function(any)} errorHandler
 */
function deleteUserFunfics(token, funficIds, onSuccess, errorHandler) {
  send({funficIds}, ApiUrls.DELETE_FUNFIC, defaultAuthConfig(token), onSuccess, errorHandler)
}

export function searchFunficsByQuery(query, jsonDataHandler, errorHandler) {
  receiveData(ApiUrls.SEARCH_FUNFICS, {params: {query}}, jsonDataHandler, errorHandler)
}

export {save, fetchFunficById, fetchFunficsWithoutContent, fetchUserFunfics, deleteUserFunfics, update};