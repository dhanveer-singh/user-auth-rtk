const API = '/api';

const AUTH = {
  SIGNIN: `${API}/login`,
  SIGNUP: `${API}/signup`,
};

const USERS = {
  GET_USERS: `${API}/users`,
  MY_PROFILE: `${API}/me`,
  DELETE_USER: `${API}/user/`,
};
const APIS = {
  AUTH,
  USERS,
};

export default APIS;
