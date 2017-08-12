let express = require('express')
let uuid = require('node-uuid')
let articlesArray = require('./articles')
let router = express.Router()
let multer = require('multer')
let itemArticle = ''
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/')
  },
  filename: (req, file, cb) => {
    let n = file.mimetype.lastIndexOf('/')
    let extention = file.mimetype.substring(n + 1)
    itemArticle = uuid.v4() + '.' + extention
    cb(null, itemArticle)
  }
})
let upload = multer({ storage: storage })

router.get('/', (req, res) => {
  res.render('create')
})

router.post('/', upload.single('image'), (req, res, err) => {
  if (!req.body.title || req.body.title === null || !req.body.description || req.body.description === null) {
    let msg = 'Title and description input are required. Please fill them with values!'
    res.render('error', {
      message: msg,
      error: err
    })
  } else {
    let articleObj = {
      id: uuid.v4(),
      title: req.body.title,
      description: req.body.description,
      image: itemArticle,
      state: true,
      date: new Date().toISOString(),
      views: 0,
      comment: []
    }
    articlesArray.push(articleObj)
    res.redirect('/all')
  }
})
module.exports = router
