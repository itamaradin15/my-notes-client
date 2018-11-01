<template>
<v-content>
  <v-parallax dark src="https://media.metrolatam.com/2018/01/22/manzanaverde-1200x600.jpg">
    <v-layout align-center column justify-center>
      <h1 class="display-2 font-weight-thin mb-3">My Notes</h1>
      <h4 class="subheading">Aplicacion demo para manzana verde!</h4>
    </v-layout>
  </v-parallax>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
          <v-btn color="green" :to="{ name: 'login' }" large >Iniciar Sesion</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-content>
</template>