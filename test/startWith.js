import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.of = require('@observables/of')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.startWith = require('@operators/startWith')

describe('startWith', () => {
  it('startWith interval test', done => {
    let expected = [-3, -2, -1, 0, 1, 2, 3]
    Rx.Observable
      .interval(10)
      .startWith(-3, -2, -1)
      .take(7)
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })

  it('startWith of test', done => {
    let expected = ['hello', 'world', 'i am', 'leon']
    const source = Rx.Observable.of('world', 'i am', 'leon')

    source.startWith('hello').subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
