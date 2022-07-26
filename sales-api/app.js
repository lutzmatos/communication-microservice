

// import fs from 'fs';
// import util from 'util';

// fs.writeFile('channel2.txt', util.inspect(channel, { compact: false, depth: 10, breakLength: 400 }), function (err) {
//     if (err) throw err;
//     console.log('File is created successfully.');
// });

import express from "express"; 

import { connectMongoDb } from './src/config/db/mongo/config.js';

import Order from './src/modules/sales/model/Order.js';

import { connectRabbitMq } from './src/modules/sales/rabbitmq/init.js';
import { listenToSalesConfirmation } from './src/modules/sales/rabbitmq/listeners.js';
import { sendMessageToProductStockUpdateQueue } from './src/modules/product/rabbitmq/dispatchers.js';

import middlewareAuth from './src/middlewares/auth/Auth.js';

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

// Permitir respostas JSON
app.use(express.json()); 

const init = async () =>
{
    await connectRabbitMq();
    await listenToSalesConfirmation();
}

connectMongoDb();
init();

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
        sendMessageToProductStockUpdateQueue(
            [
                {
                    productId: 1001,
                    quantity: 2
                },
                {
                    productId: 1002,
                    quantity: 2
                },
                {
                    productId: 1003,
                    quantity: 2
                }
            ]
        );

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

// ...
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
