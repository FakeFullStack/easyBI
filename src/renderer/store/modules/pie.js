const state = {
  e: null
}

const mutations = {
  PIE_REG (state, e) {
    console.log('pie_store', state, e)
    state.e = e
  },
  PIE_RESIZE (state) {
    if (state.e) {
      state.e.resize()
    } else {
      console.log('echarts is not register')
    }
  }
}

export default {
  state,
  mutations
}
