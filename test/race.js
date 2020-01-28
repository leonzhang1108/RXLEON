import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.race = require('@observables/race')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')

describe('race', () => {
  it('race test', done => {
    const expected = ['i won', 'i won', 'i won', 'i won', 'i won']

    Rx.Observable.race(
      Rx.Observable.interval(15),
      Rx.Observable.interval(10).mapTo('i won'),
      Rx.Observable.interval(20),
      Rx.Observable.interval(25)
    ).take(5).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
