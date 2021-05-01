<template>
  <div class="pa-4" v-if="loaded">
      <v-img min-height="500" class="weapon-test-img" gradient="to top, rgba(18,18,18,1), rgba(18,18,18,.7)" :src="`${publicPath}static/misc/weapon_bg.jpg`" />
    
    <div
      class="d-flex flex-wrap mt-8"
    >
      <v-card
        width="500"
        max-width="100%"
        class="px-2 my-6 flex-grow-1 justify-center align-center"
        color="transparent"
        flat
      >
        <v-img contain max-height="250" max-width="100%" :src="`${publicPath}static/item/full/${weapon.image}`" />
      </v-card>
      <v-card
        width="400"
        max-width="100%"
        class="px-2 py-6 flex-grow-0"
        color="transparent"
        flat
      > 
        <v-card>
          <v-card
            class="weapon-card-icon-wrapper d-inline-flex justify-center align-center"
            width="80"
            height="80"
            color="blue"
          >
            <v-icon large v-text="icons.weapons"></v-icon>
          </v-card>
          <v-card
            class="weapon-card-title mt-1"
            flat
          >
            <v-card-title class="py-2 px-0" v-text="weapon.name" />
            <v-card-subtitle class="py-2 px-0" v-text="weapon.class" />
          </v-card>
          <v-card-text class="pt-0">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Base Stat</th>
                    <th class="text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stat, index) of stats" :key="index">
                    <td>
                      <v-tooltip v-model="stat.show" top color="info">
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">{{ stat.name }} <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                        </template>
                        <span v-text="stat.info" />
                      </v-tooltip>
                    </td>
                    <td>{{ stat.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-card>
    </div>


    <div
      class="d-flex flex-wrap mt-8"
    >
      <v-card
        width="750"
        class="px-2 py-6 flex-grow-1"
        color="transparent"
        flat
      >
        <v-card>
          <v-card
            class="weapon-card-icon-wrapper d-inline-flex justify-center align-center"
            width="80"
            height="80"
            color="green"
          >
            <v-icon large v-text="icons.shop"></v-icon>
          </v-card>
          <v-card
            class="weapon-card-title mt-1"
            flat
          >
            <v-card-title class="py-2 px-0" v-text="`Loadouts`" />
            <v-card-subtitle class="py-2 px-0" v-text="`Trader availability`" />
          </v-card>
          
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Trader</th>
                    <th>Price</th>
                    <th>Attachments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(build, index) of weapon.builds" :key="index" class="my-1">
                    <td><v-img max-width="125" contain :src="`${publicPath}static/item/thumb/${build.image}`" /></td>
                    <td>
                      <div v-for="(price, outdex) of build.prices" :key="outdex" class="line-wrap">
                        <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                      </div>
                      <div v-for="(tradeup, outdex) of build.tradeups" :key="outdex + build.prices.length" class="line-wrap">
                        <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                      </div>
                    </td>
                    <td>
                      <div v-for="(price, outdex) of build.prices" :key="outdex" class="line-wrap">
                        <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                      </div>
                      <div v-for="(price, outdex) of build.tradeups" :key="outdex + build.prices.length" class="line-wrap">
                        Tradeup
                      </div>
                    </td>
                    <td>
                      <v-card flat class="d-flex flex-wrap justify-start" min-width="205" color="transparent">
                        <v-img 
                          :key="index" 
                          v-for="(attachment, index) of build.attachments" 
                          height="33" 
                          width="33"
                          contain 
                          :src="`${publicPath}static/item/thumb/${attachment.image}`" 
                          class="ma-1 flex-grow-0"
                        />
                      </v-card>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-card>
      <v-card
        width="850"
        class="px-2 py-6 flex-grow-1"
        color="transparent"
        flat
      >
      <v-card>
        <v-card
          class="weapon-card-icon-wrapper d-inline-flex justify-center align-center"
          width="80"
          height="80"
          color="orange"
        >
          <v-icon large v-text="icons.ammunition"></v-icon>
        </v-card>
        <v-card
          class="weapon-card-title mt-1"
          flat
        >
          <v-card-title class="py-2 px-0" v-text="`Ammunition`" />
          <v-card-subtitle class="py-2 px-0" v-text="`Calibre ${weapon.calibre.name}`" />
        </v-card>
        <v-card-text class="py-0 my-0 px-6">{{activeAmmo.name}} selected for modding</v-card-text>
        <v-card-text>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Trader</th>
                  <th>Price</th>
                  <th>
                    <v-tooltip v-model="damageTooltip" top color="info">
                      <template v-slot:activator="{ on, attrs }">
                        <span class="line-wrap" v-bind="attrs" v-on="on">Dmg <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                      </template>
                      <span>Damage to body parts. Will be reduced by armor or other forms of penetration.</span>
                    </v-tooltip>
                  </th>
                  <th>
                    <v-tooltip v-model="penetrationTooltip" top color="info">
                      <template v-slot:activator="{ on, attrs }">
                        <span class="line-wrap" v-bind="attrs" v-on="on">Pen <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                      </template>
                      <span>Armor penetration rate. A good rule of thumb is 10 penetration per armor class.</span>
                    </v-tooltip>
                  </th>
                  <th>
                    <v-tooltip v-model="recoilTooltip" top color="info">
                      <template v-slot:activator="{ on, attrs }">
                        <span class="line-wrap" v-bind="attrs" v-on="on">Rec <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                      </template>
                      <span>Ammo recoil does not seem to affect the weapon as of this moment.</span>
                    </v-tooltip></th>
                  <th>
                    <v-tooltip v-model="accuracyTooltip" top color="info">
                      <template v-slot:activator="{ on, attrs }">
                        <span class="line-wrap" v-bind="attrs" v-on="on">Acc <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                      </template>
                      <span>Accuracy multiplier applied over the final stats of the modified weapon.</span>
                    </v-tooltip>
                  </th>
                  <th>
                    <v-tooltip v-model="velocityTooltip" top color="info">
                      <template v-slot:activator="{ on, attrs }">
                        <span class="line-wrap" v-bind="attrs" v-on="on">Vel <v-icon color="grey lighten-1" x-small v-text="icons.info" /></span>
                      </template>
                      <span>Ammo specific velocity overrides the base bullet velocity of the weapon.</span>
                    </v-tooltip>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ammo, index) of weapon.calibre.ammo" :key="index" @click="selectAmmo(ammo)" :class="activeAmmo == ammo ? 'ammoselect' : 'selecthover'">
                  <td>{{ ammo.name }}</td>
                  <td>
                    <div v-for="(price, outdex) of ammo.prices" :key="outdex" class="line-wrap">
                      <v-icon v-text="icons[price.level]" /> {{ price.trader }}
                    </div>
                    <div v-for="(tradeup, outdex) of ammo.tradeups" :key="outdex + ammo.prices.length" class="line-wrap">
                      <v-icon v-text="icons[tradeup.level]" /> {{ tradeup.trader }}
                    </div>
                  </td>
                  <td>
                    <div v-for="(price, outdex) of ammo.prices" :key="outdex" class="line-wrap">
                      <v-icon small v-text="icons[price.currency]" />  {{ price.value }}
                    </div>
                    <div v-for="(price, outdex) of ammo.tradeups" :key="outdex + ammo.prices.length" class="line-wrap">
                      Tradeup
                    </div>
                  </td>
                  <td>{{ ammo.damage }}</td>
                  <td>{{ ammo.penetration }}</td>
                  <td :class="ammo.recoil > 0 ? 'red--text' : ammo.recoil < 0 ? 'green--text' : ''">{{ ammo.recoil }}</td>
                  <td :class="ammo.accuracy < 0 ? 'red--text' : ammo.accuracy > 0 ? 'green--text' : ''">{{ ammo.accuracy }}%</td>
                  <td class="line-wrap">{{ ammo.velocity }} m/s</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br>
          Damage and penetration data retrieved from <a target="_blank" href="https://docs.google.com/spreadsheets/d/1Pp8tKScb0jB66cOCJSAlNn-iKERMXd9FVkSmSq83qn8/">NoFoodAfterMidnight's EFT Ammo and Armor Charts</a>.
        </v-card-text>
        </v-card>
      </v-card>
    </div>
    
    <WeaponModding :weapon="weapon" :ammo="activeAmmo" />
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Weapon, Ammo } from '../interfaces/items';
import icons from '@/data/icons';
import { mapState } from 'vuex';
import WeaponModding from '@/components/WeaponModding.vue';

export default Vue.extend({
  name: 'Weapon',
  metaInfo() {
    return {
      title: `${this.weaponName}`,
      meta: [
        {property: 'description', content: `All the information you need about the ${this.weaponName}! Weapon Modding, attachments, statistics, ammunition, and more!`},
        {property: 'og:description', content: `All the information you need about the ${this.weaponName}! Weapon Modding, attachments, statistics, ammunition, and more!`},
        {property: 'twitter:description', content: `All the information you need about the ${this.weaponName}! Weapon Modding, attachments, statistics, ammunition, and more!`},
        {property: 'og:title', content: `${this.weaponName} - EFTDB.one`},
        {property: 'twitter:title', content: `${this.weaponName} - EFTDB.one`},
        {property: 'og:url', content: `https://www.eftdb.one/weapon/${this.url}`},
        {property: 'twitter:url', content: `https://www.eftdb.one/weapon/${this.url}`},
      ]
    }
  },
  components: {
    WeaponModding
  },
  data: () => ({
    weapon: undefined as Weapon | undefined,
    icons,
    publicPath: process.env.BASE_URL,
    activeAmmo: undefined as Ammo | undefined,
    damageTooltip: false as boolean,
    penetrationTooltip: false as boolean,
    velocityTooltip: false as boolean,
    recoilTooltip: false as boolean,
    accuracyTooltip: false as boolean
  }),
  computed: {
    loaded(): boolean {
      return !!this.weapon;
    },
    url(): string {
      return this.$route.path
    },
    weaponName() {
      return this.weapon ? this.weapon.name : '';
    },
    stats(): any[] {
      if (this.weapon === undefined) return [];
      return [
        { show: false, name: 'Accuracy', info: 'Minute Of Angle (MOA) describes the deviation of a bullet. 1 MOA is approximately 3 cm at 100 m or 1" at 100 yards', value: this.weapon.accuracy + ' MOA' },
        { show: false, name: 'Vertical Recoil', info: 'How much vertical knockback you feel when firing the weapon. Lower is better.', value: this.weapon.recoil.vertical },
        { show: false, name: 'Horizontal Recoil', info: 'How much horizontal knockback you feel when firing the weapon. Lower is better.', value: this.weapon.recoil.horizontal },
        { show: false, name: 'Ergonomics', info: 'Effects weapon sway and aim down the sight speed. Higher is better', value: this.weapon.ergonomics },
        { show: false, name: 'Rate of Fire', info: 'The amount of rounds that the weapon can fire in one minute.', value: this.weapon.rpm + ' rpm' },
        { show: false, name: 'Effective Range', info: 'The maximum range at which an average shooter can hit a vehicle-sized target 50% of the time.', value: this.weapon.range + ' m' },
        { show: false, name: 'Firemodes', info: 'Which fire modes are avaiable on this weapon (Single, Burst, Full-Auto).', value: 
                              (this.weapon.firemodes.single ? 'Single' : '') +
                              (this.weapon.firemodes.burst ? ', Burst' : '') +
                              (this.weapon.firemodes.auto ? ', Auto' : '')
        },
      ]
    },
    ...mapState(['weapons'])
  },
  methods: {
    getWeapon() {
      if (this.$route.params.name) {
        this.weapon = this.$store.getters.weaponByName(this.$route.params.name.replace(/_/g, ' '));
        if (this.weapon)
          this.activeAmmo = this.weapon.calibre.ammo[0];
      }
    },
    selectAmmo(ammo: Ammo) {
      this.activeAmmo = ammo;
    }
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.params)
    },
    weapons() {
      this.getWeapon();
    }
  },
  created() {
    if (this.weapons.length < 1)
      this.$store.dispatch('fetchWeapons')
      .then(() => this.getWeapon())
    else 
      this.getWeapon();
  }
})
</script>

<style>

  .weapon-card-icon-wrapper {
    position: relative;
    left: 20px;
    top: -24px;
    margin-right: 48px;
    vertical-align: top;
  }

  .weapon-card-title {
    display: inline-block;
  }

  .weapon-test-img {
    position: absolute;
    top: 0;
    left: 0;
  }

  .ammoselect {
    background-color: #1976D2;
  }

  .selecthover {
    cursor: pointer;
  }

</style>