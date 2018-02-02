import assert from 'assert'
import Rx from '@core'
import fromArray from '@observable/fromArray'
import map from '@operators/map'

Rx.Observable.fromArray = fromArray
Rx.Observable.prototype.map = map

describe('fromArray', () => {

  const list = [1, 2, 3, 4]
  const mutateFunction = x => x * x

  let expected = list.map(mutateFunction)

  it('fromArray test', done => {
    Rx.Observable.fromArray(list).map(mutateFunction).subscribe({
      next: x => assert.strictEqual(x, expected.shift()),
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
