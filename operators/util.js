module.exports = {
  bindContext: operator => {
    return function (f) {
      return operator(this)(f)
    }
  }
}