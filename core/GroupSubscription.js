class GroupSubscription {
  constructor () {
    this.subscriptions = []
  }

  add = subscription => {
    this.subscriptions.push(subscription)
  }

  unsubscribe = () => {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}

module.exports = GroupSubscription
