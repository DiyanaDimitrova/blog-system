let express = require('express')
let articlesArray = require('./articles')
let router = express.Router()

router.post('/:id/comment', (req, res, err) => {
  if (!req.body.comment || req.body.comment === null || !req.body.user || req.body.user === null) {
    let msg = 'Comment and username are required. Please fill them with values!'
    res.render('error', {
      message: msg,
      error: err
    })
  } else {
    let addedComment = null
    for (let article of articlesArray) {
      if (req.params.id === article.id) {
        let commentObj = {
          text: req.body.comment,
          user: req.body.user,
          commentDate: new Date().toISOString()
        }
        addedComment = commentObj
        console.log(commentObj)
        article.comment.push(commentObj)
      }
    }
    res.render('comment', { comment: addedComment })
  }
})
module.exports = router
