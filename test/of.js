import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.prototype.filter = require('@operators/filter')

describe('of', () => {
  it('of test', done => {
    let expected = [1, 3, 5, 7]

    Rx.Observable.of(1, 2, 3, 4, 5, 6, 7).filter(x => x % 2 === 1).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
