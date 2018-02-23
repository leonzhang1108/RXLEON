import Rx from 'rxjs'
import { bindContext } from '@utils'
Rx.Observable.prototype.multicast = require('@operators/multicast')

const publish = context => () => context.multicast(new Rx.Subject())

module.exports = bindContext(publish)
