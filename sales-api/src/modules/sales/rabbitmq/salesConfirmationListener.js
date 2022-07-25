import RabbitMQ from '../../../config/rabbitmq/lib/RabbitMQ---.js';

// RabbitMQ
import {
    //EXCHANGE_PRODUCT_TOPIC,
    PRODUCT_STOCK_UPDATE_QUEUE,
    //PRODUCT_STOCK_UPDATE_ROUTING_KEY,
    SALES_CONFIRMATION_QUEUE,
    //SALES_CONFIRMATION_ROUTING_KEY
} from './../../../config/rabbitmq/constants.js';

export function listenToSalesConfirmation()
{

    try
    {
        RabbitMQ.consume(
            SALES_CONFIRMATION_QUEUE,
            (message) =>
            {
                console.log(`SALES: ${message.content.toString()}`);
            }
        );
        RabbitMQ.consume(
            PRODUCT_STOCK_UPDATE_QUEUE,
            (message) =>
            {
                console.log(`PRODUCT: ${message.content.toString()}`);
            }
        );

    }
    catch (error) 
    {
        console.error(error);
    }

}
