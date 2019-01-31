import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let doneLength = 0
  let result = observables.map(() => undefined)

  observables.forEach((observable, i) => {
    const subscription = observable.subscribe({
      next: x => {
        result[i] = x
      },
      complete: () => {
        if (++doneLength === observables.length) {
          observer.next(result)
          observer.complete()
        }
      }
    })

    groupSubscription.add(subscription)
  })

  return groupSubscription
})
