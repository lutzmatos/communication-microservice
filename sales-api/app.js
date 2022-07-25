import express from "express"; 

import { connectMongoDb } from './src/config/db/mongo/config.js';
import { connectRabbitMq } from './src/config/rabbitmq/config.js';

import Order from './src/modules/sales/model/Order.js';
// import { listenToSalesConfirmation } from './src/modules/sales/rabbitmq/salesConfirmationListener.js';
// import { sendMessageToProductStockUpdateQueue } from './src/modules/product/rabbitmq/productStockUpdateSender.js';

import middlewareAuth from './src/middlewares/auth/Auth.js';

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

// Permitir respostas JSON
app.use(express.json()); 

connectRabbitMq();
connectMongoDb();

// listenToSalesConfirmation();

// Route check
app.get(
    '/api/status',
    async (req, res) => 
    {
        return res.status(200).json(
            {
                service: "Sales-API",
                status: "up",
                httpStatus: "200"
            }
        );
    }
);

// Route check
app.get(
    '/test/mq',
    async (req, res) => 
    {
        // sendMessageToProductStockUpdateQueue(
        //     [
        //         {
        //             productId: 1001,
        //             quantity: 2
        //         },
        //         {
        //             productId: 1002,
        //             quantity: 2
        //         },
        //         {
        //             productId: 1003,
        //             quantity: 2
        //         }
        //     ]
        // );

        return res.status(200).json(
            {
                service: "Sales-API",
                status: "up",
                httpStatus: "200"
            }
        );
    }
);

// Checagem de jwt
app.use(middlewareAuth);

app.get(
    '/all',
    async (req, res) => 
    {

        let result = {};

        try 
        {
            result = await Order.find();
        }
        catch (error)
        {
            result = {
                error: {
                    message: error.message
                }
            };
        }

        return res.status(200).json(result);

    }
);

// Serviço
app.listen(
    PORT,
    () =>
    {
        console.info(`Server started successfully at port ${PORT}`);
    }
);
