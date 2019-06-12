export const state = () => ({
    list: []
})

export const mutations = {
    add(state, countrytranslation) {
        state.list.push(countrytranslation)
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