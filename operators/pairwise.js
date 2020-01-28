import Rx from 'toy-rx'
import { bindContext } from '@utils'

const pairwise = context => length => Rx.Observable.create(observer => {
  const pair = []
  const l = length || 2

  const next = x => {
    pair.push(x)
    if (pair.length !== l) return
    observer.next(pair)
    pair.shift()
  }

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(pairwise)
