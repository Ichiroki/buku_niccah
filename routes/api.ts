import express, {Request, Response} from 'express'

const Api = express()

Api.get('/', (req: Request, res: Response) => {
    res.send("<h1>Hello World!</h1>")
})

export default Api