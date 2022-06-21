import { createStore } from 'vuex'

export default createStore({
  state: {
    user:null,
  },
  getters: {
  },
  mutations: {
    setUser(state,data){
      state.user=data
    }
  },
  actions: {
    setUser(context,data){
      context.commit('setUser',data)
    }
  },
  modules: {
  }
})
