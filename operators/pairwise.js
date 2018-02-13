import Rx from 'rxjs'
import { bindContext } from './util.js'

const pairwise = context => length => Rx.Observable.create(observer => {
  let pair = []
  let l = length || 2

  const next = x => {
    pair.push(x)
    if (pair.length !== l) return
    observer.next(pair)
    pair.shift()
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(pairwise)
