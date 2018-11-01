<template>
    <div>
        <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="600px">
            <v-card>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 >
                            <v-text-field label="Titulo" placeholder="Titulo de la nota" v-model="title"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea name="input-7-1" label="Escriba su nota...." v-model="content"></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addNote()">Guardar</v-btn>
                    <v-btn @click="dialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default  {
        name: 'app-new-note',
        data() {
            return {
                dialog: false,
                title: '',
                content: ''
            }
        },
        methods: {
            addNote() {
                if (this.title.trim().length === 0 || this.content.trim().length === 0) {
                    return null;
                }
                this.dialog = false
                this.$store.dispatch('ADD_NOTE', {
                    title: this.title,
                    content: this.content,
                })
                this.title = ''
                this.content = ''
            }
        }
    }
</script>