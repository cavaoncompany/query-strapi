export const state = () => ({
    list: []
})

export const mutations = {
    add(state, country) {
        state.list.push(country)
    },
    emptyList(state) {
        state.list = []
    }
}

export const getters = {
    list: state => {
        return state.list
    }
}