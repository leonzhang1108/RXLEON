import Rx from 'rxjs'
import { bindContext } from './util.js'

const merge = context => (...observables) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let total = 1

  const next = x => observer.next(x)

  const error = e => observer.error(e)

  const complete = (i = 0) => {
    --total <= 0
      ? observer.complete()
      : groupSubscription.unsubscribeIndex(i)
  }

  const firstSubscription = context.subscribe({ next, error, complete })
  groupSubscription.add(firstSubscription)

  observables.forEach((observable, i) => {
    groupSubscription.add(observable.subscribe({
      next, 
      error, 
      complete: () => complete(i)
    }))
  })

  return groupSubscription
})

module.exports = bindContext(merge)
