import Rx from 'toy-rx'

module.exports = (...ranges) => Rx.Observable.create(observer => {
  const min = ranges[0]
  const range = ranges[1]
  const max = min + range

  for (let i = min; i < max; i++) {
    observer.next(i)
  }

  observer.complete()
  return new Rx.Subscription()
})
