import express from "express";
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://project-manager-frontend.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });


app.use(express.json());

// .ENV
import "dotenv/config.js";
const PORT = process.env.PORT || 9001

// Routes
import router from './app/routes/Routes.js'
app.use(router)

app.listen(PORT, (err) => console.log(`Servidor Rodando na Porta: ${PORT}`))