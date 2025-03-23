import express, { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

const Api = express()

Api.post('/generate-pdf', (req: Request, res: Response) => {
    const user = req.body

    let randNumb = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('')

    res.setHeader('Content-Disposition', `attachment; filename=undangan.pdf`)
    res.setHeader('Content-Type', 'application/pdf')

    const doc = new PDFDocument()
    doc.pipe(res)

    doc
        .fontSize(14)
        .text("Pengundang yang beridentitas dibawah ini:", { align: "center" })
        .moveDown()

    doc
        .fontSize(12)
        .text(`ID              : ${user.id}`)
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

export default Api