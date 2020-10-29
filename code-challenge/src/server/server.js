import express from 'express'
import path from 'path'

export const createServer = () => {
  const app = express()
  const port = process.env.PORT || 3333

  const staticDir = path.resolve(__dirname, '../static')
  app.use(express.static(staticDir))  

  app.listen(port, () => {
    console.log(`App listening on ${port}`)
  })
}