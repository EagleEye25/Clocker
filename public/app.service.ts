import axios from 'axios';

const authToken = window.sessionStorage.getItem('token') || '';
const params = {
  baseURL: 'http://localhost:3000/'
};

if (authToken) {
  params['headers'] = {'x-access-token': authToken};
}

const instance = axios.create(params);

export default instance;
