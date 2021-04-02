/**
 * @param status e.x. either "Enabled" or "Disabled"
 * @param name
 * @param id
 * @param registrationIsoDateTime
 * @param lastLoginIsoDateTime
 * @param roles
 * @returns {{roles, name, registered, id, status}}
 * @constructor
 */
export default function User(
  status,
  name,
  id,
  registrationIsoDateTime,
  lastLoginIsoDateTime,
  roles
) {
  return {
    status,
    name,
    id,
    registrationIsoDateTime,
    lastLoginIsoDateTime,
    roles,
  };
}
