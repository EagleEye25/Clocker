import Vue from 'vue';
import Vuex from 'vuex';

import http from '../../public/app.service.ts';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cardNo: null,
    employeeInfo: null,
    alreadyCreated: null,
    created: null,
    cancelAddEmp: null,
    addEmp: null,
    updateEmp: null,
    reasonData: null,
    calendarData: null,
    calendarTime: null,
    loginInfo: null,
    refreshRequesting: false,
  },
  mutations: {

    REFRESH_DISPATCHED(state, requesting) {
      state.refreshRequesting = requesting;
    },

    changeCardNo(state, cardNo) {
      state.cardNo = cardNo
    },
    changeCreated(state, created) {
      state.created = created
    },
    changeAlreadyCreated(state, alreadyCreated) {
      state.alreadyCreated = alreadyCreated
    },
    changeEmployeeInfo(state, employeeInfo) {
      state.employeeInfo = employeeInfo
    },
    changeCancelAddEmp(state, cancelAddEmp) {
      state.cancelAddEmp = cancelAddEmp
    },
    changeAddEmp(state, addEmp) {
      state.addEmp = addEmp
    },
    changeUpdateEmp(state, updateEmp) {
      state.updateEmp = updateEmp
    },
    changeReasonData(state, reasonData) {
      state.reasonData = reasonData
    },
    changeCalendarData(state, calendarData) {
      state.calendarData = calendarData
    },
    changeCalendarTime(state, calendarTime) {
      state.calendarTime = calendarTime
    },
    changeLoginInfo(state, loginInfo) {
      state.loginInfo = loginInfo
    },
  },
  getters: {
    cardNo: state => state.cardNo ? state.cardNo || '' : '',
    created: state => state.created ? state.created || '' : '',
    alreadyCreated: state => state.alreadyCreated ? state.alreadyCreated || '' : '',
    employeeInfo: state => state.employeeInfo ? state.employeeInfo || '' : '',
    employeeName: state => state.employeeInfo ? state.employeeInfo.name || '' : '',
    cancelAddEmp: state => state.cancelAddEmp ? state.cancelAddEmp || '' : '',
    addEmp: state => state.addEmp ? state.addEmp || '' : '',
    updateEmp: state => state.updateEmp ? state.updateEmp || '' : '',
    reasonData: state => state.reasonData ? state.reasonData || '' : '',
    calendarData: state => state.calendarData ? state.calendarData || '' : '',
    calendarTime: state => state.calendarTime ? state.calendarTime || '' : '',
    loginInfo: state => state.loginInfo ? state.loginInfo || '' : ''
  },
  actions: {
    appInit(ctx) {
      if (ctx.state.loginInfo) {
        return;
      }
      const authToken = window.sessionStorage.getItem('token') || '';
      if (authToken) {
        http.defaults.headers.common['x-access-token'] = authToken;
        const strObj = atob(authToken.toString().split('.')[1] || '');
        const tc = JSON.parse(strObj || '{}');
        if(tc) {
          if ( (+tc.exp * 1000) < Date.now()) {
            ctx.dispatch('setToken', {});
          } else {
            ctx.dispatch('updateLoginInfo', tc);
          }
        }
      }
    },

    setToken(ctx, data) {
      const token = data.token;
      const refreshToken = data.refreshToken;
      if (String(token).length && String(refreshToken).length) {
        window.sessionStorage.setItem('token', String(token));
        window.sessionStorage.setItem('refreshToken', String(refreshToken));
        http.defaults.headers.common['x-access-token'] = token;
      } else {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('refreshToken');
        http.defaults.headers.common['x-access-token'] = '';
      }
    },

    refreshRequest(ctx) {
      if (ctx.state.refreshRequesting) {
        return;
      }
      const token = window.sessionStorage.getItem('token') || '';
      if (!token) {
        return;
      }
      const strObj = atob(token.toString().split('.')[1] || '');
      if (!strObj) {
        return;
      }
      const tc = JSON.parse(strObj);
      if ( !(tc && +tc.exp) ) {
        return;
      }
      const now = Date.now();
      if (+now > +(tc.exp * 1000) ) {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('refreshToken');
        http.defaults.headers.common['x-access-token'] = '';
        return;
      }
      if ( ( (now + (1000 * 60 * 2) ) > (+tc.exp * 1000) ) && !ctx.state.refreshRequesting ) {
        ctx.commit('REFRESH_DISPATCHED', true);
        ctx.dispatch('refreshToken');
      }
    },

    refreshToken(ctx) {
      const refreshToken = window.sessionStorage.getItem('refreshToken') || '';
      http.post('/api/user/refreshToken', {refreshToken}).then(resp => {
        const AUTH_TOKEN = resp.data.token || '';
        const REFRESH_TOKEN = resp.data.refreshToken || '';
        ctx.dispatch('setToken', {token: AUTH_TOKEN, refreshToken: REFRESH_TOKEN});
        ctx.commit('REFRESH_DISPATCHED', false);
      }).catch(() => {
        ctx.commit('REFRESH_DISPATCHED', false);
      });
    },

    updateCardNo(ctx, num) {
      ctx.commit('changeCardNo', num);
    },
    updateEmployeeInfo(ctx, employeeInfo) {
      ctx.commit('changeEmployeeInfo', employeeInfo);
    },
    updateAlreadyCreated(ctx, created) {
      ctx.commit('changeAlreadyCreated', created);
    },
    updateChangeCreated(ctx, created) {
      ctx.commit('changeCreated', created);
    },
    updateChangeCancelAddEmp(ctx, cancel) {
      ctx.commit('changeCancelAddEmp', cancel);
    },
    updateAddEmp(ctx, addEmp){
      ctx.commit('changeAddEmp', addEmp)
    },
    updateEmp(ctx, updateEmp){
      ctx.commit('changeUpdateEmp', updateEmp)
    },
    updateReason(ctx, updateReason){
      ctx.commit('changeReasonData', updateReason)
    },
    updateCalendar(ctx, updateCalendar){
      ctx.commit('changeCalendarData', updateCalendar)
    },
    updateCalendarTime(ctx, updateCalendarTime){
      ctx.commit('changeCalendarTime', updateCalendarTime)
    },
    updateLoginInfo(ctx, updateLoginInfo){
      ctx.commit('changeLoginInfo', updateLoginInfo)
    },
  }
});

export default store;