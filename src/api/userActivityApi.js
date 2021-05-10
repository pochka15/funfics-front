import { swaggerClient, swaggerClientWithToken } from "../utils/swaggerUtils";

/**
 * @param formData should contain at list the username and password
 * @returns {Promise<*>}
 */
export async function login(formData) {
  const client = await swaggerClient();
  const response = await client.apis["user-activity-controller"].loginUsingPOST(
    {},
    {requestBody: formData}
  );
  return response.body;
}

/**
 * @param formData should contain at list the username, password, email and isAdmin
 * @returns {Promise<*>}
 */
export async function register(formData) {
  const client = await swaggerClient();
  const response = await client.apis[
    "user-activity-controller"
    ].registerUsingPOST({}, {requestBody: formData});
  return response.body;
}

/**
 * @param token - JWT token
 * @param currentPassword
 * @param newPassword
 * @returns {Promise<*>}
 */
export async function changePassword(token, currentPassword, newPassword) {
  const client = await swaggerClientWithToken(token);
  const response = await client.apis[
    "user-activity-controller"
    ].changePasswordUsingPOST(
    {},
    {requestBody: {currentPassword, newPassword}}
  );
  return response.body;
}
