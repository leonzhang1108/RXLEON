import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from '@utils'

const catchOperator = context => f => Rx.Observable.create(observer => {
  let subscription = new Rx.Subscription()
  let groupSubscription = new Rx.GroupSubscription()

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    const observable = f(e)

    const sub = observable.subscribe({
      next: observer.next,
      error: observer.error
    })

    bindUnsubscribe(subscription, sub)
  }

  const complete = () => {
    observer.complete()
  }

  groupSubscription.add(subscription)
  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(catchOperator)
