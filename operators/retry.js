import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from '@utils'

const retry = context => initCount => Rx.Observable.create(observer => {
  let count = initCount
  let subscription = new Rx.Subscription()

  const next = observer.next

  const error = e => {
    if (--count !== 0) {
      subscription.unsubscribe()
      const sub = context.subscribe({ next, error, complete })
      bindUnsubscribe(subscription, sub)
    } else {
      observer.error(e)
      observer.complete()
    }
  }

  const complete = observer.complete

  const initSub = context.subscribe({ next, error, complete })

  bindUnsubscribe(subscription, initSub)

  return subscription
})

module.exports = bindContext(retry)
