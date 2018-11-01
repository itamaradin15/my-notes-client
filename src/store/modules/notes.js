import axios from 'axios'

 const state = {
    notes: [],
    filteredNotes: null,
    search: null,
 }

 const getters = {
    getNotes: (state) => state.notes,
    filterNotes: (state) => state.filteredNotes
 }

 const mutations = {
    FILTERED_NOTES (state, word) {
     if (!(word) || word === '{}') {
         state.search = null
         state.filteredNotes = null
     }else{
         state.search = word.trim().toLowerCase()
         state.filteredNotes = state.notes.filter((note) => {
             return note.title.toLowerCase().includes(word) || note.content.toLowerCase().includes(word)
         })
     }
    },
    SET_NOTES (state, notes) {
        state.notes = notes
    },
    ADD_NOTE (state, note) {
        state.notes.unshift({
            id: note.id,
            title: note.title,
            content: note.content,
        })
    },
    UPDATE_NOTE (state, note) {
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1, {
            'id': note.id,
            'title': note.title,
            'content': note.content,
        })
    },
    DELETE_NOTE (state, id) {
        const index = state.notes.findIndex(item => item.id === id)
        state.notes.splice(index, 1)
    },
    CLEAR_NOTES (state) {
         state.notes = []
     },
 }

 const actions = {
    FILTERED_NOTES ({ commit }, word) {
         commit('FILTERED_NOTES', word)
     },
    SET_NOTES (context) {
        axios.get('/notes')
            .then(response => {
                context.commit('SET_NOTES', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    ADD_NOTE (context, note) {
        axios.post('/notes', {
            title: note.title,
            content: note.content,
        }).then(response => {
            context.commit('ADD_NOTE', response.data)
        }).catch(error => {
            console.log(error)
        })
    },
    UPDATE_NOTE (context, note) {
        axios.patch('/notes/' + note.id, {
            title: note.title,
            content: note.content,
        }).then(response => {
            context.commit('UPDATE_NOTE', response.data)
        }).catch(error => {
            console.log(error)
        })
    },
    DELETE_NOTE (context, id) {
        axios.delete('/notes/' + id)
           .then(() => {
               context.commit('DELETE_NOTE', id)
           }).catch(error => {
               console.log(error)
           })
    }
}

export default {
  state,
  mutations,
  getters,
  actions
}
