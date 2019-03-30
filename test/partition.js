import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.from = require('@observables/from')
Rx.Observable.merge = require('@observables/merge')
Rx.Observable.prototype.map = require('@operators/map')
Rx.Observable.prototype.partition = require('@operators/partition')

describe('partition', () => {
  it('partition test', done => {
    let expected = [
      'Even: 2',
      'Even: 4',
      'Even: 6',
      'Odd: 1',
      'Odd: 3',
      'Odd: 5'
    ]

    const [evens, odds] = Rx.Observable.from([1, 2, 3, 4, 5, 6]).partition(val => val % 2 === 0)

    const complete = () => expected.length === 0 && done()

    Rx.Observable.merge(
      evens.map(val => `Even: ${val}`),
      odds.map(val => `Odd: ${val}`)
    ).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete
    })
  })
})
