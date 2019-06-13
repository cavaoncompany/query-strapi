export const state = () => ({
    list: [],
    country: {}
})

export const mutations = {
    add(state, country) {
        state.list.push(country)
    },
    countryAdd(state, country) {
        state.country = country
    },
    emptyList(state) {
        state.list = []
    }
}

export const getters = {
    list: state => {
        return state.list
    },
    country: state => {
        return state.country
    }
}