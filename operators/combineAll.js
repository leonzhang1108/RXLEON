import Rx from 'toy-rx'
import { bindContext } from '@utils'
Rx.Observable.combineLatest = require('@observables/combineLatest')

const combineAll = context => () => Rx.Observable.create(observer => {
  const observables = []
  const groupSubscription = new Rx.GroupSubscription()

  const next = observable =>
    observables.push(observable)

  const error = observer.error

  const complete = () => {
    const sub = Rx.Observable.combineLatest(...observables)
      .subscribe(observer)

    groupSubscription.add(sub)
  }

  groupSubscription.add(context.subscribe({ next, error, complete }))

  return groupSubscription
})

module.exports = bindContext(combineAll)
