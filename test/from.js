import assert from 'assert'
import Rx from 'toy-rx'
Rx.Observable.from = require('@observables/from')

describe('from', () => {
  it('from test string', done => {
    let expected = ['l', 'e', 'o', 'n']

    Rx.Observable.from('leon').subscribe({
      next: x => {
        assert.deepStrictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
  it('from test array', done => {
    let expected = ['leon', 'zhang']

    Rx.Observable.from(['leon', 'zhang']).subscribe({
      next: x => {
        assert.deepStrictEqual(x, expected.shift())
      },
      error: () => done('error should not be called'),
      complete: done
    })
  })
})
