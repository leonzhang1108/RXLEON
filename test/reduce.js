import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.prototype.reduce = require('@operators/reduce')

describe('reduce', () => {
  it('reduce test', done => {
    Rx.Observable.of(1, 2, 3, 4)
      .reduce((curr, val) => curr + val, 0)
      .subscribe({
        next: x => {
          assert.strictEqual(x, 10)
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
