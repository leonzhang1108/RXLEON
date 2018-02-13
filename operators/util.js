module.exports = {
  bindContext: operator => function (...v) {
    return operator(this)(...v)
  }
}
