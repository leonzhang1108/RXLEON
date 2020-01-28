import Rx from 'toy-rx'

module.exports = (...observables) => Rx.Observable.create(observer => {
  const groupSubscription = new Rx.GroupSubscription()
  let foundWinner = false

  observables.forEach((observable, index) => {
    const subscripton = observable.subscribe({
      next: x => {
        observer.next(x)
        if (foundWinner) return
        foundWinner = false
        observables.forEach((_, i) => {
          index !== i && groupSubscription.unsubscribeIndex(i)
        })
      },
      error: observer.error,
      complete: observer.complete
    })

    groupSubscription.add(subscripton)
  })

  return groupSubscription
})
