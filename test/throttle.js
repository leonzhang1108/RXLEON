import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.throttleTime = require('@operators/throttleTime')

describe('throttle', () => {
  it('throttleTime test', done => {
    let expected = [9, 19, 29]

    Rx.Observable.interval(10)
      .throttleTime(100)
      .take(3)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
