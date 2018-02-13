import Rx from 'rxjs'
import { bindContext } from './util.js'

const flatMap = context => f => Rx.Observable.create(observer => {
  let active = 0
  let observables = []
  let groupSubscription = new Rx.GroupSubscription()

  const next = x => {
    const observable = f(x)
    observables.push(observable)
    active++
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observables.forEach(observable => {
      const innerSubscription = observable.subscribe({
        next: observer.next,
        error: observer.error,
        complete: () => {
          --active <= 0 && observer.complete()
        }
      })
      groupSubscription.add(innerSubscription)
    })
  }

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(flatMap)
