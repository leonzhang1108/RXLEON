import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')

describe('take', () => {
  it('take test', done => {

    let expected = [0, 1, 2]
    Rx.Observable.interval(10).take(3).subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })

  })
})
