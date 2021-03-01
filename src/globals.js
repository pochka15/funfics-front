export default class Globals {
  static FUNFICS_URL = new URL('/funfics', process.env.REACT_APP_API_URL);
  static SINGLE_FUNFIC_URL = new URL('/funfic', process.env.REACT_APP_API_URL);
};