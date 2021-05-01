<template>
  <div class="pa-2">
    <div class="text-center raising mt-10">
      <h1 class="headline mt-4">Map Overview</h1>
      <div class="subtitle-1 mb-4">
        Currently still under construction
      </div>
    </div>

    <v-img min-height="200" max-height="100%" class="maps-img" gradient="to top, rgba(18,18,18,1), rgba(18,18,18,.7)" :src="`/static/misc/aaa.jpg`" />

    <div
      class="d-flex flex-wrap justify-center align-center pa-4"
    >
    
      <v-card
        class="ma-4"
        width="480"
        height="300"
        max-width="100%"
        rounded
        :to="map.path"
        disabled
        :key="index"
        v-for="(map, index) of maps"
        raised
      >
        <v-img :gradient="map.active ? '' : 'to top, rgba(18,18,18,.3), rgba(18,18,18,.3)'" width="100%" height="300" :src="`${publicPath}static/map/${map.image}`">
          <v-card-title v-text="map.name" class="map-title" />
        </v-img>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Maps',
  metaInfo: {
    title: 'Maps',
    meta: [
      {property: 'description', content: 'Overview of all maps in Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all maps in Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all maps in Escape From Tarkov.'},
      {property: 'og:title', content: 'Maps - EFTDB.one'},
      {property: 'twitter:title', content: 'Maps - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/maps'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/maps'},
    ]
  },
  data: () => ({
    maps: [
      {
        name: 'Factory',
        image: 'Factory.jpg',
        path: 'map/factory'
      },
      {
        name: 'Customs',
        image: 'Customs.jpg',
        path: 'map/customs'
      },
      {
        name: 'Woods',
        image: 'Woods.jpg',
        path: 'map/woods'
      },
      {
        name: 'Shoreline',
        image: 'Shoreline.jpg',
        path: 'map/shoreline'
      },
      {
        name: 'Interchange',
        image: 'Interchange.jpg',
        path: 'map/interchange'
      },
      {
        name: 'The Lab',
        image: 'Labs.jpg',
        path: 'map/labs'
      },
      {
        name: 'Reserve',
        image: 'Reserve.jpg',
        path: 'map/reserve'
      },
      {
        name: 'Streets of Tarkov',
        image: 'Streets.jpg',
        path: 'map/streets'
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

  .map-title {
    position: absolute;
    bottom: 0;
    left: 0;
    text-shadow: 4px 4px 6px #000000;
  }

  .maps-img {
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