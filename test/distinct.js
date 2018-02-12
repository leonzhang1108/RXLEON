import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.fromArray = require('@observables/fromArray')
Rx.Observable.prototype.distinct = require('@operators/distinct')

describe('distinct', () => {
  it('distinct test', done => {
    const expected = [1, 2, 3, 4, 5, 6]
    const duplicatedList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]

    Rx.Observable.fromArray(duplicatedList)
      .distinct()
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
