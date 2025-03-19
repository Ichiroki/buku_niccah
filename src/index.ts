import express, {Request, Response} from 'express'
import Api from '../routes/api'

const port = process.env.APP_PORT || 3000
const app = express()

app.use(Api)

app.listen(port, () => {
    console.log(`your application starts at http://localhost:${port}`)
})