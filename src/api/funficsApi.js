import { swaggerClient, swaggerClientWithToken } from "../utils/swaggerUtils";

/**
 * @param funfic
 * @param token - JWT token
 * @returns {Promise<*>}
 */
export async function save(funfic, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["funfics-controller"].saveUsingPOST(
    {},
    { requestBody: funfic }
  );
  return response.body;
}

/**
 * Update funfic data. All the previous funfic data will be replaced with the new data.
 * @param funfic
 * @param token
 * @returns {Promise<*>}
 */
export async function update(funfic, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["funfics-controller"].updateUsingPOST(
    {},
    { requestBody: funfic }
  );
  return response.body;
}

/**
 * @param {number} funficId
 * @returns {Promise<*>}
 */
export async function fetchFunficById(funficId) {
  const client = await swaggerClient();
  const response = await client.apis[
    "funfics-controller"
  ].singleFunficUsingGET({ funficId });
  return response.body;
}

/**
 * @param funficId
 * @returns {Promise<*>}
 */
export async function fetchFunficComments(funficId) {
  const client = await swaggerClient();
  const response = await client.apis[
    "funfic-comments-controller"
  ].funficCommentsUsingGET({ funficId });
  return response.body;
}

/**
 * Fetch all the funfics without their contents
 * @returns {Promise<*>}
 */
export async function fetchFunficsWithoutContent() {
  const client = await swaggerClient();
  const response = await client.apis[
    "funfics-controller"
  ].funficsWithoutContentUsingGET();
  return response.body;
}

/**
 * Fetch funfics which author is the user with the given jwt token.
 * @param token JWT token
 * @returns {Promise<*>}
 */
export async function fetchUserFunfics(token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis[
    "funfics-controller"
  ].userFunficsUsingGET();
  return response.body;
}

/**
 *
 * @param token - JWT token
 * @param funficIds - Array of id numbers
 * @returns {Promise<*>}
 */
export async function deleteUserFunfics(token, funficIds) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis[
    "funfics-controller"
  ].deleteUserFunficsUsingPOST({}, { requestBody: { funficIds } });
  return response.body;
}

/**
 * Search for the funfics by sending the query. Ex. query = "hello" should find the funfic with the name "hello"
 * @param query
 * @returns {Promise<*>}
 */
export async function searchFunficsByQuery(query) {
  const client = await swaggerClient();
  const response = await client.apis["search-controller"].searchUsingGET({
    query,
  });
  return response.body;
}

/**
 * Check if user with the given token can rate funfic
 * @param funficId
 * @param token
 * @returns {Promise<*>}
 */
export async function checkIfCanRateFunfic(funficId, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis[
    "funfics-controller"
  ].checkUserCanRateFunficUsingGET({ funficId });
  return response.body;
}

/**
 * @param funficId
 * @returns {Promise<*>}
 */
export async function getFunficRating(funficId) {
  const client = await swaggerClient();
  const response = await client.apis[
    "funfics-controller"
  ].funficRatingUsingGET({ funficId });
  return response.body;
}

/**
 * Give a rating for the funfic from the user with the given token. Then the average rating will be recalculated.
 * @param funficId
 * @param rating
 * @param token
 * @returns {Promise<*>}
 */
export async function rateFunfic(funficId, rating, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["funfics-controller"].rateUsingPOST(
    {},
    { requestBody: { funficId, rating } }
  );
  return response.body;
}
