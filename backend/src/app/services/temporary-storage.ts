import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

interface DataType {
	id: string;
	nama: string;
	kota: string;
	handphone: number;
	tamu: number;
	hubungan: string;
}

function generateExcelFile(fileName: string, data: DataType) {
	const dir = "./.backup";

	// Cek apakah folder .backup sudah ada
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	const filePath = path.join(dir, fileName.replace(/\s/g, "_").toLowerCase() + ".xlsx");

	let workbook: XLSX.WorkBook;
	let worksheet: XLSX.WorkSheet;
	let existingData: DataType[] = [];

	// Cek apakah file Excel sudah ada
	if (fs.existsSync(filePath)) {
		try {
			const existingWorkbook = XLSX.readFile(filePath);
			const sheetName = existingWorkbook.SheetNames[0];
			worksheet = existingWorkbook.Sheets[sheetName];

			// Konversi data lama ke JSON
			existingData = XLSX.utils.sheet_to_json(worksheet);
		} catch (e) {
			console.error("Gagal membaca file Excel:", e);
			existingData = [];
		}
	}

	// Tambahkan data baru ke dalam array
	existingData.push(data);

	// Buat worksheet baru dengan semua data
	worksheet = XLSX.utils.json_to_sheet(existingData);

	// Buat workbook baru
	workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Tamu");

	// Simpan file Excel
	XLSX.writeFile(workbook, filePath);

	console.log("Data berhasil ditambahkan ke Excel:", filePath);
}

export default generateExcelFile;
