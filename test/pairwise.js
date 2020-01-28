import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.pairwise = require('@operators/pairwise')

describe('pairwise', () => {
  it('pairwise without param test', done => {
    const expected = [
      [0, 1],
      [1, 2],
      [2, 3]
    ]

    Rx.Observable
      .interval(10)
      .pairwise()
      .take(3)
      .subscribe({
        next: x => {
          assert.deepStrictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })

  it('pairwise with param test', done => {
    const expected = [
      [0, 1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6]
    ]

    Rx.Observable
      .interval(10)
      .pairwise(5)
      .take(3)
      .subscribe({
        next: x => {
          assert.deepStrictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
