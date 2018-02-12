import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.fromArray = require('@observables/fromArray')
Rx.Observable.prototype.every = require('@operators/every')

describe('every', () => {
  it('every true test', done => {
    const list = [2, 4, 6, 8, 10]

    Rx.Observable.fromArray(list)
      .every(val => val % 2 === 0)
      .subscribe({
        next: x => {
          assert.strictEqual(x, true)
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })

  it('every false test', done => {
    const list = [1, 2, 3, 4, 5]

    Rx.Observable.fromArray(list)
      .every(val => val % 2 === 0)
      .subscribe({
        next: x => {
          assert.strictEqual(x, false)
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
