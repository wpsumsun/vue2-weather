import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  weather: [],
  cityDetail: [],
  tab: 0,
}

//getters
const getters = {
  timeX: state  => {
    let timeArray = []
    state.cityDetail.forEach(item => {
      timeArray.push(new Date(item.time).getHours())
    })
    return timeArray
  },

  temperatureY: state => {
    let temperatureArray = []
    state.cityDetail.forEach(item => {
      temperatureArray.push(item.temperature)
    })
    return temperatureArray
  }
}

//actions
const actions = {
  async find({ dispatch }) {
    try {
      let response = await fetch(`//weixin.jirengu.com/weather`)
      let res = await response.json()
      dispatch('weatherDetail', { id: res.weather[0].city_id })
      state.weather = res.weather
      state.weather.forEach(detail => {
        detail.future = detail.future.slice(1, 8)
      })
    } catch (err) {
      console.log(err)
    }
  },

  async weatherDetail({ commit }, { id }) {
    try {
      let response = await fetch(`//weixin.jirengu.com/weather/future24h?cityid=${id}`)
      let res = await response.json()
      state.cityDetail = res.hourly
    } catch (err) {
      console.log(err)
    }
  },
}


export default new Vuex.Store({
  state,
  actions,
  getters,
})
