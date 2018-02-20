import Rx from 'rxjs'
import { bindContext } from './util.js'

const buffer = context => observable => Rx.Observable.create(observer => {
  let bufferList = []
  let groupSubscription = new Rx.GroupSubscription()

  const subscription = context.subscribe({
    next: x => {
      bufferList.push(x)
    },
    error: e => observer.error(e),
    complete: () => observer.complete()
  })

  const bufferSubscription = observable.subscribe({
    next: () => {
      observer.next(bufferList)
      bufferList = []
    },
    error: e => observer.error(e),
    complete: () => observer.complete()
  })

  groupSubscription.add(subscription)
  groupSubscription.add(bufferSubscription)

  return groupSubscription
})

module.exports = bindContext(buffer)
