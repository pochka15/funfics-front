export default class Globals {
  static FUNFICS_URL = new URL('/funfics', process.env.REACT_APP_API_URL);
  static SINGLE_FUNFIC_URL = new URL('/funfic', process.env.REACT_APP_API_URL);
  static LOGIN_URL = new URL('/login', process.env.REACT_APP_API_URL);
  static REGISTER_URL = new URL('/register', process.env.REACT_APP_API_URL);
  static SAVE_FUNFIC_URL = new URL('/save', process.env.REACT_APP_API_URL);
};