module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['@babel/env'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            rxjs: './core',
            '@test': './test',
            '@utils': './utils',
            '@operators': './operators',
            '@observables': './observables'
          }
        }
      ]
    ],
    env: {
      test: {
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'istanbul'
        ]
      }
    }
  }
}
