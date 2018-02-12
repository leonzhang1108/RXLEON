import Rx from 'rxjs'

module.exports = (...observables) => Rx.Observable.create(observer => {
  let innerSubscription

  const next = x => {
    observer.next(x)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    if (observables.length) {
      observables.shift().subscribe({ next, error, complete })
    } else {
      observer.complete()
    }
  }

  innerSubscription = observables.shift().subscribe({ next, error, complete })

  return innerSubscription
})
