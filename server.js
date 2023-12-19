import express from "express";
const app = express();
app.use(express.json());

// .ENV
import "dotenv/config.js";
const PORT = process.env.PORT || 9001

// Cors
import cors from 'cors';
app.use(cors());

// Routes
import router from './app/routes/Routes.js'
app.use(router)

// Database Connection
import connection from "./app/config/connection.js";

app.listen(PORT, (err) => console.log(`Servidor Rodando na Porta: ${PORT}`))