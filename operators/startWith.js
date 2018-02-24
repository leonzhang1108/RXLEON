import Rx from 'rxjs'
import { bindContext } from '@utils'

const startWith = context => (...initVals) => Rx.Observable.create(observer => {
  let storedVals = initVals

  const next = x => {
    storedVals.push(x)
    observer.next(storedVals.shift())
  }

  const error = observer.error

  const complete = () => {
    storedVals.forEach(observer.next)
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(startWith)
