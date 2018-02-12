import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  const func = observables.pop()

  // init, all undefined
  const vals = observables.map(observable => undefined)
  // init, all false
  const gotValue = observables.map(observable => false)

  const groupSubscription = new Rx.GroupSubscription()

  observables.forEach((observable, index) => {
    const next = x => {
      vals[index] = x
      gotValue[index] = true

      // 如果都有值了 打印
      if (gotValue.every(x => x === true)) {
        const y = func(...vals)
        observer.next(y)
      }
    }

    const error = e => observer.error(e)

    const complete = () => observer.complete()

    groupSubscription.add(observable.subscribe({next, error, complete}))
  })

  return groupSubscription
})
