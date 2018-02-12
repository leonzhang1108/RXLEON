import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let func

  if (typeof observables[observables.length - 1] === 'function') {
    func = observables.pop()
  }

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
        func
          ? observer.next(func(...vals))
          : observer.next(vals)
      }
    }

    const error = e => observer.error(e)

    const complete = () => observer.complete()

    groupSubscription.add(observable.subscribe({next, error, complete}))
  })

  return groupSubscription
})
