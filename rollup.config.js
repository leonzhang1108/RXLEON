import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
const pkg = require('./package.json')
const name = 'rxleon'
const output = {
  umd: 'min',
  es: 'esm',
  cjs: 'common'
}

const banner = [
  '/*!',
  ' * rxleon v' + pkg.version,
  ' * https://github.com/leonzhang1108/rxleon',
  ' * Released under the MIT License.',
  ' */'
].join('\n')

const plugins = [
  resolve(),
  commonjs()
]

export default {
  input: 'lib/index.js',
  output: Object.keys(output).map(format => ({
    name,
    banner,
    format,
    file: `dist/index.${output[format]}.js`
  })),
  sourceMap: true,
  plugins
}
