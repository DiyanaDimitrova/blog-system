let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

/* GET home page. */

router.get('/', (req, res) => {
  articlesArray.sort((a, b) => {
    let viewsA = a.views
    let viewsB = b.views
    return viewsB - viewsA
  })
  res.render('index', {title: 'Blog System', articles: articlesArray})
})

module.exports = router
