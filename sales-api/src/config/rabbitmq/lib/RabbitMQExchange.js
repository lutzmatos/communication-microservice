/**
 * Dependencies
 */

// Inheritage
import RabbitMQChannel from './RabbitMQChannel.js';

/**
 * Attributes
 */

const TYPE = {
    DIRECT: 'direct',
    TOPIC: 'topic',
    FANOUT: 'fanout',
    HEADERS: 'headers'
};

const local = {
    exchange: 
    {
        list: []
    },
    queue: 
    {
        list: []
    },
    bind: 
    {
        list: []
    }
};

/**
 * Implementation
 */

export default class RabbitMQExchange extends RabbitMQChannel
{

    constructor(...args)
    {
        super(...args);
    }

    /***************************************************************************
     * Getters/Setters
     **************************************************************************/

    // ...

    /***************************************************************************
     * Handlers
     **************************************************************************/

    async checkExchange(name)
    {
        try
        {
            await this.getChannel().checkExchange(name);
            return true;
        }
        catch (error)
        {
            return false;
        }
    }

    /**
     * @description Criação de uma "exchange".
     * @param {String} name - Nome da "exchange".
     * @param {String} type - Tipo da "exchange".
     * @param {JSON} options - Opções de configuração da "exchange"
     * @returns {JSON}
     */
    async createExchange(name = 'N/I', type = TYPE.TOPIC, options = { durable: true })
    {

        try
        {

            // O canal é obrigatório
            this.validateChannel();

            // @todo: validar os dados

            // Vamos recuperar a configuração cadastrada
            const config = { name, type, options };

            // Vamos cadastrar o novo "exchange" na lista
            local.exchange.list.push(config);

            // Verificar se o "exchange" existe
            //const exists = await this.checkExchange(name);

            // Verificar se o "exchange" existe
            await this.getChannel().assertExchange(config.name, config.type, config.options);

            // Vamos devolver a configuração
            return {...config};

        }
        catch (error)
        {

            throw error;
        }

    }

    /**
     * @description Criação de uma "queue".
     * @param {String} name - Nome da "queue".
     * @param {JSON} options - Opções de configuração da "queue"
     * @returns {JSON}
     */
    async createQueue(name = 'N/I', options = { durable: true })
    {

        try
        {

            // O canal é obrigatório
            this.validateChannel();

            // @todo: validar os dados

            // Vamos recuperar a configuração cadastrada
            const config = { name, options };

            // Vamos cadastrar o novo "exchange" na lista
            local.queue.list.push(config);

            // Verificar se o "exchange" existe
            await this.getChannel().assertQueue(config.name, config.options);

            // Vamos devolver a configuração
            return {...config};

        }
        catch (error)
        {

            throw error;
        }

    }

    /**
     * @description Criação de uma "queue".
     * @param {String} name - Nome da "queue".
     * @param {JSON} options - Opções de configuração da "queue"
     * @returns {JSON}
     */
    async bindQueue(queue = 'N/I', exchange = 'N/I', key = 'N/I')
    {

        try
        {

            // O canal é obrigatório
            this.validateChannel();

            // @todo: validar os dados

            // Vamos recuperar a configuração cadastrada
            const config = { queue, exchange, key };

            // Vamos cadastrar o novo "exchange" na lista
            local.bind.list.push(config);

            // Verificar se o "exchange" existe
            await this.getChannel().bindQueue(config.queue, config.exchange, config.key);

            // Vamos devolver a configuração
            return {...config};

        }
        catch (error)
        {
            throw error;
        }

    }

    /**
     * @description Criação de uma "queue".
     * @param {JSON} exchange - Opções de configuração da "exchange".
     * @param {JSON} queue - Opções de configuração da "queue".
     * @param {String} key - Nome da rota.
     * @returns {JSON}
     */
    async buildQueue(exchange = {}, queue = {}, key = 'N/I')
    {

        try
        {

            // O canal é obrigatório
            this.validateChannel();

            // @todo: validar os dados

            // Vamos recuperar a configuração cadastrada
            const config = { key, exchange, queue };

            // Criação do "exchange"
            await this.createExchange(
                config.exchange.name,
                config.exchange.type,
                config.exchange.options
            );

            // Criação do "queue"
            await this.createQueue(
                config.queue.name,
                config.queue.options
            );

            // Vínculo da fila com o serviço de postagem
            await this.bindQueue(
                config.queue.name,
                config.exchange.name,
                key
            );

            // Vamos devolver a configuração
            return {...config};

        }
        catch (error)
        {
            throw error;
        }

    }

}
