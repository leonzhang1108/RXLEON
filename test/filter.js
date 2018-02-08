import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.fromArray = require('@observable/fromArray')
Rx.Observable.prototype.filter = require('@operators/filter')

describe('take', () => {
  it('take test', done => {

    let expected = [0, 2, 4, 6, 8]
    Rx.Observable.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).filter(x => x % 2 === 0).subscribe({
      next: x => {
        console.log(x)
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })

  })
})