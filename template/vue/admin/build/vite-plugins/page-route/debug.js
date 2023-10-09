const { register } = require('esbuild-register/dist/node')

register()

const plugin = require('./index.ts')

module.exports = plugin.default
