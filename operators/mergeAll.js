import Rx from 'rxjs'
import { bindContext, bindUnsubscribe } from '@utils'

const mergeAll = context => () => Rx.Observable.create(observer => {
  let active = 0
  let subscription = new Rx.Subscription()
  let groupSubscription = new Rx.GroupSubscription()

  const error = observer.error

  const complete = () => {
    --active <= 0 && observer.complete()
  }

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
