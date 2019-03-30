import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const throttle = context => f => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let subscription = new Rx.Subscription()
  let onOff = true
  let latest

  const error = observer.error

  const complete = observer.complete

  const next = x => {
    latest = x

    if (!onOff) return

    onOff = false

    observer.next(latest)

    const observable = f(x)

    const sub = observable.subscribe({
      next: x => {
        subscription.unsubscribe()
        Rx.Scheduler.async(() => { onOff = true })
      },
      error,
      complete
    })

    bindUnsubscribe(subscription, sub)
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(throttle)
