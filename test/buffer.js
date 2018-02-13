import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.buffer = require('@operators/buffer')

describe('buffer', () => {
  it('buffer test', done => {
    let expected = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9]
    ]

    const interval = Rx.Observable.interval(40)

    const bufferBy = Rx.Observable.interval(81)

    interval.buffer(bufferBy).take(5).subscribe({
      next: x => {
        assert.deepEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
