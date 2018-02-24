import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let total = 0

  observables.forEach((observable, i) => {
    total++

    const next = observer.next

    const error = observer.error

    const complete = () => {
      --total <= 0
        ? observer.complete()
        : groupSubscription.unsubscribeIndex(i)
    }

    groupSubscription.add(observable.subscribe({next, error, complete}))
  })

  return groupSubscription
})
