import app from "./app.js"
import mongoose from "mongoose"
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const port = process.env.PORT || 3001
const host = process.env.HOST || '0.0.0.0'

const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin123@localhost:27017/sweetmedical?authSource=admin'

mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.warn(`No se pudo conectar a MongoDB: ${error.message}`))

app.listen(port, host, () => {
  console.log(`🚀 Servidor corriendo en http://${host}:${port}`);
});
