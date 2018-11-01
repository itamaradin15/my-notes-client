<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <form  @submit.prevent="login" @keydown="form.errors.clear($event.target.name)">
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <router-link :to="{ name: 'about' }">
                                    <v-btn  icon><v-icon>help</v-icon></v-btn>
                                </router-link>
                            </v-toolbar>
                            <v-card-text>
                                <v-text-field
                                        type="email"
                                        prepend-icon="person"
                                        v-model="form.email"
                                        :error-messages="form.errors.get('email')"
                                        label="Email"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        v-model="form.password"
                                        type="password"
                                        :error-messages="form.errors.get('password')"
                                        prepend-icon="lock"
                                        name="password"
                                        label="Contraseña"
                                        required
                                ></v-text-field>

                            </v-card-text>
                            <v-card-actions>
                                <v-flex xs12>
                                        <v-btn :is-loading="isLoading" :disabled="isDisabled" full  xs12 large  block color="primary" @click="login()">Entrar</v-btn>
                                </v-flex>
                            </v-card-actions>
                        </v-card>
                        </form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    import Form from '../../utils/Form'
    export default {
        data () {
            return {
                form: new Form({
                    email: '',
                    password: ''
                }),
                isLoading: false
            }
        },

        computed: {
            isDisabled () {
                return this.form.incompleted() || this.isLoading
            }
        },

        methods: {
            login () {
                if (this.isDisabled) {
                    return false
                }

                this.isLoading = true
                this.form.post('/auth/login')
                    .then( (data) => {
                        this.$store.dispatch('LOGIN', data)
                    })
                    .catch(() => {
                        this.isLoading = false
                        this.form.password = ''
                    })
            }
        }
    }
</script>