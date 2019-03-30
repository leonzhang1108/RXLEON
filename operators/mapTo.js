import Rx from 'toy-rx'
import { bindContext } from '@utils'

const mapTo = context => val => Rx.Observable.create(observer => {
  const next = () => observer.next(val)

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(mapTo)
