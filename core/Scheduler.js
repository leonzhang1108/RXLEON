class Scheduler {
  static async = func => {
    setTimeout(func, 0)
  }
}

module.exports = Scheduler
