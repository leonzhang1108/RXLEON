import Rx from 'toy-rx'

module.exports = period => Rx.Observable.create(observer => {
  let i = 0

  const timeout = setInterval(() => observer.next(i++), period)

  return new Rx.Subscription(() => clearInterval(timeout))
})
