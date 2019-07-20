import axios from 'axios';

const params = {
  baseURL: 'http://localhost:3000/'
};
const instance = axios.create(params);
export default instance;
