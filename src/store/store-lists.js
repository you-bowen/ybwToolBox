const state = {
    lists: {},
}

const mutations = {
    updateLists(state, payload){
        console.log('mutations')
        console.log(payload)
        // Object.assign(state.lists[], payload)
    },
    deleteTask(state, id){
        console.log("hellow",id)
    }
}

const actions = {
    updateLists({ commit },payload){
        let key = payload.key;
        let value = payload.value;
        if (key === "" || value === "") {
            alert("key & value cannot be null!");
            return;
        }
        commit('updateLists',payload)
        console.log('updating')
    },
    deleteTask({ commit },id){
        commit('deleteTask',id)
    }
}

const getters = {
    lists:(state)=>{
        return state.lists
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}