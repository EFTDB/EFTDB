<template>
  <div class="pa-4">
    <div class="text-center">
      <h1 class="headline mt-4">Attachment Overview</h1>
      <div class="subtitle-1 mb-4">
        Click on an attachment to reveal more details and modding options
      </div>
    </div>

    <v-tabs 
      fixed-tabs
      show-arrows
      background-color="primary"
    >
      <v-tab 
        v-text="ac" 
        v-for="(ac, index) of attachmentClasses" 
        :key="index" 
      />
      <v-tab-item 
        v-for="(ac, index) of attachmentClasses" 
        :key="index"
      >
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Trader</th>
                <th>Price</th>
                <th v-if="ac === 'Magazine'">Magazine</th>
                <th v-if="ac === 'Optic' || ac === 'Sight'">Range</th>
                <th>Ergonomics</th>
                <th>Accuracy</th>
                <th>Recoil</th>
                <th>Velocity</th>
              </tr>
            </thead>
            <tbody>
              <tr class="selecthover" v-for="(attachment, outdex) in attachmentsByClass(ac)" :key="outdex" @click="$router.push(`attachment/${attachment.name.replace(/ /g, '_')}`)">
                <td><v-img height="33" width="33" contain :src="`${publicPath}static/item/thumb/${attachment.image}`" /></td>
                <td>{{ attachment.name }}</td>
                <td>
                  <div v-for="(price, outdex) of attachment.prices" :key="outdex" class="line-wrap">
                    <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                  </div>
                  <div v-for="(tradeup, outdex) of attachment.tradeups" :key="outdex + attachment.prices.length" class="line-wrap">
                    <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                  </div>
                </td>
                <td>
                  <div v-for="(price, outdex) of attachment.prices" :key="outdex" class="line-wrap">
                    <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                  </div>
                  <div v-for="(price, outdex) of attachment.tradeups" :key="outdex + attachment.prices.length" class="line-wrap">
                    Tradeup
                  </div>
                </td>
                <td v-if="ac === 'Magazine'">{{ attachment.magazine }}</td>
                <td v-if="ac === 'Optic' || ac === 'Sight'">{{ attachment.range }}</td>
                <td :class="attachment.ergonomics < 0 ? 'red--text' : attachment.ergonomics > 0 ? 'green--text' : ''" v-text="attachment.ergonomics" />
                <td :class="attachment.class === 'Barrel' ? '' : attachment.accuracy < 0 ? 'red--text' : attachment.accuracy > 0 ? 'green--text' : ''" v-text="attachment.accuracy + (attachment.class === 'Barrel' ? ' MOA' : '%')" />
                <td :class="attachment.recoil > 0 ? 'red--text' : attachment.recoil < 0 ? 'green--text' : ''" v-text="attachment.recoil + '%'" />
                <td :class="attachment.velocity < 0 ? 'red--text' : attachment.velocity > 0 ? 'green--text' : ''" v-text="attachment.velocity + '%'" />
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
import { Attachment } from '../interfaces/items';
import icons from '@/data/icons';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Attachments',
  metaInfo: {
    title: 'Attachments',
    meta: [
      {property: 'description', content: 'Overview of all weapon attachments in Escape From Tarkov.'},
      {property: 'og:description', content: 'Overview of all weapon attachments in Escape From Tarkov.'},
      {property: 'twitter:description', content: 'Overview of all weapon attachments in Escape From Tarkov.'},
      {property: 'og:title', content: 'Attachments - EFTDB.one'},
      {property: 'twitter:title', content: 'Attachments - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/attachments'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/attachments'},
    ]
  },
  data: () => ({
    icons,
    filterClasses: [] as string[],
    filterAmmo: [] as string[],
    filterDialog: false as boolean,
    publicPath: process.env.BASE_URL,
    headers: [{name: 'Name'}, {ergonomics: 'Ergonomics' }]
  }),
  computed: {
    ...mapState(['attachments']),
    filteredAttachments(): Attachment[] {
      let attachments = this.attachments;
      if (this.filterClasses.length > 0) 
        attachments = attachments.filter((attachment: Attachment) => this.filterClasses.includes(attachment.class))

      return attachments;
    },
    attachmentClasses(): string[] {
      return this.attachments.map((attachment: Attachment) => attachment.class).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    },
    vertical(): boolean {
      return this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl'
    }
  },
  methods: {
    attachmentsByClass(ac: string): Attachment[] {
      return this.attachments.filter((attachment: Attachment) => attachment.class === ac);
    }
  },
  created() {
    if (this.attachments.length < 1)
      this.$store.dispatch('fetchAttachments')
  }
})
</script>

<style scoped>
  .test-card {
    position: absolute;
    top: 0;
    right: 0;
  }
  

  .selecthover {
    cursor: pointer;
  }

  .headline {
    font-weight: 300;
  }

  .subtitle-1 {
    font-weight: 300;
  }

  .aaaaaaaaaa div div {
    justify-content: center;
  }

  .filter-name {
    position: absolute;
    left: 20px;
    top: -22px;
  }
</style>