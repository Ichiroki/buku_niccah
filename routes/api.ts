import BlobStream from 'blob-stream'
import express, { Request, Response } from 'express'
import PDFDocument from 'pdfkit'
import qrcode from 'qrcode'
import { createPDF } from '../app/services/pdf'

const Api = express()

Api.post('/generate-pdf', (req: Request, res: Response) => {
    const user = req.body

    let randNumb = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('')

    res.setHeader('Content-Disposition', `attachment; filename=MLN-${randNumb}-${user.handphone}.pdf`)
    res.setHeader('Content-Type', 'application/pdf')

    const doc = new PDFDocument()
    doc.pipe(res)

    doc
        .fontSize(14)
        .text("Pengundang yang beridentitas dibawah ini:", { align: "center" })
        .moveDown()

    doc
        .fontSize(12)
        .text(`Nama            : ${user.nama}`)
        .text(`Kota Asal       : ${user.kota}`)
        .text(`Handphone       : ${user.handphone}`)
        .text(`Jumlah Tamu     : ${user.tamu}`)
        .text(`Hubungan dengan Mempelai : ${user.hubungan}`)
        .moveDown(2)

    doc
        .fontSize(14)
        .text("Berhasil melakukan pendaftaran sebagai tamu undangan", { align: "center" })

    doc.end()
});

Api.get('/home', (req: Request, res: Response) => {
    const data = JSON.stringify({
        name: "Ichiroki",
        age: 22,
        id: "AFE-49dd581f-51a4-4014-b1b0-0caecfcf6661"
    })

    const QRcode = qrcode.toString(data, {type: "svg"}, (err, url) => {
        if (err) console.log("error coy", err)
        console.log(url)
    })

    res.json({qr: QRcode})
})

export default Api