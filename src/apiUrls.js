const url = (path) => new URL(path, process.env.REACT_APP_API_URL);

export default class ApiUrls {
  // Funfics
  static ALL_FUNFICS = url("/funfics");
  static PERSONAL_FUNFICS = url("/personal-funfics");
  static SAVE_FUNFIC = url("/save");
  static UPDATE_FUNFIC = url("/update");
  static DELETE_FUNFIC = url("/delete");
  static SINGLE_FUNFIC = url("/funfic");
  static SEARCH_FUNFICS = url("/search");
  static FUNFIC_COMMENTS = url("/comments");
  static SAVE_COMMENT = url("/save-comment");
  static CHECK_CAN_RATE = url("/can-rate");
  static RATE_FUNFIC = url("/rate");
  static FUNFIC_RATING = url("/funfic-rating");

  // Activity
  static LOGIN = url("/login");
  static CHANGE_PASSWORD = url("/password");
  static REGISTER = url("/register");

  // Admin
  static ADMIN_PAGE = url("/admin");
  static ADMIN_USERS = url("/admin/users");
  static ADMIN_DELETE_USER = url("/admin/delete-user");
  static ADMIN_FETCH_USER = url("/admin/fetch-user");
  static ADMIN_BLOCK_USER = url("/admin/block-user");
  static ADMIN_UNBLOCK_USER = url("/admin/unblock-user");
  static ADMIN_SET_USER_ROLES = url("/admin/set-user-roles");
  static MAKE_ADMIN = url("/admin/make-admin");

  // WebSocket
  static WEBSOCKET_ENDPOINT = url("/comments-websocket");
}
