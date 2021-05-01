module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  pwa: {
    name: 'EFTDB',
    themeColor: '#1976D2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      name: 'Escape From Tarkov Database',
      short_name: 'EFTDB',
      display: 'standalone',
    },

    manifestPath: 'manifest.json',

    // workboxPluginMode: 'GenerateSW',
    // workboxOptions: {
    //   skipWaiting: true
    // }

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /^.*static\/.*$/,
        /\.map$/
      ]
    }
  }
}
