const express = require('express')
const { Favorite } = require('./models')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/*
  While use request GET, if success, status is 200 and failed, status is 500. 
  Don't use status 201 at request GET.
  Request GET is only to get data from database, both Find All and Find One data.
*/
app.get('/favorites', (req, res) => {
  Favorite.findAll()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

/*
  Request POST is used to create new data which will be entered to database.
  Use status 201 while success enter data to database.
  Don't use request POST to edit and get data in database.
*/

app.post('/favorites', (req, res) => {
  let payload = {
    name: req.body.name,
    type: req.body.type
  }
  Favorite.create(payload)
    .then(data => {
      let dataFavorites = {
        name: data.name,
        type: data.type
      }
      res.status(201).json({
        data: dataFavorites,
        message: 'Add to favorite successfully'})
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

app.listen(port, _=> {
  console.log('Listening on port', port)
})