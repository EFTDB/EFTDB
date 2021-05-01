<template>
  <div>
    <v-snackbar
      v-model="updating"
      :timeout="5000"
    >
      Updating content...
      <v-btn
        color="white"
        text
        @click="updating = false"
      >
        Dismiss
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="updated"
      :timeout="-1"
      color="info"
    >
      Update complete.
      <v-btn
        color="white"
        text
        @click="reloadApp"
      >
        Reload now
      </v-btn>

    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SERVICE_WORKER_STATUS } from '@/interfaces/generic';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'ServiceWorkerWatcher',
  data() {
    return {
      updating: false,
      updated: false
    }
  },
  methods: {
    reloadApp(): void {
      this.updated = false;
      window.location.reload();
    },
    processStatus(status: SERVICE_WORKER_STATUS): void {
      switch (status) {
        case SERVICE_WORKER_STATUS.INACTIVE: break;
        case SERVICE_WORKER_STATUS.ACTIVE: break;
        case SERVICE_WORKER_STATUS.UPDATING: 
          this.updating = true;
          break;
        case SERVICE_WORKER_STATUS.UPDATED: 
          this.updating = false;
          this.updated = true;
          break;
        default: break;
      }
    }
  },
  computed: {
    ...mapState(['swState'])
  },
  watch: {
    swState: function(newStatus: SERVICE_WORKER_STATUS) {
      this.processStatus(newStatus);
    }
  },
  mounted() {
    this.processStatus(this.swState);
  }
});
</script>

<style scoped>

</style>