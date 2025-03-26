import express, { Request, Response } from 'express'
import generateJSONFile from '../app/services/temporary-storage'
import createPDF from '../app/services/pdf'

const Api = express()

Api.post('/generate-pdf', (req: Request, res: Response) => {
    const user = req.body

    res.setHeader('Content-Disposition', `attachment; filename=undangan.pdf`)
    res.setHeader('Content-Type', 'application/pdf')

    generateJSONFile('user_data.json', user)
    createPDF(user, res)
});

export default Api