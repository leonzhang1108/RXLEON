import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.of = require('@observables/of')
Rx.Observable.fromArray = require('@observables/fromArray')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.expand = require('@operators/expand')

describe('expand', () => {
  it('expand test', done => {
    console.log('expand does not accomplished, there are tricks in the source code')

    const expected = [2, 3, 4, 5, 6]

    Rx.Observable.of(2)
      .expand(val => {
        console.log(`Passed value: ${val}`)
        return Rx.Observable.of(1 + val)
      }).take(5)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
