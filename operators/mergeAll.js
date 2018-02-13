import Rx from 'rxjs'
import { bindContext } from './util.js'

const mergeAll = context => () => Rx.Observable.create(observer => {
  let active = 0
  let subscription = new Rx.Subscription()
  let groupSubscription = new Rx.GroupSubscription()

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    --active <= 0 && observer.complete()
  }

  const next = observable => {
    active++
    subscription = observable.subscribe({
      next: observer.next,
      error,
      complete
    })
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error }))

  return groupSubscription
})

module.exports = bindContext(mergeAll)
