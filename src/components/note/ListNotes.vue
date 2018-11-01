<template>
    <v-app>
       <app-toolbar></app-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout >
                    <v-flex xs12 sm12>
                       <v-container fluid grid-list-md>
                                <v-layout  row wrap>
                                    <app-note v-for="note in notes"
                                              :key="note.id"
                                              :note="note"
                                              @editNote="editNote"
                                    ></app-note>
                                </v-layout>
                            </v-container>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <app-new-note></app-new-note>
        <v-dialog v-model="dialogEdit" width="600px">
            <v-card>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 >
                            <v-text-field
                                    label="Titulo"
                                    placeholder="Titulo de la nota"
                                    v-model="note.title"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                    name="input-7-1"
                                    label="Escriba su nota...."
                                    v-model="note.content"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="updateNote()">Actualizar</v-btn>
                    <v-btn @click="dialogEdit = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import Toolbar from '../Toolbar'
    import Note from './Note'
    import NewNote from './NewNote'

    export default {
        components: {
           'app-toolbar': Toolbar,
           'app-note': Note,
           'app-new-note': NewNote,
        },
        data () {
            return {
                dialogEdit: false,
                note: {
                    id: null,
                    title: '',
                    content: ''
                }
            }
        },
        created() {
            this.$store.dispatch('SET_NOTES')
        },
        methods: {
            editNote(note) {
                this.note = {
                    id: note.id,
                    title: note.title,
                    content: note.content,
                }
                this.dialogEdit = true;
            },
            updateNote(){
                if (this.note.title.trim().length === 0 || this.note.content.trim().length === 0) {
                    return null;
                }
                this.$store.dispatch('UPDATE_NOTE',this.note);
                this.dialogEdit = false
            }
        },
        computed: {
            notes() {
                try {
                    let a = (this.$store.getters.filterNotes || this.$store.getters.getNotes)
                    return a
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }
</script>