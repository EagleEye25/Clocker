import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cardNo: null,
    employeeInfo: null,
    alreadyCreated: null,
    created: null,
    cancelAddEmp: null,
    addEmp: null,
  },
  mutations: {
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
  },
  getters: {
    cardNo: state => state.cardNo ? state.cardNo || '' : '',
    created: state => state.created ? state.created || '' : '',
    alreadyCreated: state => state.alreadyCreated ? state.alreadyCreated || '' : '',
    employeeInfo: state => state.employeeInfo ? state.employeeInfo || '' : '',
    employeeName: state => state.employeeInfo ? state.employeeInfo.name || '' : '',
    cancelAddEmp: state => state.cancelAddEmp ? state.cancelAddEmp || '' : '',
    addEmp: state => state.addEmp ? state.addEmp || '' : ''
  },
  actions: {
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
    }
  }
});

export default store;