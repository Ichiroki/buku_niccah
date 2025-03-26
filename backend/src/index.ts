import express from "express";
import ngrok from "ngrok";
import Api from "./routes/api";
import cors from "cors";
import bodyParser from "body-parser";

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(Api);

app.listen(port, () => {
	console.log(`server berjalan di http://localhost:${port}`);
	try {
		(async function () {
			const url = await ngrok.connect({
				addr: port,
				authtoken: process.env.NGROK_AUTHTOKEN,
			});
			console.log(`ngrok jalan di: ${url}`);
		});
	} catch (e) {
		console.error("mampus error");
	}
});
