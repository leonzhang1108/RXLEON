import Rx from 'rxjs'
import { bindContext } from './util.js'
Rx.Observable.combineLatest = require('@observables/combineLatest')

const combineAll = context => () => Rx.Observable.create(observer => {
  let observables = []

  const next = observable => {
    observables.push(observable)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    Rx.Observable.combineLatest(...observables)
      .subscribe(observer)
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(combineAll)
