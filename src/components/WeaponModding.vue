<template>
  <div>
    <v-card
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
          color="red"
        >
          <v-icon large v-text="icons.weaponmodding"></v-icon>
        </v-card>
        <v-card
          class="weapon-card-title mt-1"
          flat
        >
          <v-card-title class="py-2 px-0" v-text="`Modding`" />
          <v-card-subtitle class="py-2 px-0" v-text="`Build your ${weapon.name}`" />
        </v-card>
        <v-card
          flat
          class="saveload mx-1"
        >
          <v-btn class="mx-1" :disabled="saveSnack" :loading="saveSnack" small @click="saveWeaponBuild"><v-icon v-text="icons.save" class="mr-2" /> Save</v-btn>
          <v-btn class="mx-1" small @click="loadWeaponBuild"><v-icon v-text="icons.load" class="mr-2" /> Load</v-btn>
           <v-tooltip v-model="saveTip" top color="info">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on"><v-icon color="grey lighten-1" small v-text="icons.info" /></span>
            </template>
            <span>Temporary system for quicksaving. This will be replaced with a more advanced system for saving and sharing at a later date.</span>
          </v-tooltip>
        </v-card>

        <div>
          <v-card v-if="weapon" class="d-flex modding-wrapper pa-2" width="100%">
            <ModdingSlot 
              :key="index" 
              v-for="(field, index) of weapon.fields" 
              :field="field" v-on:newattachment="updateAttachment" 
              :initial="initial" 
            />
          </v-card>
        </div>
      </v-card>
    </v-card>

    <v-card
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
            color="deep-orange"
          >
            <v-icon large v-text="icons.basket"></v-icon>
          </v-card>
          <v-card
            class="weapon-card-title mt-1"
            flat
          >
            <v-card-title class="py-2 px-0" v-text="`Shopping List`" />
            <v-card-subtitle class="py-2 px-0" v-text="`Stats and prices`" />
          </v-card>
        <v-card
          flat
        >

            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Trader</th>
                    <th>Price</th>
                    <th>Magazine</th>
                    <th>Ergonomics</th>
                    <th>Accuracy</th>
                    <th>Recoil Ver</th>
                    <th>Recoil Hor</th>
                    <th>Velocity</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-if="weapon">
                    <td><v-img height="33" width="33" contain :src="`${publicPath}static/item/thumb/${weapon.image}`" /></td>
                    <td v-text="weapon.name" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td v-text="weapon.ergonomics" />
                    <td v-text="weapon.accuracy" />
                    <td v-text="weapon.recoil.vertical" />
                    <td v-text="weapon.recoil.horizontal" />
                    <td v-text="weapon.velocity + ' m/s'" />
                  </tr>

                  
                  
                  <tr v-if="ammo" class="total-row">
                    <td><v-img height="33" width="33" contain :src="`${publicPath}static/item/thumb/${ammo.image}`" /></td>
                    <td v-text="ammo.name" />
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
                    <td />
                    <td />
                    <td :class="ammo.accuracy < 0 ? 'red--text' : ammo.accuracy > 0 ? 'green--text' : ''" v-text="(ammo.accuracy || 0) + '%'" />
                    <td :class="'line-through ' + (ammo.recoil > 0 ? 'red--text' : ammo.recoil < 0 ? 'green--text' : '')" v-text="(ammo.recoil || 0) + '%'" />
                    <td :class="'line-through ' + (ammo.recoil > 0 ? 'red--text' : ammo.recoil < 0 ? 'green--text' : '')" v-text="(ammo.recoil || 0) + '%'" />
                    <td v-text="(ammo.velocity || 0) + ' m/s'" />
                  </tr>

                  <tr v-for="(attachment, index) of shoppingList" :key="index">
                    <td><v-img height="33" width="33" contain :src="`${publicPath}static/item/thumb/${attachment.image}`" /></td>
                    <td v-text="attachment.name" />
                    
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
                    <td>{{ attachment.magazine }}</td>
                    <td :class="attachment.ergonomics < 0 ? 'red--text' : attachment.ergonomics > 0 ? 'green--text' : ''" v-text="attachment.ergonomics" />
                    <td :class="attachment.accuracy < 0 ? 'red--text' : attachment.accuracy > 0 ? 'green--text' : ''" v-text="attachment.accuracy + '%'" />
                    <td :class="attachment.recoil > 0 ? 'red--text' : attachment.recoil < 0 ? 'green--text' : ''" v-text="attachment.recoil + '%'" />
                    <td :class="attachment.recoil > 0 ? 'red--text' : attachment.recoil < 0 ? 'green--text' : ''" v-text="attachment.recoil + '%'" />
                    <td :class="attachment.velocity < 0 ? 'red--text' : attachment.velocity > 0 ? 'green--text' : ''" v-text="attachment.velocity + '%'" />
                    <!-- <td>
                      <v-switch dense class="mt-0 mb-n3" v-model="attachment.active"></v-switch>
                    </td> -->
                  </tr>
                  
                  <tr class="total-row">
                    <td></td>
                    <td>Total</td>
                    <td></td>
                    <td />
                    <td v-text="totalMagazine" />
                    <td v-text="totalErgonomics" />
                    <td v-text="totalAccuracy" />
                    <td v-text="totalRecoilVertical" />
                    <td v-text="totalRecoilHorizontal" />
                    <td v-text="totalVelocity + ' m/s'" />
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Weapon, Attachment, BuildField, WeaponBuild, ShoppingAttachment, Ammo } from '@/interfaces/items';
import { ATTACHMENTCLASSES } from '@/interfaces/generic';
import ModdingSlot from '@/components/modding/ModdingSlot.vue';
import icons from '@/data/icons';

export default Vue.extend({
  name: 'WeaponModding',
  components: {
    ModdingSlot
  },
  props: {
    weapon: Object as () => Weapon | undefined,
    ammo: Object as () => Ammo | undefined
  },
  data: () => ({
    active: undefined as Weapon | undefined,
    weaponBuild: undefined as WeaponBuild | undefined,
    shoppingList: [] as ShoppingAttachment[],
    ATTACHMENTCLASSES,
    icons,
    publicPath: process.env.BASE_URL,
    initial: undefined as WeaponBuild | undefined,
    filterDialog: false as boolean,
    saveTip: false as boolean,
    saveSnack: false as boolean
  }),
  methods: {
    saveWeaponBuild(): void {
      if (!this.weapon) return;
      localStorage.setItem(this.weapon.name, JSON.stringify(this.weaponBuild));
      this.saveSnack = true;
      setTimeout(() => this.saveSnack = false, 1000)
    },
    loadWeaponBuild(): void {
      if (!this.weapon) return;
      const build = localStorage.getItem(this.weapon.name);
      if (build) {
        this.initial = undefined;
        this.initial = JSON.parse(build);
      }
    },
    recurseAttachments(arr: BuildField[]): BuildField[] {
      const attachments: BuildField[] = [];
      arr.forEach(buildField => {
        attachments.push(buildField, ...this.recurseAttachments(buildField.fields));
      })
      return attachments;
    },
    updateShoppingList(): void {
      if (this.weaponBuild === undefined) 
        return console.error('Weapon build is not defined');
      
      const buildFields = this.recurseAttachments(this.weaponBuild.fields);
      const attachments: ShoppingAttachment[] = [];
      buildFields.forEach(buildField => {
        const a = this.$store.getters.attachmentByID(buildField.attachment);
        a.include = buildField.include;
        attachments.push(a);
      })
      this.shoppingList = attachments;
    },
    updateAttachment(bf: BuildField): void {
      if (this.weapon === undefined)
        return console.error('No active weapon is set');
      
      if (this.weaponBuild === undefined) 
        this.weaponBuild = {
          name: 'New Build',
          weapon: this.weapon._id,
          fields: []
        }
      
      const i = this.weaponBuild.fields.findIndex(f => f.field === bf.field);
      if (i >= 0) 
        if (bf.attachment === undefined)
          this.weaponBuild.fields =  this.weaponBuild.fields.splice(i, 1)
        else
          this.weaponBuild.fields[i] = bf;
      else
        if (bf.attachment !== undefined)
          this.weaponBuild.fields.push(bf)

      this.updateShoppingList();
    }
  },
  computed: {
    build(): Object {
      return {}
    },
    totalMagazine(): number {
      if (!this.weapon) return 0;
      const attachment = this.shoppingList.find(attachment => attachment.magazine)
      return attachment ? attachment.magazine : 0;
    },
    totalErgonomics(): number {
      if (!this.weapon) return 0;
      return this.weapon.ergonomics + this.shoppingList.map(attachment => attachment.ergonomics).reduce((a, b) => a + b, 0);
    },
    totalAccuracy(): number {
      if (!this.weapon) return 0;
      const barrel = this.shoppingList.find(attachment => attachment.class === ATTACHMENTCLASSES.BARREL);
      return Math.round((!this.ammo ? 100 : 100 - this.ammo.accuracy) * Math.round((barrel && barrel.barrel ? barrel.barrel : this.weapon.accuracy) * (100 - this.shoppingList.map(attachment => attachment.accuracy).reduce((a, b) => a + b, 0))) / 100) / 100;
    },
    totalRecoilHorizontal(): number {
      if (!this.weapon) return 0;
      return Math.round(this.weapon.recoil.horizontal * (100 + this.shoppingList.map(attachment => attachment.recoil).reduce((a, b) => a + b, 0)) / 100);
    },
    totalRecoilVertical(): number {
      if (!this.weapon) return 0;
      return Math.round(this.weapon.recoil.vertical * (100 + this.shoppingList.map(attachment => attachment.recoil).reduce((a, b) => a + b, 0)) / 100);
    },
    totalVelocity(): number {
      if (!this.weapon) return 0;
      return Math.round((this.ammo ? this.ammo.velocity : this.weapon.velocity) * (100 + this.shoppingList.map(attachment => attachment.velocity).reduce((a, b) => a + b, 0)) / 100);
    }
  }
});
</script>

<style scoped>

  .modding-wrapper {
    overflow-x: auto;
  }

  .line-through {
    text-decoration: line-through;
    font-style: italic;
  }

  .saveload {
    display: inline-block;
  }

</style>