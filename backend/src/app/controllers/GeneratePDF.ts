import { Request, Response } from 'express'
import generateExcelFile from '../services/temporary-storage'
import createPDF from '../services/pdf'

export const generatePDF = async (req: Request, res: Response) => {
    const user = req.body;
    
    res.setHeader("Content-Disposition", `attachment; filename=undangan.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    generateExcelFile("data_tamu", user);
    createPDF(user, res);
}