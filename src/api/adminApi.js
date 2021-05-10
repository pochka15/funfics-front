import { swaggerClientWithToken } from "../utils/swaggerUtils";

/**
 * @param userId
 * @param token
 * @returns {Promise<*>}
 */
export async function deleteUserById(userId, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].deleteUserUsingDELETE({
    userId,
  });
  return response.body;
}

/**
 * Fetch all the basic data about existing users
 * @param token
 * @returns {Promise<*>}
 */
export async function fetchAllUsers(token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].allUsersUsingGET();
  return response.body;
}

/**
 * Fetch all the user data like name, email...
 * @param userId
 * @param token
 * @returns {Promise<*>}
 */
export async function fetchUser(userId, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].fetchUserUsingGET({
    userId,
  });
  return response.body;
}

/**
 * @param userId
 * @param token
 * @returns {Promise<*>}
 */
export async function blockUser(userId, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].blockUserUsingGET({
    userId,
  });
  return response.body;
}

/**
 * @param userId
 * @param token
 * @returns {Promise<*>}
 */
export async function unblockUser(userId, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].unblockUserUsingGET({
    userId,
  });
  return response.body;
}

/**
 * User with the userId will have only administrator role after making him an admin
 * @param userId - user id
 * @param token - jwt token
 * @returns {Promise<*>}
 */
export async function makeAdmin(userId, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].makeAdminUsingGET({
    userId,
  });
  return response.body;
}

/**
 * Replace previous user roles with the roles given in the 'roles' parameter
 * @param id userId
 * @param roles array of roles
 * @param token jwt token
 * @returns {Promise<*>}
 */
export async function updateUserRoles(id, roles, token) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis["users-controller"].setRolesUsingPOST(
    {},
    {requestBody: {roles, id}}
  );
  return response.body;
}
