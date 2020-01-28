import Rx from 'toy-rx'
import { bindContext } from '@utils'

const flatMap = context => f => Rx.Observable.create(observer => {
  let active = 0
  const groupSubscription = new Rx.GroupSubscription()

  const complete = () => --active === 0 && observer.complete()

  const next = x => {
    const observable = f(x)
    const innerObserver = {
      next: observer.next,
      error: observer.error,
      complete
    }
    active++
    groupSubscription.add(observable.subscribe(innerObserver))
  }

  const error = observer.error

  active++
  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(flatMap)
