import Rx from 'rxjs'
import { bindContext } from '@utils'

const flatMap = context => f => Rx.Observable.create(observer => {
  let active = 0
  let groupSubscription = new Rx.GroupSubscription()

  const next = x => {
    const observable = f(x)
    const innerObserver = {
      next: y => observer.next(y),
      error: observer.error,
      complete: () => {
        --active === 0 && observer.complete()
      }
    }
    active++
    groupSubscription.add(observable.subscribe(innerObserver))
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    --active === 0 && observer.complete()
  }

  active++
  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(flatMap)
