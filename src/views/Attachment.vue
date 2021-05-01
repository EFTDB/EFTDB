<template>
  <div class="pa-4" v-if="loaded">
      <!-- <v-img min-height="500" class="weapon-test-img" gradient="to top, rgba(18,18,18,1), rgba(18,18,18,.7)" :src="`${publicPath}static/misc/weapon_bg.jpg`" /> -->

    <v-card
      class="mx-auto px-2 pt-8 my-2"
      flat
      max-width="600"
    >
      <v-img class="mx-auto" :max-width="attachment.grid.x * 63 + 3" :max-height="attachment.grid.y * 63 + 3" :src="`${publicPath}static/item/thumb/${attachment.image}`" />
      <v-card-title v-text="attachment.name" />
      <v-card-subtitle v-text="attachment.class" />

      
      <v-card-text>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Stat</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stat, index) of stats" :key="index">
                <td v-if="stat.value > 0 || stat.value < 0">
                  <v-tooltip v-model="stat.show" top color="info">
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ stat.name }} <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                    </template>
                    <span v-text="stat.info" />
                  </v-tooltip>
                </td>
                <td v-if="stat.value > 0 || stat.value < 0">{{ stat.value }}{{ stat.suffix }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-card
      class="mx-auto px-2 my-2"
      flat
      max-width="600"
    >
      <v-card-title>Modding slots</v-card-title>
      <v-card-subtitle>Available modding slots to fit attachments on this attachment.</v-card-subtitle>

      <v-card-text v-for="(field, index) of attachment.fields" :key="index">
        {{field.name}}
        <v-list>
          <v-list-item v-for="(att, outdex) of getFieldsAttachments(field)" :key="outdex" @click="$router.push(`/attachment/${att.name.replace(/ /g, '_')}`)" >
            <v-list-item-avatar tile>
              <v-img contain :src="`${publicPath}static/item/thumb/${att.image}`" />
            </v-list-item-avatar>
            <v-list-item-title v-text="att.name" />
          </v-list-item>
        </v-list>
      </v-card-text>

    </v-card>
    <v-card
      class="mx-auto px-2 my-2"
      flat
      max-width="600"
    >
      <v-card-title>Compatibility</v-card-title>
      <v-card-subtitle>Attachment and weapons that this attachment can fit on.</v-card-subtitle>

      <v-card-text>
        <v-list>
          <v-list-item v-for="weapon of parentWeapons" :key="weapon._id" @click="$router.push(`/weapon/${weapon.name.replace(/ /g, '_')}`)" >
            <v-list-item-avatar tile>
              <v-img contain :src="`${publicPath}static/item/thumb/${weapon.image}`" />
            </v-list-item-avatar>
            <v-list-item-title v-text="weapon.name" />
          </v-list-item>
          
          <v-list-item v-for="att of parentAttachments" :key="att._id" @click="$router.push(`/attachment/${att.name.replace(/ /g, '_')}`)" >
            <v-list-item-avatar tile>
              <v-img contain :src="`${publicPath}static/item/thumb/${att.image}`" />
            </v-list-item-avatar>
            <v-list-item-title v-text="att.name" />
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Attachment, Weapon } from '../interfaces/items';
import icons from '@/data/icons';
import { mapState } from 'vuex';
import WeaponModding from '@/components/WeaponModding.vue';

export default Vue.extend({
  name: 'Weapon',
  metaInfo() {
    return {
      title: `${this.attachmentName}`,
      meta: [
        {property: 'description', content: `All the information you need about the ${this.attachmentName}! Statistics, visuals, uses and more!`},
        {property: 'og:description', content: `All the information you need about the ${this.attachmentName}! Statistics, visuals, uses and more!`},
        {property: 'twitter:description', content: `All the information you need about the ${this.attachmentName}! Statistics, visuals, uses and more!`},
        {property: 'og:title', content: `${this.attachmentName} - EFTDB.one`},
        {property: 'twitter:title', content: `${this.attachmentName} - EFTDB.one`},
        {property: 'og:url', content: `https://www.eftdb.one/attachment/${this.url}`},
        {property: 'twitter:url', content: `https://www.eftdb.one/attachment/${this.url}`},
      ]
    }
  },
  components: {
    WeaponModding
  },
  data: () => ({
    attachment: undefined as Attachment | undefined,
    icons,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    loaded(): boolean {
      return !!this.attachment;
    },
    url(): string {
      return this.$route.path
    },
    attachmentName() {
      return this.attachment ? this.attachment.name : '';
    },
    parentAttachments(): Attachment[] {
      if (!this.attachment) return [];
      return this.$store.getters.attachmentParentsByID(this.attachment._id);
    },
    parentWeapons(): Weapon[] {
      if (!this.attachment) return [];
      return this.$store.getters.attachmentWeaponsByID(this.attachment._id);
    },
    
    stats(): any[] {
      if (this.attachment === undefined) return [];
      return [
        { show: false, name: 'Magazine', info: 'The ammo capacity of this magazine', value: this.attachment.magazine, suffix: '' },
        { show: false, name: 'Range', info: 'Scoping or sighting range of the attachment.', value: this.attachment.range, suffix: ' m' },
        { show: false, name: 'Accuracy', info: 'Directly influences the Minute Of Angle (MOA) of the weapon.', value: this.attachment.accuracy, suffix: '%' },
        { show: false, name: 'Barrel', info: 'This stat overwrites the base Minute Of Angle (MOA) of the weapon. 1 MOA is approximately 3 cm at 100 m or 1" at 100 yards.', value: this.attachment.barrel, suffix: ' MOA' },
        { show: false, name: 'Recoil', info: 'How much knockback you feel when firing the weapon.', value: this.attachment.recoil, suffix: '%' },
        { show: false, name: 'Ergonomics', info: 'Effects weapon sway and aim down the sight speed.', value: this.attachment.ergonomics, suffix: '' },
        { show: false, name: 'Velocity', info: 'The speed of the bullet when it leaves the barrel.', value: this.attachment.velocity, suffix: '%' }
      ]
    },
    ...mapState(['attachments'])
  },
  methods: {
    getAttachment() {
      if (this.$route.params.name) {
        this.attachment = this.$store.getters.attachmentByName(this.$route.params.name.replace(/_/g, ' '));
      }
    },
    getFieldsAttachments(field: any): Attachment[] {
      const attachments: Attachment[] = []
      field.attachments.forEach((attachment: Attachment) => attachments.push(this.$store.getters.attachmentByID(attachment)));
      return attachments;
    }
  },
  watch: {
    $route(to, from) {
      this.getAttachment();
    },
    weapons() {
      this.getAttachment();
    }
  },
  created() {
    if (this.attachments.length < 1)
      this.$store.dispatch('fetchWeapons')
      .then(() => this.getAttachment())
    else 
      this.getAttachment();
  }
})
</script>

<style>

</style>