import Rx from 'toy-rx'
import { bindContext } from '@utils'

const skip = context => max => Rx.Observable.create(observer => {
  let skipped = 0

  const next = x => skipped >= max ? observer.next(x) : skipped++

  const error = observer.error

  const complete = observer.complete

  return context.subscribe({ next, error, complete })
})

module.exports = bindContext(skip)
