<template>
  <div class="pa-2">
    <div class="text-center">
      <h1 class="headline mt-4">Tactical Rigs</h1>
      <div class="subtitle-1 mb-4">
        Overview of all tactical rigs and their prices
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
            <th>Armor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rig, index) of rigs" :key="index" class="my-1">
            <td><v-img max-width="80" max-height="80" contain :src="`${publicPath}static/item/thumb/${rig.image}`" /></td>
            <td v-text="rig.name" />
            <td>
              <div v-for="(price, outdex) of rig.prices" :key="outdex" class="line-wrap">
                <v-icon v-text="icons[price.level]" /> {{ price.trader }}
              </div>
              <div v-for="(tradeup, outdex) of rig.tradeups" :key="outdex + rig.prices.length" class="line-wrap">
                <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
              </div>
            </td>
            <td>
              <div v-for="(price, outdex) of rig.prices" :key="outdex" class="line-wrap">
                <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
              </div>
              <div v-for="(price, outdex) of rig.tradeups" :key="outdex + rig.prices.length" class="line-wrap">
                Tradeup
              </div>
            </td>
            <td v-text="rig.weight" />
            <td v-text="rig.internal" />
            <td v-text="rig.armored" />
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import icons from '@/data/icons';
import { Armor, Rig } from '@/interfaces/items';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Rigs',
  metaInfo: {
    title: 'Rigs',
    meta: [
      {property: 'description', content: 'Overview of all tactical rigs in Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all tactical rigs in Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all tactical rigs in Escape From Tarkov.'},
      {property: 'og:title', content: 'Rigs - EFTDB.one'},
      {property: 'twitter:title', content: 'Rigs - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/rigs'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/rigs'},
    ]
  },
  data: () => ({
    icons,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    ...mapState(['rigs'])
  },
  created() {
    if (this.rigs.length < 1)
      this.$store.dispatch('fetchRigs')
  }
})
</script>

<style scoped>

</style>