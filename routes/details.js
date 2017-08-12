let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()
// let countOfViews = 0

router.get('/:id', (req, res) => {
  let item = null
  for (let article of articlesArray) {
    if (req.params.id === article.id) {
      article.views = article.views + 1
      item = article
    }
  }
  res.render('details', {item: item})
})

router.post('/:id', (req, res) => {
  let item = null
  for (let article of articlesArray) {
    if (req.params.id === article.id) {
      article.state = !article.state
      item = article
    }
  }
  res.render('details', {item: item})
})

module.exports = router
