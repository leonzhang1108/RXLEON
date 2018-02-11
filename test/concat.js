import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.prototype.concat = require('@operators/concat')

describe('concat', () => {
  it('concat test', done => {
    const ob1 = Rx.Observable.of(1, 2, 3)

    const ob2 = Rx.Observable.of(4, 5, 6)

    const expected = [4, 5, 6, 1, 2, 3]

    const concat = ob2.concat(ob1)

    concat.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
