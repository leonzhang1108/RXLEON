import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.zip = require('@observables/zip')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.startWith = require('@operators/startWith')

describe('zip', () => {
  it('zip test', done => {
    let expected = [
      [ 0, 0 ],
      [ 1, 0 ],
      [ 2, 0 ]
    ]
    const ob1 = Rx.Observable.interval(50).take(3)
    const ob2 = Rx.Observable.interval(100).take(2)

    Rx.Observable.zip(ob1, ob2).subscribe({
      next: x => {
        assert.deepEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
