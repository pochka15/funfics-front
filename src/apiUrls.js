const url = (path) => new URL(path, process.env.REACT_APP_API_URL);

export default class ApiUrls {
  static WEBSOCKET_ENDPOINT = url("/comments-websocket");
  static WEBSOCKET_SAVE_COMMENT_PATH = "/sock/comments/save";
  static SWAGGER_PATH = `${process.env.REACT_APP_API_URL}/v3/api-docs`;
}
