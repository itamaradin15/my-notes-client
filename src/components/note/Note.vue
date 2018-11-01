<template>
    <v-flex d-flex xs12 sm6 md4 >
        <v-card color="blue-grey darken-2"  class="white--text">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{note.title}}</h3>
                    <div>{{note.content}}</div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn @click="editNote(note)" flat icon color="white">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn @click="removeNote(note.id)" flat icon color="white">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>
<script>
    export default {
        name: 'app-note',
        props: {
            note: {
                type: Object,
                required:true,
            }
        },
        methods: {
            editNote(note){
                this.$emit('editNote',note)
            },
            removeNote(id) {
                this.$store.dispatch('DELETE_NOTE', id)
            },
        }
    }
</script>
