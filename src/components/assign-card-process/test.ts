const cardState = {};

// const appState = {FacilityID: 's216017173'};
export class AppService {

  constructor() { }

  getState(key) {
    return cardState[key];
  }

  setState(key, value) {
    return cardState[key] = value;
  }
}
