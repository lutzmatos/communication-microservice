import express from "express";

import tracing from './src/config/tracing/index.js';
import userRoutes from './src/modules/user/routes/UserRoutes.js';

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

// Permitir respostas JSON
app.use(express.json()); 

// Usar rastreamento
app.use(tracing); 

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

// Serviço
app.listen(
    PORT,
    () => 
    {
        console.info(`Server started successfully at port ${PORT}`);
    }
);
