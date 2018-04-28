const state = {
  charts: []
}

const mutations = {
  /**
   * add a chart
   * @param {*} state
   * @param {Array} payload
   */
  addChart (state, payload) {
    // let start = state.charts.length
    // state.charts.splice(start, 0, payload)
    state.charts.push(...payload)
  },
  removeChart (state, payload) {
    let start = payload.index
    state.charts.splice(start, 1)
  }
}

export default {
  state,
  mutations
}
