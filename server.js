import express from "express";
const app = express();
app.use(express.json());

// .ENV
import "dotenv/config.js";
const PORT = process.env.PORT || 9001

// Cors
import cors from 'cors';

const corsOptions = {
    origin: 'https://project-manager-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };

app.use(cors(corsOptions));

// Routes
import router from './app/routes/Routes.js'
app.use(router)

app.listen(PORT, (err) => console.log(`Servidor Rodando na Porta: ${PORT}`))