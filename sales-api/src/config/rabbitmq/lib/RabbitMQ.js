/**
 * Dependencies
 */

// RabbitMQ
import amqp from 'amqplib/callback_api.js';

// RabbitMQ
import {
    RABBIT_MQ_HOST,
    RABBIT_MQ_PORT,
    RABBIT_MQ_USERNAME,
    RABBIT_MQ_PASSWORD,
    RABBIT_MQ_URL
} from './../constants.js';

/**
 * Attributes
 */

const local = {
    performed: false,
    connection: null,
    channel: null,
    WAIT_TO_DISCONNECT: 500
};

/**
 * Implementation
 */

class RabbitMQ 
{

    constructor()
    {
        this.reset();
    }

    /**
     * @description Inicialização segura das filas.
     * @return {RabbitMQ}
     */
    init(callback)
    {

        if (!local.performed)
        {
            this.connect(
                () =>
                {

                    try
                    {

                        // Execução dos recursos de inicialização
                        callback(this);

                        // Vamos inibir inicialização duplicada
                        local.performed = true;

                    }
                    catch (error)
                    {
                        console.error(error);
                    }

                }
            );
        }

        return this;

    }

    /**
     * @description Conexão com o servidor RabbitMQ.
     * @return {Promise}
     */
    connect(callback)
    {
        return new Promise(
            (resolve, reject) =>
            {

                // Inicialização da conexão
                amqp.connect(
                    RABBIT_MQ_URL, 
                    (_error, _connection) =>
                    {

                        // Lançamento da exceção
                        if (_error) return reject(_error);

                        // Armazenamento temporário da conexão
                        local.connection = _connection;

                        // Criação do canal de comunicação
                        _connection.createChannel(
                            (__error, __channel) =>
                            {

                                // Lançamento da exceção
                                if (__error) return reject(__error);

                                // Armazenamento temporário do canal
                                local.channel = __channel;

                                // Retorno do cliente
                                callback();

                                // Fim do processo
                                resolve(true);

                            }
                        );

                    }
                );

                // Finalização da conexão
                this.disconnect();

            }
        );
        
    }

    /**
     * @description Desconexão com o servidor RabbitMQ.
     * @return {RabbitMQ}
     */
    disconnect()
    {

        // Invocação tardia da desconexão.
        setTimeout(
            ()  =>
            {
                this.close().reset();
                console.log('-------------------------------------------------');
                console.log('RabbitMQ desconectado!');
                console.log('-------------------------------------------------');
            }, 
            local.WAIT_TO_DISCONNECT
        );

        return this;

    }

    /**
     * @description Encerramento da conexão.
     * @return {RabbitMQ}
     */
    close()
    {

        // Encerramento
        if (local.connection)  local.connection.close();

        return this;

    }

    /**
     * @description Estado inicial do objeto.
     * @return {RabbitMQ}
     */
    reset()
    {

        local.connection = null;
        local.channel = null;

        return this;

    }

    /**
     * @description Estado inicial do objeto.
     * @return {RabbitMQ}
     */
    createQueue(topic, routingKey, queue)
    {

        // Conexão e canal são objetos obrigatórios
        if (!local.connection || !local.channel) 
        {
            throw new Error("Connection was not found");
        };

        //
        local.channel.assertExchange(topic, "topic", {durable: true});

        //
        local.channel.assertQueue(queue, {durable: true});

        //
        local.channel.bindQueue(queue, topic, routingKey);

        return this;

    }



    dispatcher()
    {

        // 
        if (!local.send.queue || !local.send.message) return;

        //
        local.channel.assertExchange(
            local.send.topic, 
            "topic", 
            {
                durable: true
            }
        );

        //
        local.channel.assertQueue(
            local.send.queue, 
            {
                durable: true
            }
        );

        // 
        local.channel.sendToQueue(local.send.queue, Buffer.from(local.send.message));

    }

    send(queue, message)
    {

        //
        local.send.queue = queue;
        local.send.message = message;

        // A conexão irá disparar automaticamente a mensagem
        this.connect();

    }

}

export default new RabbitMQ;
