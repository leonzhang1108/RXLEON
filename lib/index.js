
const Rx = require('rxjs')
const path = require('path')
const observables = require('require-all')(path.resolve('observables'))
const operators = require('require-all')(path.resolve('operators'))

Object.keys(observables).forEach(item => {
  Rx.Observable[item] = observables[item]
})

Object.keys(operators).forEach(item => {
  Rx.Observable.prototype[item] = operators[item]
})

module.exports = Rx
