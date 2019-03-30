import Rx from 'toy-rx'
import { isString } from '@utils'
Rx.Observable.of = require('@observables/of')
Rx.Observable.fromArray = require('@observables/fromArray')

module.exports = (...vals) =>
  vals.length === 1 && isString(vals[0])
    ? Rx.Observable.of(...vals)
    : Rx.Observable.fromArray(...vals)
