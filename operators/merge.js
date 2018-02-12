import Rx from 'rxjs'
import { bindContext } from './util.js'

const merge = context => observable => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()

  groupSubscription.add(context.subscribe(observer))
  groupSubscription.add(observable.subscribe(observer))

  return groupSubscription
})

module.exports = bindContext(merge)
