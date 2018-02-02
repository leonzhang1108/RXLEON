import Rx from '@core'
import empty from '@observable/empty'
Rx.Observable.empty = empty

module.exports = f => Rx.Observable.create(observer => {
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

  return Rx.Observable.empty().subscribe({ next, error, complete })
})
