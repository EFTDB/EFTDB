<template>
  <div>
    <div class="weapon-test-img">
      <v-img gradient="to top, rgba(18,18,18,1), rgba(18,18,18,.4)" :src="`/static/misc/landing_bg.jpg`" />
    </div>


    <v-card flat color="transparent" class="mx-auto px-8" max-width="600">
      <v-img class="mx-4 cover-logo" contain :src="`/static/misc/logo_trans.png`" />
    </v-card>
    <div class="px-4">
    <v-alert
      border="top"
      colored-border
      type="warning"
      max-width="600"
      class="mx-auto caption"
    >
      Website is still in development. 
      Some menu options might be unavailable.
      <br>
      Coming soon:
      <br> - Medication and consumables
      <br> - Better sorting and filtering of tables
      <br> - Using a trader loadout as starting point for weapon modding
      <br> - Proper implementation of saving and sharing weapon modding builds
      <br> - Factory map
      <br><br>
      Older attachments might have some outdated data. 
      If you find any errors in attachment or weapon data, please report it in the Discord.
      The join button is in the top right.
    </v-alert>
    
    <v-alert
      border="top"
      colored-border
      type="info"
      max-width="600"
      class="mx-auto caption"
    >
      EFTDB isn't endorsed by Battlestate Games and doesn't reflect the views or opinions of Battlestate Games or anyone officially involved in producing or managing Escape From Tarkov. 
      <br><br>
      All the information and assets shown are directly observable in-game. 
      All data was acquired purely by observing and no third-party software was used to mine data in any way. 
    </v-alert>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import icons from '@/data/icons';

export default Vue.extend({
  name: 'Home',
  metaInfo: {
    title: 'Escape From Tarkov Database',
    meta: [
      {property: 'description', content: 'Escape From Tarkov Database (EFTDB) provides an overview of in-game items and modding options.'},
      {property: 'og:description', content: 'Escape From Tarkov Database (EFTDB) provides an overview of in-game items and modding options.'},
      {property: 'twitter:description', content: 'Escape From Tarkov Database (EFTDB) provides an overview of in-game items and modding options.'},
      {property: 'og:title', content: 'Escape From Tarkov Database - EFTDB.one'},
      {property: 'twitter:title', content: 'Escape From Tarkov Database - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/'},
    ]
  },
  components: {
  },
  data: () => ({
    icons
  }),
});
</script>

<style scoped>

  .weapon-test-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 100vh;
    max-width: 100vw;
    margin-top: -64px;
    padding-top: 64px;
    overflow: hidden;
  }

  .cover-logo {
    min-height: 32vh;
  }

</style>