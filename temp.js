async fetchCalibres ({commit}): Promise<Calibre[]> {
  return new Promise((resolve, reject) => {
    commit('setCalibres', calibresJSON);
    resolve(calibresJSON);
  });
},
async fetchWeapons ({commit, getters, dispatch}): Promise<Weapon[]> {
  return new Promise(async (resolve, reject) => {
    if (getters.allAttachments.length < 1)
      await dispatch('fetchAttachments')
    if (getters.allCalibres.length < 1)
      await dispatch('fetchCalibres')
    commit('setWeapons', weaponsJSON);
    resolve(weaponsJSON);
  });
},
async fetchAttachments ({commit}): Promise<Attachment[]> {
  return new Promise((resolve, reject) => {
    commit('setAttachments', attachmentsJSON);
    resolve(attachmentsJSON);
  });
},
async fetchArmors ({commit}): Promise<Armor[]> {
  return new Promise((resolve, reject) => {
    commit('setArmors', armorsJSON);
    resolve(armorsJSON);
  });
},
async fetchRigs ({commit}): Promise<Rig[]> {
  return new Promise((resolve, reject) => {
    commit('setRigs', rigsJSON);
    resolve(rigsJSON);
  });
},
async fetchBackpacks ({commit}): Promise<Backpack[]> {
  return new Promise((resolve, reject) => {
    commit('setBackpacks', backpacksJSON);
    resolve(backpacksJSON);
  });
}






    // saveWeaponBuild(): void {
    //   if (!this.weapon) return;
    //   const blob = new Blob([JSON.stringify(this.weaponBuild)], { type: 'application/json' });
    //   const link = document.createElement('a');
    //   link.href = URL.createObjectURL(blob);
    //   link.download = `EFTDB_${this.weapon.name}_${Date.now()}`;
    //   link.click();
    //   URL.revokeObjectURL(link.href);
    // },
















fetchCalibres ({commit}): Promise<Calibre[]> {
  return new Promise((resolve, reject) => {
    fetch('http://185.12.216.6:18432/calibres')
      .then(response => response.json())
      .then(data => {
        commit('setCalibres', data);
        resolve(data);
      })
      .catch(error => reject(error))
  });
},
fetchWeapons ({commit}): Promise<Weapon[]> {
  return new Promise((resolve, reject) => {
    fetch('http://185.12.216.6:18432/weapons')
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
    fetch('http://185.12.216.6:18432/attachments')
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
    fetch('http://185.12.216.6:18432/armors')
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
    fetch('http://185.12.216.6:18432/rigs')
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
    fetch('http://185.12.216.6:18432/backpacks')
      .then(response => response.json())
      .then(data => {
        commit('setBackpacks', data);
        resolve(data);
      })
      .catch(error => reject(error))
  });
}