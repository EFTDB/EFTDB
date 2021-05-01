<template>
  <div class="pa-4">
    <div class="text-center">
      <h1 class="headline mt-4">Armor</h1>
      <div class="subtitle-1 mb-4">
        Overview of all body armor, helmets, and armored rigs
      </div>
    </div>
    


    <v-tabs 
      fixed-tabs
      show-arrows
      background-color="primary"
    >
      <v-tab>
        <!-- <v-icon left>mdi-account</v-icon> -->
        Armored Rigs
      </v-tab>
      <v-tab>
        <!-- <v-icon left>mdi-lock</v-icon> -->
        Chest Armor
      </v-tab>
      <v-tab>
        <!-- <v-icon left>mdi-access-point</v-icon> -->
        Helmets
      </v-tab>
      <v-tab>
        <!-- <v-icon left>mdi-access-point</v-icon> -->
        Helmet Addons
      </v-tab>
      <v-tab-item>
        <v-simple-table dense class="text-left">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Trader</th>
                <th>Price</th>
                <th>Size</th>
                <th>Class</th>
                <th>Hitpoint</th>
                <th>Movement</th>
                <th>Turning</th>
                <th>Ergonomics</th>
                <th>Zones</th>
                <th>Material</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(armor, index) of rigs" :key="index" class="my-1">
                <td><v-img max-width="80" max-height="80" contain :src="`${publicPath}static/item/thumb/${armor.image}`" /></td>
                <td v-text="armor.name" />
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                  </div>
                  <div v-for="(tradeup, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                  </div>
                </td>
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                  </div>
                  <div v-for="(price, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    Tradeup
                  </div>
                </td>
                <td v-text="armor.internal" />
                <td v-text="armor.level" />
                <td v-text="armor.hitpoints" />
                <td v-text="armor.movement + '%'" />
                <td v-text="armor.turn + '%'" />
                <td v-text="armor.ergonomics + '%'" />
                <td v-text="armor.zones.join(', ')" />
                <td v-text="armor.material" />
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <v-simple-table dense class="text-left">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Trader</th>
                <th>Price</th>
                <th>Class</th>
                <th>Hitpoint</th>
                <th>Movement</th>
                <th>Turning</th>
                <th>Ergonomics</th>
                <th>Zones</th>
                <th>Material</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(armor, index) of body" :key="index" class="my-1">
                <td><v-img max-width="80" max-height="80" contain :src="`${publicPath}static/item/thumb/${armor.image}`" /></td>
                <td v-text="armor.name" />
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                  </div>
                  <div v-for="(tradeup, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                  </div>
                </td>
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                  </div>
                  <div v-for="(price, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    Tradeup
                  </div>
                </td>
                <td v-text="armor.level" />
                <td v-text="armor.hitpoints" />
                <td v-text="armor.movement + '%'" />
                <td v-text="armor.turn + '%'" />
                <td v-text="armor.ergonomics + '%'" />
                <td v-text="armor.zones.join(', ')" />
                <td v-text="armor.material" />
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <v-simple-table dense class="text-left">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Trader</th>
                <th>Price</th>
                <th>Class</th>
                <th>Hitpoint</th>
                <th>Movement</th>
                <th>Turning</th>
                <th>Ergonomics</th>
                <th>Zones</th>
                <th>Material</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(armor, index) of helmets" :key="index" class="my-1">
                <td><v-img max-width="80" max-height="80" contain :src="`${publicPath}static/item/thumb/${armor.image}`" /></td>
                <td v-text="armor.name" />
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                  </div>
                  <div v-for="(tradeup, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                  </div>
                </td>
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                  </div>
                  <div v-for="(price, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    Tradeup
                  </div>
                </td>
                <td v-text="armor.level" />
                <td v-text="armor.hitpoints" />
                <td v-text="armor.movement + '%'" />
                <td v-text="armor.turn + '%'" />
                <td v-text="armor.ergonomics + '%'" />
                <td v-text="armor.zones.join(', ')" />
                <td v-text="armor.material" />
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <v-simple-table dense class="text-left">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Trader</th>
                <th>Price</th>
                <th>Class</th>
                <th>Hitpoint</th>
                <th>Movement</th>
                <th>Turning</th>
                <th>Ergonomics</th>
                <th>Zones</th>
                <th>Material</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(armor, index) of addons" :key="index" class="my-1">
                <td><v-img max-width="80" max-height="80" contain :src="`${publicPath}static/item/thumb/${armor.image}`" /></td>
                <td v-text="armor.name" />
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                  </div>
                  <div v-for="(tradeup, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                  </div>
                </td>
                <td>
                  <div v-for="(price, outdex) of armor.prices" :key="outdex" class="line-wrap">
                    <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                  </div>
                  <div v-for="(price, outdex) of armor.tradeups" :key="outdex + armor.prices.length" class="line-wrap">
                    Tradeup
                  </div>
                </td>
                <td v-text="armor.level" />
                <td v-text="armor.hitpoints" />
                <td v-text="armor.movement + '%'" />
                <td v-text="armor.turn + '%'" />
                <td v-text="armor.ergonomics + '%'" />
                <td v-text="armor.zones.join(', ')" />
                <td v-text="armor.material" />
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
    </v-tabs>



  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import icons from '@/data/icons';
import { Armor } from '@/interfaces/items';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Armor',
  metaInfo: {
    title: 'Armor',
    meta: [
      {property: 'description', content: 'Overview of all protective gear in Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all protective gear in Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all protective gear in Escape From Tarkov.'},
      {property: 'og:title', content: 'Armor - EFTDB.one'},
      {property: 'twitter:title', content: 'Armor - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/armor'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/armor'},
    ]
  },
  data: () => ({
    icons,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    ...mapState(['armors']),
    armorClasses(): string[] {
      return this.armors.map((armor: Armor) => armor.class).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    },
    rigs(): Armor[] {
      return this.armors.filter((armor: Armor) => armor.class === 'Chest Rig')
    },
    body(): Armor[] {
      return this.armors.filter((armor: Armor) => armor.class === 'Body Armor')
    },
    helmets(): Armor[] {
      return this.armors.filter((armor: Armor) => armor.class === 'Helmet')
    },
    addons(): Armor[] {
      return this.armors.filter((armor: Armor) => armor.class === 'Attachment')
    }
  },
  created() {
    if (this.armors.length < 1)
      this.$store.dispatch('fetchArmors')
  }
})
</script>

<style scoped>

</style>