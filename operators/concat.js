import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const concat = context => observable => Rx.Observable.create(observer => {
  const subscription = new Rx.Subscription()

  const next = observer.next

  const error = observer.error

  const complete = () => {
    const sub = observable.subscribe(observer)
    bindUnsubscribe(subscription, sub)
  }

  const initSubscription = context.subscribe({ next, error, complete })

  bindUnsubscribe(subscription, initSubscription)

  return subscription
})

module.exports = bindContext(concat)
