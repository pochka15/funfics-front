export default class ApiUrls {
  static ALL_FUNFICS = new URL('/funfics', process.env.REACT_APP_API_URL);
  static PERSONAL_FUNFICS = new URL('/personal-funfics', process.env.REACT_APP_API_URL);
  static SAVE_FUNFIC = new URL('/save', process.env.REACT_APP_API_URL);
  static DELETE_FUNFIC = new URL('/delete', process.env.REACT_APP_API_URL);
  static SINGLE_FUNFIC = new URL('/funfic', process.env.REACT_APP_API_URL);
  static LOGIN = new URL('/login', process.env.REACT_APP_API_URL);
  static CHANGE_PASSWORD = new URL('/password', process.env.REACT_APP_API_URL);
  static REGISTER = new URL('/register', process.env.REACT_APP_API_URL);
};