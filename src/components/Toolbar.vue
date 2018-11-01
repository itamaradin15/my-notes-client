<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <span class="hidden-sm-and-down">My Notes</span>
        </v-toolbar-title>
        <v-text-field v-model="search" flat solo-inverted hide-details prepend-inner-icon="search" label="Buscar" class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
            <v-btn @click="logout" color="accent">
                Salir
            </v-btn>
    </v-toolbar>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'app-toolbar',
        methods: {
            logout () {
                 axios.delete('/auth/logout')
                 this.$store.dispatch('LOGOUT')
            }
        },
        computed: {
            search: {
                get () {
                    return this.$store.state.search
                },
                set (value) {
                    this.$store.dispatch('FILTERED_NOTES', value)
                }
            }
        }
    }
</script>