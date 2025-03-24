import express, { Request, Response } from 'express'
import PDFDocument from 'pdfkit-table'

const Api = express()

Api.post('/generate-pdf', (req: Request, res: Response) => {
    const user = req.body

    res.setHeader('Content-Disposition', `attachment; filename=undangan.pdf`)
    res.setHeader('Content-Type', 'application/pdf')

    const doc = new PDFDocument({
        lang: 'id_ID',
        size: 'A5',
        layout: 'landscape'
    })
    doc.pipe(res)

    const table = {
        rows: [
            [`ID`, `:`, `${user.id}`],
            [`Nama`, `:`, `${user.nama}`],
            [`Kota`, `:`, `${user.kota}`],
            [`Handphone`, `:`, `${user.handphone}`],
            [`Tamu`, `:`, `${user.tamu}`],
            [`Hubungan`, `:`, `${user.hubungan}`],
        ]
    }

    doc
        .fontSize(14)
        .text("Pengundang yang beridentitas dibawah ini:", { align: "center" })
        .moveDown()

    doc.table(table)

    doc
        .fontSize(14)
        .text("Berhasil melakukan pendaftaran sebagai tamu undangan", { align: "center" })

    doc.end()
});

export default Api