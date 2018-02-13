import Rx from 'rxjs'
import { bindContext } from './util.js'

const concatAll = context => () => Rx.Observable.create(observer => {
  let subscription
  let groupSubscription = new Rx.GroupSubscription()
  let observableList = []

  const error = e => {
    observer.error(e)
  }

  const concatSubscribe = observable => {
    subscription = observable.subscribe({
      next: observer.next,
      error,
      complete: () => {
        observableList.length
          ? concatSubscribe(observableList.shift())
          : observer.complete()
      }
    })
  }

  const next = observable => {
    observableList.push(observable)
    !subscription && concatSubscribe(observableList.shift())
  }

  groupSubscription.add(subscription)

  groupSubscription.add(context.subscribe({ next, error }))

  return groupSubscription
})

module.exports = bindContext(concatAll)
