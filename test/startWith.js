import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.startWith = require('@operators/startWith')

describe('startWith', () => {
  it('startWith test', done => {
    let expected = [-3, -2, -1, 0, 1, 2, 3]
    Rx.Observable
      .interval(100)
      .startWith(-3, -2, -1)
      .take(7)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
