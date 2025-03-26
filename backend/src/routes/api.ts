import express, { Request, Response } from "express";
import generateExcelFile from "../app/services/temporary-storage";
import createPDF from "../app/services/pdf";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

const Api = express();
const frontendPath = path.join(__dirname, "../../../frontend/");

Api.post("/generate-pdf", (req: Request, res: Response) => {
	const user = req.body;

	res.setHeader("Content-Disposition", `attachment; filename=undangan.pdf`);
	res.setHeader("Content-Type", "application/pdf");

	generateExcelFile("data_tamu", user);
	createPDF(user, res);
});

Api.post("/check/:id", (req: Request, res: Response) => {
	const filePath = path.join("./.backup/user_data.xlsx");

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
});

export default Api;
