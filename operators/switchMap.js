import Rx from 'rxjs'
import { bindContext } from './util.js'

const switchMap = context => f => Rx.Observable.create(observer => {
  const innerSubscription = new Rx.Subscription(() => {})
  let active = 1

  const next = x => {
    const innerObservable = f(x)

    const innerObserver = {
      next: v => observer.next(v),
      error: e => observer.error(e),
      complete: () => {
        --active <= 0 && observer.complete()
      }
    }
    innerSubscription.unsubscribe()
    innerSubscription.unsubscribe = innerObservable.subscribe(innerObserver).unsubscribe
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    --active <= 0 && observer.complete()
  }

  const groupSubscription = new Rx.GroupSubscription()

  groupSubscription.add(innerSubscription)

  active++

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(switchMap)
