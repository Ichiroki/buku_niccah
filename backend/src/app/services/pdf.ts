import PDFDocument from 'pdfkit-table'
import { Response } from 'express'

interface userType {
    id: string
    nama: string
    kota: string
    handphone: number
    tamu: number
    hubungan: string
}

function createPDF(user: userType, res: Response) {
    const doc = new PDFDocument({
        lang: 'id_ID',
        size: 'A5',
        layout: 'landscape'
    })

    const pageWidth = doc.page.width
    const pageHeight = doc.page.height

    doc.rect(0, 0, pageWidth, pageHeight).fill('#f1f5f9')
    doc.lineWidth(5).rect(10, 10, pageWidth - 20, pageHeight - 20).stroke('#94a3b8')

    doc.font('Times-Roman')

    doc.fillColor('#000')
        .fontSize(16)
        .text("TAMU UNDANGAN YANG BERIDENTITAS DI BAWAH INI :", {align: 'center'})
        .moveDown()

    doc.fontSize(12)
    doc.text('ID', 100, 150)
    doc.text('Nama', 100, 170)
    doc.text('Kota', 100, 190)
    doc.text('Handphone', 100, 210)
    doc.text('Tamu', 100, 230)
    doc.text('Hubungan', 100, 250)

    doc.fontSize(12)
    doc.text(':', 200, 150)
    doc.text(':', 200, 170)
    doc.text(':', 200, 190)
    doc.text(':', 200, 210)
    doc.text(':', 200, 230)
    doc.text(':', 200, 250)

    doc.fontSize(12)
    doc.text(`${user.id}`, 210, 150)
    doc.text(`${user.nama}`, 210, 170)
    doc.text(`${user.kota}`, 210, 190)
    doc.text(`${user.handphone}`, 210, 210)
    doc.text(`${user.tamu}`, 210, 230)
    doc.text(`${user.hubungan}`, 210, 250)

    doc.fontSize(16)
    .text("BERHASIL MELAKUKAN REGISTRASI", 100, 300, {align: 'center'})

    doc.pipe(res)

    doc.end()
}

export default createPDF