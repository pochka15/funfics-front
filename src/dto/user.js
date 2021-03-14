/**
 * @param status e.x. either "Enabled" or "Disabled"
 * @param name
 * @param id
 * @param registered
 * @param roles
 * @returns {{roles, name, registered, id, status}}
 * @constructor
 */
export default function User(status, name, id, registered, roles) {
  return {
    status, name, id, registered, roles
  }
}