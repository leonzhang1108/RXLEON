import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.combineLatest = require('@observables/combineLatest')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.combineAll = require('@operators/combineAll')

describe('combine', () => {
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
        assert.deepStrictEqual(x, expected.shift())
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
        assert.deepStrictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })

  it('combineAll test', done => {
    let expected = [
      [ 'Result (0): 0', 'Result (1): 0' ],
      [ 'Result (0): 1', 'Result (1): 0' ],
      [ 'Result (0): 1', 'Result (1): 1' ],
      [ 'Result (0): 2', 'Result (1): 1' ],
      [ 'Result (0): 2', 'Result (1): 2' ],
      [ 'Result (0): 3', 'Result (1): 2' ],
      [ 'Result (0): 3', 'Result (1): 3' ],
      [ 'Result (0): 4', 'Result (1): 3' ],
      [ 'Result (0): 4', 'Result (1): 4' ]
    ]

    Rx.Observable.interval(10).take(2).map(val =>
      Rx.Observable.interval(10)
        .map(i => `Result (${val}): ${i}`)
        .take(5)
    )
      .combineAll()
      .subscribe({
        next: x => {
          assert.deepStrictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
