import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let func
  let active = 0

  if (typeof observables[observables.length - 1] === 'function') {
    func = observables.pop()
  }

  // init, all undefined
  const vals = observables.map(observable => undefined)
  // init, all false
  const gotValue = observables.map(observable => false)

  const groupSubscription = new Rx.GroupSubscription()

  observables.forEach((observable, index) => {
    active++
    const next = x => {
      vals[index] = x
      gotValue[index] = true

      // if has value, print
      if (gotValue.every(x => x === true)) {
        func
          ? observer.next(func(...vals))
          : observer.next(vals)
      }
    }

    const error = observer.error

    const complete = () => {
      --active <= 0 && observer.complete()
    }

    groupSubscription.add(observable.subscribe({next, error, complete}))
  })

  return groupSubscription
})
