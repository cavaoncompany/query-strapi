import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
    setUser(state, user) {
        state.user = user
        Cookies.set('user', user)
    },
    setToken(token) {
        Cookies.set('token', token)
        console.log(Cookies.get('jwt'))
    },
    logout(state) {
        state.user = null
        Cookies.set('user', null)
        Cookies.set('token', null)
    }
}

export const getters = {
    username: state => {
        return state.user && state.user.username
    },
    token: state => {
        return Cookies.get('jwt')
    }
}