import ApiUrls from "../apiUrls";
import {defaultAuthConfig, makeGet, makePost,} from "../utils/communicationWithServer";

/**
 * @param funfic
 * @param token - JWT token
 * @param {function(any)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function save(funfic, token, responseDataHandler, errorHandler) {
  makePost(
    funfic,
    ApiUrls.SAVE_FUNFIC,
    defaultAuthConfig(token),
    responseDataHandler,
    errorHandler
  );
}

function update(funfic, token, responseDataHandler, errorHandler) {
  makePost(
    funfic,
    ApiUrls.UPDATE_FUNFIC,
    defaultAuthConfig(token),
    responseDataHandler,
    errorHandler
  );
}

/**
 * @param {number} funficId
 * @param {function(JSON)} responseDataHandler
 * @param {function(any)} errorHandler
 */
function fetchFunficById(funficId, responseDataHandler, errorHandler) {
  makeGet(
    ApiUrls.SINGLE_FUNFIC,
    {
      params: { id: funficId },
    },
    responseDataHandler,
    errorHandler
  );
}

function fetchFunficComments(funficId, responseDataHandler, errorHandler) {
  makeGet(
    ApiUrls.FUNFIC_COMMENTS,
    {
      params: { id: funficId },
    },
    responseDataHandler,
    errorHandler
  );
}

function saveComment(content, funficId, token, onSuccess, errorHandler) {
  makePost(
    { content, funficId },
    ApiUrls.SAVE_COMMENT,
    defaultAuthConfig(token),
    onSuccess,
    errorHandler
  );
}

/**
 * Fetch all the funfics without their contents
 * @param {function(JSON)} jsonDataHandler
 * @param {function(any)} errorHandler
 */
function fetchFunficsWithoutContent(jsonDataHandler, errorHandler) {
  makeGet(ApiUrls.ALL_FUNFICS, {}, jsonDataHandler, errorHandler);
}

/**
 * @param token - JWT token
 * @param {function(JSON)} jsonDataHandler
 * @param {function(any)} errorHandler
 */
function fetchUserFunfics(token, jsonDataHandler, errorHandler) {
  makeGet(
    ApiUrls.PERSONAL_FUNFICS,
    defaultAuthConfig(token),
    jsonDataHandler,
    errorHandler
  );
}

/**
 *
 * @param token - JWT token
 * @param funficIds - Array of id numbers
 * @param {function()} onSuccess
 * @param {function(any)} errorHandler
 */
function deleteUserFunfics(token, funficIds, onSuccess, errorHandler) {
  makePost(
    { funficIds },
    ApiUrls.DELETE_FUNFIC,
    defaultAuthConfig(token),
    onSuccess,
    errorHandler
  );
}

export function searchFunficsByQuery(query, jsonDataHandler, errorHandler) {
  makeGet(
    ApiUrls.SEARCH_FUNFICS,
    { params: { query } },
    jsonDataHandler,
    errorHandler
  );
}

/**
 * Check if user with the given token can rate funfic
 * @param funficId
 * @param token
 * @param {function(boolean)} jsonDataHandler
 * @param errorHandler
 */
export function checkIfCanRateFunfic(
  funficId,
  token,
  jsonDataHandler,
  errorHandler
) {
  makeGet(
    ApiUrls.CHECK_CAN_RATE,
    {
      ...defaultAuthConfig(token),
      params: { funficId },
    },
    jsonDataHandler,
    errorHandler
  );
}

export function getAverageRating(funficId, jsonDataHandler, errorHandler) {
  makeGet(
    ApiUrls.FUNFIC_RATING,
    { params: { id: funficId } },
    jsonDataHandler,
    errorHandler
  );
}

export function rateFunfic(funficId, rating, token, onSuccess, errorHandler) {
  makePost(
    {
      funficId,
      rating,
    },
    ApiUrls.RATE_FUNFIC,
    defaultAuthConfig(token),
    onSuccess,
    errorHandler
  );
}

export {
  save,
  fetchFunficById,
  fetchFunficsWithoutContent,
  fetchUserFunfics,
  deleteUserFunfics,
  update,
  fetchFunficComments,
  saveComment,
};
