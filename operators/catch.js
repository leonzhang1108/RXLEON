import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const catchOperator = context => f => Rx.Observable.create(observer => {
  const subscription = new Rx.Subscription()
  const groupSubscription = new Rx.GroupSubscription()

  const next = observer.next

  const error = e => {
    const observable = f(e)

    const sub = observable.subscribe({
      next: observer.next,
      error: observer.error
    })

    bindUnsubscribe(subscription, sub)
  }

  const complete = observer.complete

  groupSubscription.add(subscription)
  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(catchOperator)
