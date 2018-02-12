import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.merge = require('@observables/merge')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.take = require('@operators/take')

describe('merge', () => {
  it('merge test', done => {
    const expected = [1, 1, 1, 2, 1, 1]
    const first = Rx.Observable.interval(100)
    const second = Rx.Observable.interval(350)

    Rx.Observable.merge(
      first.mapTo(1),
      second.mapTo(2)
    ).take(6).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
