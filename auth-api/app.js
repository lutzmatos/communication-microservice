import express from "express";

// import * as db from './src/config/db/initial.js';
// db.createInicialData();

import userRoutes from './src/modules/user/routes/UserRoutes.js';

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

// Permitir respostas JSON
app.use(express.json()); 

// Route check
app.get(
    '/api/status',
    (req, res) => 
    {
        return res.status(200).json(
            {
                service: "Auth-API", 
                status: "up",
                httpStatus: "200" 
            }
        );
    }
);

// Rotas de usuários
app.use(userRoutes);

app.listen(
    PORT,
    () => 
    {
        console.info(`Server started successfully at port ${PORT}`);
    }
);
