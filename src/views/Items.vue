<template>
  <div class="pa-2">
    <div class="text-center raising mt-10">
      <h1 class="headline mt-4">Items</h1>
      <div class="subtitle-1 mb-4">
        Overview of all item categories
      </div>
    </div>
    
    <v-img min-height="200" max-height="100%" class="items-img" gradient="to top, rgba(18,18,18,1), rgba(18,18,18,.4)" :src="`/static/misc/ddd.jpg`" />
    
    <div
      class="d-flex flex-wrap justify-center align-center pa-4"
    >
    
      <v-card
        class="ma-4"
        width="480"
        height="300"
        max-width="100%"
        rounded
        :to="item.path"
        :disabled="!item.active"
        :key="index"
        v-for="(item, index) of items"
        raised
      >
        <v-hover v-slot:default="{ hover }">
          <v-img 
            :gradient="hover ? 'to top, rgba(218,218,218,.3), rgba(218,218,218,.1)' : item.active ? '' : 'to top, rgba(18,18,18,.5), rgba(18,18,18,.5)'" 
            width="100%" 
            height="300" 
            :src="`${publicPath}static/gear/${item.image}`"
          >
            <v-card-title 
              v-text="item.name" 
              class="item-title" 
            />
          </v-img>
        </v-hover>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Items',
  metaInfo: {
    title: 'Items',
    meta: [
      {property: 'description', content: 'Overview of all item categories related to Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all item categories related to Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all item categories related to Escape From Tarkov.'},
      {property: 'og:title', content: 'Items - EFTDB.one'},
      {property: 'twitter:title', content: 'Items - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/items'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/items'},
    ]
  },
  data: () => ({
    items: [
      {
        name: 'Armor',
        image: 'Armor.jpg',
        path: 'armor',
        active: true
      },
      {
        name: 'Backpacks',
        image: 'Backpacks.jpg',
        path: 'backpacks',
        active: true
      },
      {
        name: 'Chest Rigs',
        image: 'Rigs.jpg',
        path: 'rigs',
        active: true
      },
      {
        name: 'Attachments',
        image: 'Attachments.jpg',
        path: 'attachments',
        active: true
      },
      {
        name: 'Medication',
        image: 'Medication.jpg',
        path: 'medication',
        active: false
      },
      {
        name: 'Consumables',
        image: 'Consumables.jpg',
        path: 'consumables',
        active: false
      },
      {
        name: 'Barter',
        image: 'Barter.jpg',
        path: 'barter',
        active: false
      },
      {
        name: 'Keys',
        image: 'Keys.jpg',
        path: 'keys',
        active: false
      },
      {
        name: 'Tradeups',
        image: 'Tradeups.jpg',
        path: 'tradeups',
        active: false
      },
      {
        name: 'Grenades',
        image: 'Grenades.jpg',
        path: 'grenades',
        active: false
      }
    ],
    publicPath: process.env.BASE_URL
  }),
})
</script>

<style scoped>

  .headline {
    font-weight: 300;
    text-shadow: 4px 4px 6px #000000;
  }

  .subtitle-1 {
    font-weight: 300;
    text-shadow: 4px 4px 6px #000000;
  }

  .item-title {
    position: absolute;
    bottom: 0;
    left: 0;
    text-shadow: 4px 4px 6px #000000;
  }

  .items-img {
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