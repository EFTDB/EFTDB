<template>
  <div class="pa-2">
    <div class="text-center">
      <h1 class="headline mt-4">Backpacks</h1>
      <div class="subtitle-1 mb-4">
        Overview of all backpacks and their prices
      </div>
    </div>

    <v-simple-table dense class="text-left">
      <template v-slot:default>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Trader</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(backpack, index) of backpacks" :key="index" class="my-1">
            <td><v-img max-width="80" max-height="80" contain :src="`${publicPath}static/item/thumb/${backpack.image}`"/></td>
            <td v-text="backpack.name" />
            <td>
              <div v-for="(price, outdex) of backpack.prices" :key="outdex" class="line-wrap">
                <v-icon v-text="icons[price.level]" /> {{ price.trader }}
              </div>
              <div v-for="(tradeup, outdex) of backpack.tradeups" :key="outdex + backpack.prices.length" class="line-wrap">
                <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
              </div>
            </td>
            <td>
              <div v-for="(price, outdex) of backpack.prices" :key="outdex" class="line-wrap">
                <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
              </div>
              <div v-for="(price, outdex) of backpack.tradeups" :key="outdex + backpack.prices.length" class="line-wrap">
                Tradeup
              </div>
            </td>
            <td v-text="backpack.weight" />
            <td v-text="backpack.internal" />
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import icons from '@/data/icons';
import { Backpack } from '@/interfaces/items';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Backpacks',
  metaInfo: {
    title: 'Backpacks',
    meta: [
      {property: 'description', content: 'Overview of all backpacks in Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all backpacks in Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all backpacks in Escape From Tarkov.'},
      {property: 'og:title', content: 'Backpacks - EFTDB.one'},
      {property: 'twitter:title', content: 'Backpacks - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/backpacks'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/backpacks'},
    ]
  },
  data: () => ({
    icons,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    ...mapState(['backpacks'])
  },
  created() {
    if (this.backpacks.length < 1)
      this.$store.dispatch('fetchBackpacks')
  }
})
</script>

<style scoped>

</style>