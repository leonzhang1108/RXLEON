import Rx from 'rxjs'

const map = context => f => Rx.Observable.create(observer => {
  const next = x => {
    let y
    try {
      y = f(x)
    } catch (e) {
      error(e)
      return
    }
    observer.next(y)
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
  return map(this)(f)
}