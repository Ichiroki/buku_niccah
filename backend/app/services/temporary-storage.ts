import fs from 'fs'
import path from 'path'

interface DataType {
    id: string
    nama: string
    kota: string
    handphone: number
    tamu: number
    hubungan: string
}

function generateJSONFile(fileName: string, data: DataType) {
    const dir = './.backup'

    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true})
    }

    const mainFile = path.join(dir, fileName.replace(/\s/g, '_').toLowerCase())
    const backupFile = path.join(dir, fileName.replace(/\s/g, '_').toLowerCase() + '_backup')

    fs.writeFileSync(mainFile, JSON.stringify(data), 'utf-8')
    fs.writeFileSync(backupFile, JSON.stringify(data), 'utf-8')

    fs.watchFile(mainFile, () => {
        fs.copyFileSync(mainFile, backupFile)

        if(process.platform === 'win32') {
            const { exec } = require('child_process')
            exec(`attrib +H ${backupFile}`, (err: any) => {
                if(err) {
                    console.error('File gagal disimpan', err)
                } else {
                    console.log('File Berhasil disembunyikan')
                }
            })
        }
    })
}

export default generateJSONFile