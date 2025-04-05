import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import * as XLSX from 'xlsx'

export const CheckUser = (req: Request, res: Response) => {
    const filePath = path.join("./.backup/data_tamu.xlsx");

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
        res.status(500).json({ error: "File data tidak ditemukan" });
    }

    // Baca file Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Konversi ke JSON
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);
    const user = data.find((item) => item.id === req.params.id);

    // Jika data tidak ditemukan, redirect ke confirmation.html
    if (!user) {
        res.status(404).json({ error: "Tamu tidak dapat ditemukan" });
    }

    res.status(201).json(user);
}