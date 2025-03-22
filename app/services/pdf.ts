import PDFDocument from 'pdfkit'
import { Response } from 'express'

interface userType {
    nama: string
    kota: string
    handphone: number
    tamu: number
    hubungan: string
}

export function createPDF(user: userType, res: Response) {
    const doc = new PDFDocument()
    const randNumb = Array.from({length: 6}, () => Math.floor(Math.random() * 10)).map((num) => String(num)).join('')

    const fileName = res.setHeader('Content-Disposition', `attachment; filename=MLN-${randNumb}-${user.handphone}.pdf`)
    res.setHeader('Content-Type', `application/pdf`)
    
    doc.pipe(res)

    doc.fontSize(16).text('Pengundang yang beridentitas dibawah ini: ', { align: 'center' }).moveDown()
    
    doc
    .text(`Nomor Tamu              : ${'MLN-' + randNumb}`)
    .text(`Nama                    : ${user.nama}`)
    .text(`Kota Asal               : ${user.kota}`)
    .text(`Nomor Telepon           : ${user.handphone}`)
    .text(`Jumlah Tamu             : ${user.tamu}`)
    .text(`Hubungan dengan Mempelai: ${user.hubungan}`)
    .moveDown(2)

    doc.fontSize(16).text('Berhasil melakukan pendaftaran sebagai tamu undangan', {align: 'center'})

    doc.end()

    return {
        document: doc,
        fileName
    }
}