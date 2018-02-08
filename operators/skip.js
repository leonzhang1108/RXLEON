import Rx from 'rxjs'

const skip = context => max => Rx.Observable.create(observer => {

  let skipped = 0

  const next = x => {
    skipped >= max ? observer.next(x) : skipped++
  }

  const error = e => {
    observer.error(e)
  }

  const complete = () => {
    observer.complete()
  }

  return context.subscribe({ next, error, complete })
})

module.exports = function (f) {
  return skip(this)(f)
}