module.exports = {
  bindContext: operator => function (...v) {
    return operator(this)(...v)
  },
  bindUnsubscribe: (originSubscription, newSubscription) => {
    originSubscription.unsubscribe = newSubscription.unsubscribe.bind(newSubscription)
  }
}
