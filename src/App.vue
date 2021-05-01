<template>
  <v-app>
    <v-app-bar
      app
      flat
      :color="mobile ? '' : 'transparent'"
      absolute
    >
      <v-btn 
        @click="mini = !mini" 
        fab 
        x-small
        class="mr-4"
        v-if="!mobile"
      >
        <v-icon 
          v-text="mini ? icons.retract : icons.expand"
        />
      </v-btn>
      <v-btn 
        @click="menuActive = !menuActive" 
        v-if="mobile"
        depressed
        fab
        class="ml-n3 mr-1"
      >
        <v-icon 
          v-text="icons.menu"
        />
      </v-btn>

      <v-toolbar-title
        v-text="currentPageTitle"
      />

      <v-spacer />

      <v-btn 
        :tile="!mobile"
        class="mr-2"
        href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QMVVGNTE7D8RY&source=url"
        :fab="mobile"
        :depressed="mobile"
        small
      >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="2em" height="2em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M8.32 21.97a.546.546 0 0 1-.26-.32c-.03-.15-.06.11.6-4.09c.6-3.8.59-3.74.67-3.85c.13-.17.11-.17 1.61-.18c1.32-.03 1.6-.03 2.19-.12c3.25-.45 5.26-2.36 5.96-5.66c.04-.22.08-.41.09-.41c0-.01.07.04.15.1c1.03.78 1.38 2.22.99 4.14c-.46 2.29-1.68 3.81-3.58 4.46c-.81.28-1.49.39-2.69.42c-.8.04-.82.04-1.05.19c-.17.17-.16.14-.55 2.55c-.27 1.7-.37 2.25-.41 2.35c-.07.16-.21.3-.37.38l-.11.07H10c-1.29 0-1.62 0-1.68-.03m-4.5-2.23c-.19-.1-.32-.27-.32-.47C3.5 19 6.11 2.68 6.18 2.5c.09-.18.32-.37.5-.44L6.83 2h3.53c3.91 0 3.76 0 4.64.2c2.62.55 3.82 2.3 3.37 4.93c-.5 2.93-1.98 4.67-4.5 5.3c-.87.21-1.48.27-3.14.27c-1.31 0-1.41.01-1.67.15c-.26.15-.47.42-.56.75c-.04.07-.27 1.47-.53 3.1a241.3 241.3 0 0 0-.47 3.02l-.03.06H5.69c-1.58 0-1.8 0-1.87-.04z" fill="#3b7bbf"/></svg>
        <span class="ml-2 hidden-sm-and-down">Buy me a coffee</span>
      </v-btn>

      <!-- <v-btn 
        tile
          class="mr-2"
      >
        <v-icon 
          v-text="icons.patreon"
          color="#e85b46"
        />
        <span class="ml-2 hidden-sm-and-down">Become a Patreon</span>
      </v-btn> -->
      <v-btn 
        :tile="!mobile"
        href="https://discord.gg/3bsy36a"
        target="blank"
        :fab="mobile"
        :depressed="mobile"
        small
      >
        <v-icon 
          v-text="icons.discord"
          color="#7289da"
        />
        <span class="ml-2 hidden-sm-and-down">Join Discord</span>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer
      app
      :permanent="!mobile"
      dark
      :src="`${publicPath}static/misc/sidebar.jpg`"
      :mini-variant="mini && !mobile"
      mini-variant-width="80"
      v-model="menuActive"
    >
      <v-img max-height="40" contain :class="mini && !mobile ?  'mx-2 my-8' : 'mx-12 my-6'" :src="`/static/misc/logo_wide.png`"></v-img>

      <v-divider />

      <v-list nav>
        <template>
          <v-list-item 
            :key="index" 
            v-for="(navItem, index) of navItems"
            :to="navItem.route"
            class="mx-1 px-4"
            active-class="active-nav"
          >
            <v-list-item-icon>
              <v-icon v-text="navItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="navItem.name"></v-list-item-title>
          </v-list-item>
        </template>

      </v-list>
      
      <!-- <template v-slot:append>
      </template> -->

    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    
    <ServiceWorkerWatcher />

    <v-footer
      dark
      padless
      app
      inset
      absolute
    >
      <v-card
        flat
        tile
        class="text-center"
        width="100%"
      >

        <v-divider></v-divider>

        <v-card-text>
          <strong>EFTDB.one</strong> — Escape From Tarkov Database &copy; {{ new Date().getFullYear() }}  
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import icons from '@/data/icons';
import {version} from '../package.json';
import ServiceWorkerWatcher from '@/components/ServiceWorkerWatcher.vue';

export default Vue.extend({
  name: 'App',
  components: {
    ServiceWorkerWatcher
  },
  metaInfo: {
    title: 'Escape From Tarkov Database',
    titleTemplate: '%s - EFTDB.one'
  },
  data: () => ({
    mini: false,
    menuActive: true,
    icons,
    version,
    navItems: [{
      name: 'Landing Page',
      icon: icons.home,
      route: '/'
    }, {
      name: 'Weapons',
      icon: icons.weapons,
      route: '/weapons'
    }, {
      name: 'Items',
      icon: icons.items,
      route: '/items'
    }, {
      name: 'Maps',
      icon: icons.maps,
      route: '/maps'
    }],
    publicPath: process.env.BASE_URL
  }),
  computed: {
    currentPageTitle() {
      return this.$route.name;
    },
    mobile(): boolean {
      return this.$vuetify.breakpoint.name === 'xs';
    }
  },
  mounted() {
    if (this.$vuetify.breakpoint.name === 'xs')
      this.menuActive = false;

  },
  watch: {
    mobile(newValue: boolean) {`1`
      this.menuActive = !newValue;
    }
  }
})
</script>

<style>
  .active-nav {
    background-color: #1976D2;
    margin: 0;
    padding: 8px;
  }

  .line-wrap {
    white-space: nowrap;
  }

  .paypal-icon {
    color: #e85b46;
  }

  
</style>