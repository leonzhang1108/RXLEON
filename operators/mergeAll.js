import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const mergeAll = context => () => Rx.Observable.create(observer => {
  let active = 0
  const subscription = new Rx.Subscription()
  const groupSubscription = new Rx.GroupSubscription()

  const error = observer.error

  const complete = () => --active <= 0 && subscription.unsubscribe()

  const next = observable => {
    active++
    const sub = observable.subscribe({
      next: observer.next,
      error,
      complete
    })

    bindUnsubscribe(subscription, sub)
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error }))

  return groupSubscription
})

module.exports = bindContext(mergeAll)
