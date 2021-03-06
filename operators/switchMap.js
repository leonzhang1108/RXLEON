import Rx from 'toy-rx'
import { bindContext, bindUnsubscribe } from '@utils'

const switchMap = context => f => Rx.Observable.create(observer => {
  const innerSubscription = new Rx.Subscription()
  let active = 1

  const next = x => {
    const innerObservable = f(x)

    const innerObserver = {
      next: observer.next,
      error: observer.error,
      complete: () => --active <= 0 && observer.complete()
    }
    innerSubscription.unsubscribe()

    const innerSub = innerObservable.subscribe(innerObserver)

    bindUnsubscribe(innerSubscription, innerSub)
  }

  const error = observer.error

  const complete = () => --active <= 0 && observer.complete()

  const groupSubscription = new Rx.GroupSubscription()

  groupSubscription.add(innerSubscription)

  active++

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(switchMap)
