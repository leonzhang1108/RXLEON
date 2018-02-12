import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.combineLatest = require('@observables/combineLatest')
Rx.Observable.prototype.take = require('@operators/take')

describe('combineLatest', () => {
  it('combineLatest test with callback function', done => {
    let expected = [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [2, 1, 1]
    ]

    const timerOne = Rx.Observable.timer(10, 40)

    const timerTwo = Rx.Observable.timer(20, 40)

    const timerThree = Rx.Observable.timer(30, 40)

    const combined = Rx.Observable.combineLatest(
      timerOne,
      timerTwo,
      timerThree,
      (...vals) => vals
    )

    combined.take(5).subscribe({
      next: x => {
        assert.deepEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
  it('combineLatest test without callback function', done => {
    let expected = [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [2, 1, 1]
    ]

    const timerOne = Rx.Observable.timer(10, 40)

    const timerTwo = Rx.Observable.timer(20, 40)

    const timerThree = Rx.Observable.timer(30, 40)

    const combined = Rx.Observable.combineLatest(
      timerOne,
      timerTwo,
      timerThree
    )

    combined.take(5).subscribe({
      next: x => {
        assert.deepEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
