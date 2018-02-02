import Rx from '@core'

module.exports = function map (f) {
  return Rx.Observable.create(observer => {
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

    return this.subscribe({ next, error, complete })
  })
}
