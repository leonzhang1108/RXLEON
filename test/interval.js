import assert from 'assert'
import Rx from '@core'
import interval from '@operators/interval'
Rx.Observable.interval = interval

describe('interval', () => {
  it('should support a basic use case', done => {
    const expected = [0, 1, 2, 3, 4]

    const subscription = Rx.Observable.interval(100).subscribe({
      next: x => assert.strictEqual(x, expected.shift(), x),
      error: () => done('error should not be called'),
      complete: () => {}
    })

    setTimeout(() => {
      subscription.unsubscribe()
      assert.strictEqual(expected.length, 0)
      done()
    }, 550)
  })
})
