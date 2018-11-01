import router from '../../routes/index'
import axios from 'axios'
import moment from 'moment'

 const state = {
    user: null,
    logged: !!localStorage.getItem('token')
 }

 const getters = {
    isLogged: state => state.logged
 }

 const mutations = {
    SET_USER (state, user) {
        state.user = user
    },
    LOGIN(state, data) {
        state.logged = true
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('userId', data.user_id)
        localStorage.setItem('expiresAt', moment().add(data.expires_in, 'seconds').format())
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
    },
    LOGOUT(state) {
        state.logged = false
        state.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expiresAt')
        delete axios.defaults.headers.common['Authorization']
    }
 }

 const actions = {
    FETCH_USER ({ commit }) {
        return axios.get('/auth/me')
            .then(({ data }) => {
                commit('SET_USER', data.data)
                return data.data
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },
    LOGIN ({ commit, dispatch }, data) {
        commit('LOGIN', data)
        dispatch('FETCH_USER')
        router.push({name: 'home'})

    },
    LOGOUT ({ commit }) {
        commit('LOGOUT')
        commit('CLEAR_NOTES')
        router.push({name: 'login'})
    }
}

 export default {
    state,
    mutations,
    getters,
    actions
 }