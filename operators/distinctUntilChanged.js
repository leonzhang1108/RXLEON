import Rx from 'rxjs'
import { bindContext } from './util.js'

const distinct = context => () => Rx.Observable.create(observer => {
  let last

  const next = x => {
    if (last && last === x) return
    last = x
    observer.next(x)
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(distinct)
