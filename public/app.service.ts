import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/'
});

export default instance;

// const appState = {};

// // const appState = {FacilityID: 's216017173'};
// export class AppService {

//   constructor() { }

//   getState(key) {
//     return appState[key];
//   }

//   setState(key, value) {
//     return appState[key] = value;
//   }
// }

// // export const BASE_URL = 'https://unipark.lunatech.co.za';
//   export const BASE_URL = 'http://localhost:3000';
// // export const BASE_URL = 'http://sict-iis.nmmu.ac.za:9000';