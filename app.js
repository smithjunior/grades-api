import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import db from './models/index.js'

import gradesRoute from './routes/grade.js'

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    process.exit()
  }
})()

const app = express()

app.use(
  cors()
)
// define o dominio de origem para consumo do servico
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/grade', gradesRoute)

app.get('/', (req, res) => {
  res.send('API em execucao')
})

app.listen(process.env.PORT || 8081, () => {})
