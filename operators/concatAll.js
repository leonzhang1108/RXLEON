import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from '@utils'

const concatAll = context => () => Rx.Observable.create(observer => {
  let subscription
  let groupSubscription = new Rx.GroupSubscription()
  let observableList = []

  const error = observer.error

  const concatSubscribe = observable => {
    if (!subscription) subscription = new Rx.Subscription()

    subscription.unsubscribe()

    const sub = observable.subscribe({
      next: observer.next,
      error,
      complete: () =>
        observableList.length
          ? concatSubscribe(observableList.shift())
          : observer.complete()
    })

    bindUnsubscribe(subscription, sub)
  }

  const next = observable => {
    observableList.push(observable)
    !subscription && concatSubscribe(observableList.shift())
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error }))

  return groupSubscription
})

module.exports = bindContext(concatAll)
