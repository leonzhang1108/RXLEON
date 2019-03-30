import { expect } from 'chai'
import Rx from 'toy-rx'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.throttle = require('@operators/throttle')
Rx.Observable.prototype.throttleTime = require('@operators/throttleTime')

describe('throttle', () => {
  it('throttle test', done => {
    let expected = [0, 3, 6]
    Rx.Observable.interval(10)
      .throttle(() => Rx.Observable.interval(20))
      .take(3)
      .subscribe({
        next: x => {
          expect(x).to.be.closeTo(expected.shift(), 2)
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
  it('throttleTime test', done => {
    let expected = [0, 10, 20]

    Rx.Observable.interval(10)
      .throttleTime(100)
      .take(3)
      .subscribe({
        next: x => {
          expect(x).to.be.closeTo(expected.shift(), 2)
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
