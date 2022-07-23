import RabbitMQ from './../rabbitmq/lib/RabbitMQ.js';

// RabbitMQ
import {
    EXCHANGE_PRODUCT_TOPIC,
    PRODUCT_STOCK_UPDATE_QUEUE,
    PRODUCT_STOCK_UPDATE_ROUTING_KEY,
    SALES_CONFIRMATION_QUEUE,
    SALES_CONFIRMATION_ROUTING_KEY
} from './constants.js';

export async function connectRabbitMq()
{
    try
    {
        await RabbitMQ.init(
            (instance) =>
            {

                // Criação da fila de produtos
                instance.createQueue(EXCHANGE_PRODUCT_TOPIC, PRODUCT_STOCK_UPDATE_ROUTING_KEY, PRODUCT_STOCK_UPDATE_QUEUE);

                // Criação da fila de vendas
                instance.createQueue(EXCHANGE_PRODUCT_TOPIC, SALES_CONFIRMATION_ROUTING_KEY, SALES_CONFIRMATION_QUEUE);

            }
        );

        console.log('-------------------------------------------------');
        console.log('RabbitMQ conectado!');
        console.log('-------------------------------------------------');

    }
    catch (error) 
    {
        console.error(error);
    }
}
