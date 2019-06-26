import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    card_no: '',
    employeeID: null,
  },
  mutations: {
    changeCardNo(state, card_no) {
      state.card_no = card_no
    },
    changeEmployeeID(state, employeeID) {
      state.employeeID = employeeID
    },
  },
  getters: {
    card_no: state => state.card_no,
    employeeID: state => state.employeeID,
  },
  actions: {
    updateCardNo(ctx, num) {
      ctx.commit('changeCardNo', num);
    },
    updateEmployeeID(ctx, employeeID) {
      ctx.commit('changeCardNo', employeeID);
    }
  }
});

export default store;