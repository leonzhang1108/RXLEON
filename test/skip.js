import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.fromArray = require('@observable/fromArray')
Rx.Observable.prototype.skip = require('@operators/skip')

describe('skip', () => {
  it('skip test', done => {

    let expected = [5, 6, 7, 8, 9]
    Rx.Observable.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).skip(5).subscribe({
      next: x => {
        console.log(x)
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })

  })
})