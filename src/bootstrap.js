import Vue from 'vue'
import axios from 'axios'

const BASE_URL_API = 'http://localhost:8000'
//const BASE_URL_API = 'http://server.mynotes.primumfx.com'

window.axios = axios
Vue.config.productionTip = false

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.token
axios.defaults.baseURL = `${BASE_URL_API}/api/v1/`
