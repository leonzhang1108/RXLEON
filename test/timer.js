import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.timer = require('@observables/timer')
Rx.Observable.prototype.take = require('@operators/take')

describe('timer', () => {
  it('timer one param test', done => {
    Rx.Observable.timer(200).subscribe({
      next: x => {
        assert.strictEqual(x, 0)
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })

  it('timer two param test', done => {
    const expected = [0, 1, 2, 3, 4]

    Rx.Observable.timer(20, 10).take(5).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
