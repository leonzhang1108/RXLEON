import Rx from 'toy-rx'

module.exports = (...observables) => Rx.Observable.create(observer => {
  const groupSubscription = new Rx.GroupSubscription()
  let total = 0

  const next = observer.next
  const error = observer.error

  observables.forEach((observable, i) => {
    total++

    const complete = () =>
      --total <= 0
        ? observer.complete()
        : groupSubscription.unsubscribeIndex(i)

    groupSubscription.add(observable.subscribe({ next, error, complete }))
  })

  return groupSubscription
})
