import Rx from 'rxjs'

const take = context => max => Rx.Observable.create(observer => {

  let taken = 0

  const next = x => {
    taken += 1;
    if (taken < max) {
      observer.next(x)
    } else if (taken === max) {
      observer.next(x)
      observer.complete()
    }
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
  return take(this)(f)
}