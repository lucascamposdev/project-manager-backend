import express from "express";
const app = express();

// Cors
import cors from 'cors';
app.use(cors({
    origin: '*', // ou você pode especificar a origem do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // habilitar o envio de cookies
  }));

app.use(express.json());

// .ENV
import "dotenv/config.js";
const PORT = process.env.PORT || 9001

// Routes
import router from './app/routes/Routes.js'
app.use(router)

app.listen(PORT, (err) => console.log(`Servidor Rodando na Porta: ${PORT}`))