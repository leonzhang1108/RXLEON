import assert from 'assert'
import Rx from 'rxjs'
Rx.Observable.of = require('@observables/of')
Rx.Observable.concat = require('@observables/concat')
Rx.Observable.interval = require('@observables/interval')
Rx.Observable.prototype.take = require('@operators/take')
Rx.Observable.prototype.mapTo = require('@operators/mapTo')
Rx.Observable.prototype.delay = require('@operators/delay')
Rx.Observable.prototype.concat = require('@operators/concat')
Rx.Observable.prototype.concatAll = require('@operators/concatAll')
Rx.Observable.prototype.concatMap = require('@operators/concatMap')

describe('concat', () => {
  it('concat test', done => {
    const ob1 = Rx.Observable.of(1, 2, 3)

    const ob2 = Rx.Observable.of(4, 5, 6)

    const expected = [4, 5, 6, 1, 2, 3]

    const concat = ob2.concat(ob1)

    concat.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })

  it('concat static test', done => {
    let expected = ['first', 'first', 'second', 'second']
    const ob1 = Rx.Observable.interval(30).take(2).mapTo('first')

    const ob2 = Rx.Observable.interval(20).take(2).mapTo('second')

    const concat = Rx.Observable.concat(ob1, ob2)

    concat.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })

  it('concatAll test', done => {
    let expected = ['ob1', 'ob1', 'ob2', 'ob2']

    const ob1 = Rx.Observable.interval(100).take(2).mapTo('ob1')

    const ob2 = Rx.Observable.interval(50).take(2).mapTo('ob2')

    const concat = Rx.Observable.of(ob1, ob2).concatAll()

    concat.subscribe({
      next: x => {
        assert.strictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })

  it('concatMap test', done => {
    let expected = [200, 100]
    // let expected = [0,1,2,0,1,2]

    Rx.Observable.of(200, 100)
      .concatMap(v => Rx.Observable.of(v).delay(v))
      // .concatMap(v => Rx.Observable.interval(v).take(3))
      .subscribe({
        next: x => {
          assert.strictEqual(x, expected.shift())
        },
        error: () => done('error should not be called'),
        complete: done
      })
  })
})
