import Rx from 'rxjs'
import { bindContext } from './util.js'

const startWith = context => (...initVals) => Rx.Observable.create(observer => {
  let storedVals = initVals

  const next = x => {
    storedVals.push(x)
    observer.next(storedVals.shift())
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(startWith)
