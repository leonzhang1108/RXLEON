const getType = param => Object.prototype.toString.call(param)

module.exports = {
  bindContext: operator => function (...v) {
    return operator(this)(...v)
  },

  bindUnsubscribe: (originSubscription, newSubscription) => {
    originSubscription.unsubscribe = newSubscription.unsubscribe.bind(newSubscription)
  },

  getType,

  isFunction: p => getType(p) === `[object Function]`,

  isString: p => getType(p) === `[object isString]`,
  
  isArray: p => getType(p) === `[object isArray]`
}
