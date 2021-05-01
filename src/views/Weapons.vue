<template>
  <div class="pa-2">
    <div class="text-center raising mt-10">
      <h1 class="headline mt-4">Weapon Overview</h1>
      <div class="subtitle-1 mb-4">
        Click on a weapon to reveal more details and modding options
      </div>
    </div>
    
    <v-img min-height="200" max-height="100%" class="weapons-img" gradient="to top, rgba(18,18,18,1), rgba(18,18,18,.4)" :src="`/static/misc/ccc.jpg`" />

    <v-dialog v-model="classDialog" max-width="320">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="mx-2" 
          small
          v-bind="attrs"
          v-on="on"
        > 
          <v-icon v-text="icons.filter" /> Class
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Filter by class</v-card-title>
        <v-list dense>
          <v-list-item-group v-model="filterClasses" multiple color="primary">
            <v-list-item
              v-for="(item, index) in weaponClasses"
              :key="index"
              :value="item"
            >
                <v-list-item-title v-text="item" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
    <v-dialog v-model="ammoDialog" max-width="320">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="mx-2" 
          small
          v-bind="attrs"
          v-on="on"
        > 
          <v-icon v-text="icons.filter" /> Calibre
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Filter by calibre</v-card-title>
        <v-list dense>
          <v-list-item-group v-model="filterAmmo" multiple color="primary">
            <v-list-item
              v-for="(item, index) in weaponAmmo"
              :key="index"
              :value="item"
            >
              <v-list-item-title v-text="item" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
    <div
      class="d-flex flex-wrap justify-center"
    >
      <v-card
        :key="index"
        v-for="(weapon, index) of filteredWeapons"
        class="ma-2 flex-grow-1"
        width="360"
        :to="`/weapon/${weapon.name.replace(/ /g, '_')}`"
      >
        <div class="d-flex flex-no-wrap justify-space-between justify-center align-center">
          <div>
            <v-card-title v-text="weapon.name" class="wrap" />
            <v-card-subtitle v-text="weapon.class + ' - ' + (weapon.calibre ? weapon.calibre.name : '')" />
            
          </div>
            <v-img contain max-height="64" max-width="150" class="mx-2" :src="`${publicPath}static/item/thumb/${weapon.image}`" />
        </div>
      </v-card>
      <v-card width="360" class="ma-2 flex-grow-1" color="transparent" v-for="x of [997,998,999]" :key="x" flat />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Weapon } from '../interfaces/items';
import icons from '@/data/icons';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Weapons',
  metaInfo: {
    title: 'Weapons',
    meta: [
      {property: 'description', content: 'Overview of all the weapons avaiable in Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all the weapons avaiable in Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all the weapons avaiable in Escape From Tarkov.'},
      {property: 'og:title', content: 'Weapons - EFTDB.one'},
      {property: 'twitter:title', content: 'Weapons - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/weapons'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/weapons'},
    ]
  },
  data: () => ({
    icons,
    filterClasses: [] as string[],
    filterAmmo: [] as string[],
    classDialog: false as boolean,
    ammoDialog: false as boolean,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    ...mapState(['weapons']),
    filteredWeapons(): Weapon[] {
      let weapons = this.weapons;
      if (this.filterClasses.length > 0) 
        weapons = weapons.filter((weapon: Weapon) => this.filterClasses.includes(weapon.class))

      if (this.filterAmmo.length > 0) 
        weapons = weapons.filter((weapon: Weapon) => this.filterAmmo.includes(weapon.calibre ? weapon.calibre.name : ''))

      return weapons;
    },
    weaponClasses(): string[] {
      return this.weapons.map((weapon: Weapon) => weapon.class).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    },
    weaponAmmo(): string[] {
      return this.weapons.map((weapon: Weapon) => weapon.calibre ? weapon.calibre.name : false).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index && typeof value === 'string');
    }
  },
  created() {
    if (this.weapons.length < 1)
      this.$store.dispatch('fetchWeapons')
  }
})
</script>

<style scoped>
  .test-card {
    position: absolute;
    top: 0;
    right: 0;
  }

  .headline {
    font-weight: 300;
    text-shadow: 4px 4px 6px #000000;
  }

  .subtitle-1 {
    font-weight: 300;
    text-shadow: 4px 4px 6px #000000;
  }

  .aaaaaaaaaa div div {
    justify-content: center;
  }

  .filter-name {
    position: absolute;
    left: 20px;
    top: -22px;
  }

  .weapons-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .raising {
    position: relative;
    z-index: 2;
  }

</style>