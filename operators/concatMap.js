import Rx from 'rxjs'
import { bindContext } from './util.js'

const concatMap = context => f => Rx.Observable.create(observer => {
  let observables = []
  let subscription = new Rx.Subscription()
  let groupSubscription = new Rx.GroupSubscription()

  const next = x => {
    const observable = f(x)
    observables.push(observable)
  }

  const error = e => {
    observer.error(e)
  }

  const concatSubscribe = observable => {
    subscription.unsubscribe()
    subscription = observable.subscribe({
      next: observer.next,
      error,
      complete: () => {
        observables.length
          ? concatSubscribe(observables.shift())
          : observer.complete()
      }
    })
  }

  const complete = () => {
    concatSubscribe(observables.shift())
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(concatMap)
