import express from 'express'
import router from './router/routes'
import { AppDataSource } from './data-source'

AppDataSource.initialize().then(() => {
  console.log('\x1b[33m%s\x1b[0m', 'DB connection established')

  const app = express()
  app.use(express.json())

  app.use('/', router)

  app.listen(3000, () => {
    console.log('\x1b[33m%s\x1b[0m', 'Server started')
  })
})
