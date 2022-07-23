const env = process.env;

export const EXCHANGE_PRODUCT_TOPIC = "product.topic";
export const PRODUCT_STOCK_UPDATE_QUEUE = "product-stock-update.queue";
export const PRODUCT_STOCK_UPDATE_ROUTING_KEY = "product-stock-update.routingKey";
export const SALES_CONFIRMATION_QUEUE = "sales-confirmation.queue";
export const SALES_CONFIRMATION_ROUTING_KEY = "sales-confirmation.routingKey";

export const RABBIT_MQ_HOST = env.RABBIT_MQ_HOST || 'localhost';
export const RABBIT_MQ_PORT = env.RABBIT_MQ_PORT || 5672;
export const RABBIT_MQ_USERNAME = env.RABBIT_MQ_USERNAME || 'guest';
export const RABBIT_MQ_PASSWORD = env.RABBIT_MQ_PASSWORD || 'guest';

export const RABBIT_MQ_URL = `amqp://${RABBIT_MQ_HOST}`;
