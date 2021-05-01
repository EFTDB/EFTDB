<template>
  <div class="px-2">
    <v-card
      class="mx-auto"
      width="400"
      max-width="100%"
    >
      <v-card-title>404</v-card-title>
      <v-card-subtitle>Page not found</v-card-subtitle>
      <v-card-text>We could not find the page that you requested.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="info" to="/">Take me away</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NotFound'
})
</script>

<style>

</style>