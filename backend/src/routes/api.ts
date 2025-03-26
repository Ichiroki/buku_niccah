import express, { Request, Response } from "express";
import generateJSONFile from "../app/services/temporary-storage";
import createPDF from "../app/services/pdf";
import fs from "fs";

const Api = express();

Api.post("/generate-pdf", (req: Request, res: Response) => {
	const user = req.body;

	res.setHeader("Content-Disposition", `attachment; filename=undangan.pdf`);
	res.setHeader("Content-Type", "application/pdf");

	generateJSONFile("user_data", user);
	createPDF(user, res);
});

Api.post("/check/:id", (req: Request, res: Response) => {
	if (!fs.existsSync("./.backup/user_data.json") || !fs.existsSync("./.backup/user_data_backup.json")) {
		res.status(500).json({ error: "File data tidak ditemukan" });
	}

	const data = fs.readFileSync("./.backup/user_data.json", "utf-8");

	console.log(data);
});

export default Api;
