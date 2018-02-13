import Rx from 'rxjs'
import { bindContext } from './util.js'

const concatMapTo = context => observable => Rx.Observable.create(observer => {
  let subscription = new Rx.Subscription()
  let groupSubscription = new Rx.GroupSubscription()
  let active = 0
  let initiated = false

  const concatSubscribe = ob => {
    subscription.unsubscribe()
    subscription = ob.subscribe({
      next: observer.next,
      error,
      complete: () => {
        --active <= 0
          ? observer.complete()
          : concatSubscribe(ob)
      }
    })
  }

  const next = x => {
    active++

    if (!initiated) {
      initiated = true
      concatSubscribe(observable)
    }
  }

  const error = e => {
    observer.error(e)
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error }))

  return groupSubscription
})

module.exports = bindContext(concatMapTo)
