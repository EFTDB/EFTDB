<template>
  <v-card
    class="pa-1 mx-1"
    flat
    outlined
    v-if="field"
  >
    <div class="d-flex flex-column justify-center ">
      <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
            class="text-center mb-2"
          >
            <span v-text="field.name" /><br>
            <v-card class="mx-auto" min-height="66" min-width="66" max-width="129" :color="activeAttachment ? '' : field.vital ? 'red darken-4' : 'grey darken-3'" flat>
              <v-img max-height="66" contain max-width="129" v-if="activeAttachment" :src="`${publicPath}static/item/thumb/${activeAttachment.image}`" />
              <v-icon v-else small v-text="icons.empty" class="ma-6" />
              <span class="caption" v-if="activeAttachment" v-text="activeAttachment.name" />
            </v-card><br>
          </div>
        </template>
        <v-card>
          <v-card-title v-text="`Select a ${field.name}`"></v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Trader</th>
                    <th>Price</th>
                    <th v-if="field.name == ATTACHMENTCLASSES.MAGAZINE">Magazine</th>
                    <th>Ergonomics</th>
                    <th>Recoil</th>
                    <th>Accuracy</th>
                    <th v-if="field.name == ATTACHMENTCLASSES.MUZZLE || field.name == ATTACHMENTCLASSES.BARREL || field.name == ATTACHMENTCLASSES.RECEIVER" >Velocity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr @click="selectAttachment(undefined)">
                    <td />
                    <td v-text="`None`" />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr v-for="(attachment, index) of fieldAttachments" :key="index" @click="selectAttachment(attachment)" :class="activeAttachment == attachment ? 'attachmentselect' : 'selecthover'">
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
                    <td v-if="field.name == ATTACHMENTCLASSES.MAGAZINE">{{ attachment.magazine }}</td>
                    <td :class="attachment.ergonomics < 0 ? 'red--text' : attachment.ergonomics > 0 ? 'green--text' : ''" v-text="attachment.ergonomics" />
                    <td :class="attachment.recoil > 0 ? 'red--text' : attachment.recoil < 0 ? 'green--text' : ''" v-text="attachment.recoil" />
                    <td :class="attachment.accuracy < 0 ? 'red--text' : attachment.accuracy > 0 ? 'green--text' : ''"  v-text="attachment.accuracy" />
                    <td v-text="attachment.velocity" v-if="field.name == ATTACHMENTCLASSES.MUZZLE || field.name == ATTACHMENTCLASSES.BARREL || field.name == ATTACHMENTCLASSES.RECEIVER" />
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div v-if="activeAttachment" class="d-flex justify-center">
        <ModdingSlot :key="index" v-for="(f, index) of activeAttachment.fields" :field="f" v-on:newattachment="updateAttachment" :initial="initialField" />
      </div>
    </div>
    
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Weapon, Attachment, BuildField, WeaponBuild } from '@/interfaces/items';
import { ATTACHMENTCLASSES } from '@/interfaces/generic';
import icons from '@/data/icons';

export default Vue.extend({
  name: 'ModdingSlot',
  props: {
    field: Object as () => Weapon['fields'][0] | undefined,
    initial: Object as () => BuildField | undefined
  },
  data: () => ({
    dialog: false as boolean,
    activeAttachment: undefined as Attachment | undefined,
    buildField: undefined as BuildField | undefined,
    ATTACHMENTCLASSES,
    icons,
    publicPath: process.env.BASE_URL,
    initialField: undefined as BuildField | undefined
  }),
  methods: {
    selectAttachment(attachment: Attachment): void {
      this.dialog = false;
      this.activeAttachment = attachment;

      if (this.field === undefined)
        return console.error('No active field');

      this.buildField = {
        field: this.field._id,
        attachment: this.activeAttachment ? this.activeAttachment._id : undefined,
        include: true,
        fields: []
        // TODO: Remember fields
      };
      this.$emit('newattachment', this.buildField)
    },
    updateAttachment(bf: BuildField): void {
      if (this.buildField === undefined) 
        return console.error('No build field while updating');
      
      const i = this.buildField.fields.findIndex(f => f.field === bf.field);
      if (i >= 0)
        this.buildField.fields[i] = bf;
      else
        this.buildField.fields.push(bf)

      this.$emit('newattachment', this.buildField)
    },
    parseInitial(): void {
      if (this.field === undefined || this.initial === undefined) return;
      const initialField = this.initial.fields.find(item => item.field === this.field!._id);
      if (initialField) {
        this.initialField = initialField;
        this.selectAttachment(this.fieldAttachments.find(attachment => attachment._id === initialField.attachment)!);
      }
      else
        this.activeAttachment = undefined;
    }
  },
  computed: {
    fieldAttachments(): Weapon['fields'][0]['attachments'] {
      const attachments: Attachment[] = []
      if (this.field !== undefined)
        this.field.attachments.forEach(attachment => attachments.push(this.$store.getters.attachmentByID(attachment)));
      return attachments;
    },
  },
  watch: {
    field() {
      this.activeAttachment = undefined;
    },
    initial(newVal, oldVal) {
      this.parseInitial();
    }
  },
  created() {
    this.parseInitial();
  }
});
</script>

<style scoped>

  .attachmentselect {
    background-color: #1976D2;
  }

  .selecthover {
    cursor: pointer;
  }

</style>