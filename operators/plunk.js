import Rx from 'rxjs'
import { bindContext, isNull } from '@utils'

const plunk = context => property => Rx.Observable.create(observer => {
  const next = x => {
    isNull(x[property])
      ? observer.error(`${x.toString()} has no this property: ${property}`)
      : observer.next(x[property])
  }

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(plunk)
