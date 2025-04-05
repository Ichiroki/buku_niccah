import express from "express"
import { CheckUser } from "../app/controllers/CheckUser"
import { generatePDF } from "../app/controllers/GeneratePDF"

const Api = express();

Api.post("/generate-pdf", generatePDF);

Api.post("/check/:id", CheckUser);

export default Api;
