<template>
  <div>
    <div class="home pa-4 d-flex align-start flex-wrap">
      <template>
        <v-card max-width="300" class="ma-4 flex-grow-1"  v-for="(topic, i) of topics" :key="i">
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{topic.title}}</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) of topic.items" :key="index">
                    <td v-text="item.name" />
                    <td class="text-center"><v-chip :color="item.status === 'missing' ? 'red' : item.status === 'outdated' ? 'deep-orange' : 'green'" small v-text="item.status" /></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import icons from '@/data/icons';

export default Vue.extend({
  name: 'Home',
  metaInfo: {
    title: 'Status',
    meta: [
      {property: 'description', content: 'Escape From Tarkov Database (EFTDB) website health and status.'},
      {property: 'og:description', content: 'Escape From Tarkov Database (EFTDB) website health and status.'},
      {property: 'twitter:description', content: 'Escape From Tarkov Database (EFTDB) website health and status.'},
      {property: 'og:title', content: 'Status - EFTDB.one'},
      {property: 'twitter:title', content: 'Status - EFTDB.one'},
      {property: 'og:url', content: 'https://www.eftdb.one/status'},
      {property: 'twitter:url', content: 'https://www.eftdb.one/status'},
    ]
  },
  components: {
  },
  data: () => ({
    icons,
    topics: [
      {
        title: 'Weapon',
        items: [
          { name: "PM", status: "OK" },
          { name: "PB", status: "OK" },
          { name: "TT", status: "OK" },
          { name: "P226R", status: "OK" },
          { name: "MP-443 Grach", status: "OK" },
          { name: "PM (t)", status: "OK" },
          { name: "SR-1MP", status: "OK" },
          { name: "GLOCK17", status: "OK" },
          { name: "APS", status: "OK" },
          { name: "APB", status: "OK" },
          { name: "GLOCK18C", status: "OK" },
          { name: "VPO-136", status: "OK" },
          { name: "VPO-209", status: "OK" },
          { name: "AKS-74U", status: "OK" },
          { name: "AKS-74UB", status: "OK" },
          { name: "AKS-74UN", status: "OK" },
          { name: "AK-74N", status: "OK" },
          { name: "AKM", status: "OK" },
          { name: "M4A1", status: "OK" },
          { name: "AS VAL", status: "OK" },
          { name: "AKMN", status: "OK" },
          { name: "AKMS", status: "OK" },
          { name: "AK-101", status: "OK" },
          { name: "AK-102", status: "OK" },
          { name: "AK-103", status: "OK" },
          { name: "AK-104", status: "OK" },
          { name: "AK-105", status: "OK" },
          { name: "AK-74M", status: "OK" },
          { name: "AKS-74N", status: "OK" },
          { name: "AKMSN", status: "OK" },
          { name: "ADAR 2-15", status: "OK" },
          { name: "HK 416A5", status: "outdated" },
          { name: "Saiga-9", status: "OK" },
          { name: "PP-91 Kedr", status: "OK" },
          { name: "PP-91-01 Kedr-B", status: "OK" },
          { name: "PP-9 Klin", status: "OK" },
          { name: "PP-19-01", status: "OK" },
          { name: "MP5", status: "OK" },
          { name: "MPX", status: "OK" },
          { name: "MP7A1", status: "OK" },
          { name: "MP7A2", status: "OK" },
          { name: "Saiga 12ga", status: "OK" },
          { name: "MR-133", status: "OK" },
          { name: "MP-153", status: "OK" },
          { name: "TOZ-106", status: "OK" },
          { name: "M870", status: "OK" },
          { name: "SKS", status: "OK" },
          { name: "OP-SKS", status: "OK" },
          { name: "VSS", status: "OK" },
          { name: "SV-98", status: "OK" },
          { name: "DVL-10", status: "OK" },
          { name: "RSASS", status: "OK" },
          { name: "M1A", status: "OK" },
          { name: "SA-58", status: "OK" },
          { name: "Mosin", status: "OK" },
          { name: "Mosin Infantry", status: "OK" },
          { name: "M700", status: "OK" },
          { name: "RPK-16", status: "OK" },
          { name: "DT MDR 7.62x51", status: "OK" },
          { name: "DT MDR 5.56x45", status: "OK" },
          { name: "T-5000", status: "OK" },
          { name: "VPO-215", status: "OK" },
          { name: "VPO-101 Hunter", status: "OK" },
          { name: "M9A3", status: "OK" },
          { name: "FN 5-7", status: "OK" },
          { name: "FN 5-7 FDE", status: "OK" },
          { name: "M1911A1", status: "OK" },
          { name: "MP5K-N", status: "OK" },
          { name: "TX-15 DML", status: "OK" },
          { name: "MP9", status: "OK" },
          { name: "MP9-N", status: "OK" },
          { name: "PPSH-41", status: "OK" },
          { name: "SR-25", status: "OK" },
          { name: "P90", status: "OK" },
          { name: "GL40", status: "OK" },
          { name: "M590A1", status: "OK" },
          { name: "ASh-12", status: "OK" },
          { name: "SVDS", status: "missing" }
        ]
      },
      {
        title: 'Attachment',
        items: [
          { name: "Magazines", status: "OK" },
          { name: "Muzzles", status: "outdated" },
          { name: "Pistol Grips", status: "outdated" },
          { name: "Stocks", status: "outdated" },
          { name: "Dust Covers", status: "outdated" },
          { name: "Foregrips", status: "OK" },
          { name: "Tactical", status: "OK" },
          { name: "Optics", status: "OK" },
          { name: "Sights", status: "outdated" },
          { name: "Barrels", status: "outdated" },
          { name: "Handguards", status: "outdated" },
          { name: "Receivers", status: "outdated" },
          { name: "Charges", status: "outdated" },
          { name: "Mounts", status: "outdated" },
          { name: "Gas mods", status: "outdated" },
          { name: "Bipods", status: "outdated" },
          { name: "Other", status: "outdated" },
        ]
      },
      {
        title: 'Map',
        items: [
          { name: "Factory", status: "outdated" },
          { name: "Customs", status: "missing" },
          { name: "Woods", status: "missing" },
          { name: "Shoreline", status: "outdated" },
          { name: "Interchange", status: "missing" },
          { name: "Labs", status: "missing" },
          { name: "Reserve", status: "missing" },
          { name: "Streets", status: "N/A" },
        ]
      },
      {
        title: 'Ammo',
        items: [
          { name: '9x18', status: 'OK' },
          { name: '9x19', status: 'OK' },
          { name: '9x21', status: 'OK' },
          { name: '9x39', status: 'OK' },
          { name: '.366', status: 'OK' },
          { name: '5.45x39', status: 'OK' },
          { name: '5.56x45', status: 'OK' },
          { name: '7.62x25', status: 'OK' },
          { name: '7.62x39', status: 'OK' },
          { name: '7.62x51', status: 'OK' },
          { name: '7.62x54R', status: 'OK' },
          { name: '12x70', status: 'OK' },
          { name: '20x70', status: 'OK' },
          { name: '4.6x30', status: 'OK' },
          { name: '.45', status: 'OK' },
          { name: '5.7x28', status: 'OK' },
          { name: '40x46', status: 'OK' }
        ]
      },
      {
        title: 'Gear',
        items: [
          { name: 'Armor', status: 'OK' },
          { name: 'Armor addons', status: 'pending' },
          { name: 'Backpacks', status: 'OK' },
          { name: 'Rigs', status: 'OK' },
          { name: 'Clothing', status: 'missing' },
          { name: 'Barter', status: 'missing' },
          { name: 'Tradeups', status: 'missing' },
        ]
      }
    ]
  }),
});
</script>

<style scoped>

  .weapon-test-img {
    position: absolute;
    top: 0;
    left: 0;
  }

</style>