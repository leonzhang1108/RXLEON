import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const debounce = context => f => Rx.Observable.create(observer => {
  const groupSubscription = new Rx.GroupSubscription()
  const subscription = new Rx.Subscription()

  const doDebounce = func => {
    const observable = f()

    subscription.unsubscribe()

    const sub = observable.subscribe({
      next: observer.next,
      error: observer.error,
      complete: func
    })

    bindUnsubscribe(subscription, sub)
  }

  const next = x => doDebounce(() => observer.next(x))

  const error = observer.error

  const complete = () => doDebounce(observer.complete)

  groupSubscription.add(subscription)
  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(debounce)
