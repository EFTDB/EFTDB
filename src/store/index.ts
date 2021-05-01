import Vue from 'vue'
import Vuex from 'vuex'
import { Weapon, Attachment, Calibre, Armor, Rig, Backpack } from '@/interfaces/items'
import { SERVICE_WORKER_STATUS } from '@/interfaces/generic'
 
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    calibres: [] as Calibre[],
    weapons: [] as Weapon[],
    attachments: [] as Attachment[],
    armors: [] as Armor[],
    rigs: [] as Rig[],
    backpacks: [] as Backpack[],
    swState: SERVICE_WORKER_STATUS.INACTIVE as SERVICE_WORKER_STATUS
  },
  getters: {
    allWeapons(state): Weapon[] {
      return state.weapons;
    },
    allArmors(state): Armor[] {
      return state.armors;
    },
    allRigs(state): Rig[] {
      return state.rigs;
    },
    allBackpacks(state): Backpack[] {
      return state.backpacks;
    },
    allAttachments(state): Attachment[] {
      return state.attachments;
    },
    allCalibres(state): Calibre[] {
      return state.calibres;
    },
    weaponByName(state) {
      return function(name: string): Weapon | undefined  {
        return state.weapons.find((weapon: Weapon) => weapon.name === name);
      }
    },
    attachmentByName(state) {
      return function(name: string): Attachment | undefined  {
        return state.attachments.find((attachment: Attachment) => attachment.name === name);
      }
    },
    attachmentByID(state) {
      return function(id: number): Attachment | undefined  {
        return state.attachments.find((attachment: Attachment) => attachment._id === id);
      }
    },
    calibreById(state) {
      return function(id: number): Calibre | undefined  {
        return state.calibres.find((calibre: Calibre) => calibre._id === id);
      }
    },
    attachmentParentsByID(state) {
      return function(id: number): Attachment[] {
        const arr: Attachment[] = [];
        state.attachments.forEach(attachment => {
          let found = false;
          attachment.fields.forEach(field => {
            if (field.attachments.includes(id)) found = true;
          })
          if (found) arr.push(attachment)
        });
        return arr;
      }
    },
    attachmentWeaponsByID(state) {
      return function(id: number): Weapon[] {
        const arr: Weapon[] = [];
        state.weapons.forEach(weapon => {
          let found = false;
          weapon.fields.forEach(field => {
            if (field.attachments.includes(id)) arr.push(weapon);
          })
          if (found) arr.push(weapon)
        });
        return arr;
      }
    }
  },
  mutations: {
    setCalibres(state, calibres: Calibre[]) { 
      state.calibres = calibres;
    },
    setWeapons(state, weapons: Weapon[]) { 
      for (let i=0; i<weapons.length; i++) {
        weapons[i].calibre = state.calibres.find(calibre => calibre._id === weapons[i].calibre);
        for (let j=0; j<weapons[i].builds.length; j++) {
          weapons[i].builds[j].attachments = state.attachments.filter(attachment => weapons[i].builds[j].attachments.includes(attachment._id));
        }
      }
      state.weapons = weapons;
    },
    setAttachments(state, attachments: Attachment[]) {
      state.attachments = attachments;
    },
    setArmors(state, armors: Armor[]) {
      state.armors = armors;
    },
    setRigs(state, rigs: Rig[]) {
      state.rigs = rigs;
    },
    setBackpacks(state, backpacks: Backpack[]) {
      state.backpacks = backpacks;
    },
    setSWState(state, status: SERVICE_WORKER_STATUS) {
      state.swState = status;
    }
  },
  actions: {
    setSWState({commit}, status) {
      commit('setSWState', status);
    },
    fetchCalibres ({commit}): Promise<Calibre[]> {
      return new Promise((resolve, reject) => {
        fetch('/static/data/calibres.json')
        // fetch('http://localhost:18432/calibres')
          .then(response => response.json())
          .then(data => {
            commit('setCalibres', data);
            resolve(data);
          })
          .catch(error => reject(error))
      });
    },
    fetchWeapons ({commit, getters, dispatch}): Promise<Weapon[]> {
      return new Promise(async (resolve, reject) => {
        if (getters.allAttachments.length < 1)
          await dispatch('fetchAttachments')
        if (getters.allCalibres.length < 1)
          await dispatch('fetchCalibres')
        fetch('/static/data/weapons.json')
        // fetch('http://localhost:18432/weapons')
          .then(response => response.json())
          .then(data => {
            commit('setWeapons', data);
            resolve(data);
          })
          .catch(error => reject(error))
      });
    },
    fetchAttachments ({commit}): Promise<Attachment[]> {
      return new Promise((resolve, reject) => {
        fetch('/static/data/attachments.json')
        // fetch('http://localhost:18432/attachments')
          .then(response => response.json())
          .then(data => {
            commit('setAttachments', data);
            resolve(data);
          })
          .catch(error => reject(error))
      });
    },
    fetchArmors ({commit}): Promise<Armor[]> {
      return new Promise((resolve, reject) => {
        fetch('/static/data/armors.json')
        // fetch('http://localhost:18432/armors')
          .then(response => response.json())
          .then(data => {
            commit('setArmors', data);
            resolve(data);
          })
          .catch(error => reject(error))
      });
    },
    fetchRigs ({commit}): Promise<Rig[]> {
      return new Promise((resolve, reject) => {
        fetch('/static/data/rigs.json')
        // fetch('http://localhost:18432/rigs')
          .then(response => response.json())
          .then(data => {
            commit('setRigs', data);
            resolve(data);
          })
          .catch(error => reject(error))
      });
    },
    fetchBackpacks ({commit}): Promise<Backpack[]> {
      return new Promise((resolve, reject) => {
        fetch('/static/data/backpacks.json')
        // fetch('http://localhost:18432/backpacks')
          .then(response => response.json())
          .then(data => {
            commit('setBackpacks', data);
            resolve(data);
          })
          .catch(error => reject(error))
      });
    }
  }
})
