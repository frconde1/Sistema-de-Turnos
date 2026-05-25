import app from "./app.js"
import mongoose from "mongoose"

const port = process.env.PORT || 3000
const host = 'localhost'

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sweetmedical'

mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.warn(`No se pudo conectar a MongoDB: ${error.message}`))

app.listen(port, host, () => {
  console.log(`🚀 Servidor corriendo en http://${host}:${port}`);
});
