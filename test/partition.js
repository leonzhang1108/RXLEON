import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.from = require('@observables/from')
Rx.Observable.prototype.partition = require('@operators/partition')

describe('partition', () => {
  it('partition test', done => {
    let expected = [2, 4, 6, 1, 3, 5]

    const [evens, odds] = Rx.Observable.from([1, 2, 3, 4, 5, 6]).partition(val => val % 2 === 0)

    const complete = () => expected.length === 0 && done()

    evens.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete
    })

    odds.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete
    })
  })
})
