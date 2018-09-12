class GroupSubscription {
  constructor () {
    this.subscriptions = []
  }

  add = subscription => {
    this.subscriptions.push(subscription)
  }

  unsubscribe = () => {
    this.subscriptions.forEach(subscription => {
      subscription && subscription.unsubscribe()
    })
  }

  unsubscribeIndex = i => {
    this.subscriptions[i] && this.subscriptions[i].unsubscribe()
  }
}

module.exports = GroupSubscription
