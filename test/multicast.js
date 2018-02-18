import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.multicast = require('@operators/multicast')

describe('multicast', () => {
  it('multicast test', done => {
    const expected = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]

    const source = Rx.Observable.interval(20).take(5)

    const multi = source.multicast(new Rx.Subject())

    const next = x => assert.strictEqual(x, expected.shift())

    multi.subscribe({ next, complete: done })

    multi.subscribe({ next })

    multi.connect()
  })
})
