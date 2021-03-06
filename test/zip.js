import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.zip = require('@observables/zip')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.startWith = require('@operators/startWith')

describe('zip', () => {
  it('zip test', done => {
    const expected = [
      [0, 0],
      [1, 0],
      [2, 0]
    ]
    const ob1 = Rx.Observable.interval(50).take(3)
    const ob2 = Rx.Observable.interval(100).take(2)

    Rx.Observable.zip(ob1, ob2).subscribe({
      next: x => {
        assert.deepStrictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
