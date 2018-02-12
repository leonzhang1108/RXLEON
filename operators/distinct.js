import Rx from 'rxjs'
import { bindContext } from './util.js'

const distinct = context => () => Rx.Observable.create(observer => {
  let list = []

  const next = x => {
    if (list.indexOf(x) >= 0) return
    list.push(x)
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
