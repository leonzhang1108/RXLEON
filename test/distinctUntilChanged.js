import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.fromArray = require('@observables/fromArray')
Rx.Observable.prototype.distinctUntilChanged = require('@operators/distinctUntilChanged')

describe('distinctUntilChanged', () => {
  it('distinctUntilChanged test', done => {
    const expected = [1, 2, 3, 1, 2, 3]
    const duplicatedList = [1, 1, 2, 2, 3, 1, 2, 3]

    Rx.Observable.fromArray(duplicatedList)
      .distinctUntilChanged()
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
