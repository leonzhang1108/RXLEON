import Rx from 'rxjs'

// 订阅所有内部 observables，然后等待每个发出一个值。
// 一旦发生这种情况，将发出具有相应索引的所有值。
// 这会持续进行，直到至少一个内部 observable 完成。
module.exports = (...observables) => Rx.Observable.create(observer => {
  let groupSubscription = new Rx.GroupSubscription()
  let result = observables.map(observable => undefined)
  let launched = false

  observables.forEach((observable, i) => {
    const subscription = observable.subscribe({
      next: x => {
        result[i] = x
        if (result.every(x => x !== undefined)) {
          launched = true
          observer.next(result)
        }
      },
      error: observer.error,
      complete: () => {
        launched && observer.complete()
      }
    })

    groupSubscription.add(subscription)
  })

  return groupSubscription
})
