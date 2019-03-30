import Rx from 'toy-rx'
import { bindContext } from '@utils'

const merge = context => (...observables) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let total = 1

  const next = observer.next

  const error = observer.error

  const complete = (i = 0) =>
    --total <= 0
      ? observer.complete()
      : groupSubscription.unsubscribeIndex(i)

  const firstSubscription = context.subscribe({ next, error, complete })
  groupSubscription.add(firstSubscription)

  observables.forEach((observable, i) => {
    groupSubscription.add(observable.subscribe({
      next,
      error,
      complete: () => complete(i + 1)
    }))
  })

  return groupSubscription
})

module.exports = bindContext(merge)
