import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.scan = require('@operators/scan')

describe('scan', () => {
  it('scan test', done => {
    let expected = [0, 1, 3, 6, 10]
    Rx.Observable
      .interval(10)
      .take(5)
      .scan((curr, val) => curr + val, 0)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
