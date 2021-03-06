import Rx from 'toy-rx'
import { bindContext } from '@utils'

const delay = context => period => Rx.Observable.create(observer => {
  const next = x => {
    setTimeout(() => observer.next(x), period)
  }

  const error = e => {
    setTimeout(() => observer.error(e), period)
  }

  const complete = () => {
    setTimeout(observer.complete, period)
  }

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(delay)
