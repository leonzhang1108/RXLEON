import Rx from 'rxjs'
import { bindContext } from '@utils'
Rx.Observable.prototype.refCount = require('@operators/refCount')
Rx.Observable.prototype.publish = require('@operators/publish')

const share = context => () => context.publish().refCount()

module.exports = bindContext(share)
