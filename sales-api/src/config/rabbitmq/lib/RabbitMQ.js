/**
 * Dependencies
 */

// RabbitMQ
import RabbitMQCommand from './RabbitMQCommand.js';

/**
 * Implementation
 */

class RabbitMQ extends RabbitMQCommand
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

    /**
     * @desciption Centralizador da inicialização do objeto.
     * @returns {RabbitMQ}
     */
    async init()
    {

        try
        {

            // Finalização segura de tudo
            await this.start();

            console.log(
                '\n',
                '###############################\n',
                'RabbitMQ conectado!\n',
                '###############################\n'
            );

        }
        catch (error)
        {

            //console.error(error);

            console.log(
                '\n',
                '+++++++++++++++++++++++++++++++\n',
                'RabbitMQ desconectado!\n',
                '+++++++++++++++++++++++++++++++\n'
            );

            // Tentativa de nova conexão
            await this.gracefullyRestart();

        }

        return this;

    }

    /**
     * @desciption Centralizador da finalização do objeto.
     * @returns {RabbitMQ}
     */
    async finish()
    {

        try
        {

            // Não vamos forçar a reconexão
            this.turnOffKeepAlive();

            // Finalização segura de tudo
            await this.stop();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Inicialização segura da aplicação.
     * @returns {RabbitMQ}
     */
    async start()
    {

        try
        {

            // Finalização segura de tudo
            await this.stop();

            // Vamos sinalizar que o objeto está iniciando
            this.turnOnStarting();

            // Inicialização do objeto que representa a conexão
            await this.connectionStart();

            // Inicialização do objeto que representa o canal
            await this.channelStart();

            // Vamos sinalizar que o objeto está iniciado
            this.turnOnOnline();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Finalização segura da aplicação.
     * @returns {RabbitMQ}
     */
    async stop()
    {

        try
        {

            // Finalização do objeto que representa o canal
            await this.channelFinish();

            // Finalização do objeto que representa a conexão
            await this.connectionFinish();

            // Vamos sinalizar que o objeto está finalizado
            this.turnOnOffline();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Inicialização segura da conexão.
     * @returns {RabbitMQ}
     */
    async connectionStart()
    {

        try
        {

            // Configuração do objeto de conexão
            await this.configConnection();

            // Configuração das escutas na conexão
            this.configListenConnection();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Finalização segura da conexão.
     * @returns {RabbbitMQ}
     */
    async connectionFinish()
    {

        try
        {

            // Desconfiguração das escutas da conexão
            this.misconfigListenConnection();

            // Desconfiguração da conexão
            await this.misconfigConnection();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Inicialização segura do canal.
     * @returns {RabbitMQ}
     */
    async channelStart()
    {

        try
        {

            // Configuração do objeto do canal
            await this.configChannel();

            // Configuração das escutas no canal
            this.configListenChannel();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Finalização segura do canal.
     * @returns {RabbbitMQ}
     */
    async channelFinish()
    {

        try
        {

            // Desconfiguração das escutas do canal
            this.misconfigListenChannel();

            // Desconfiguração da canal
            await this.misconfigChannel();

        }
        catch (error)
        {
            throw error;
        }

        return this;

    }

    /**
     * @desciption Reinicialização segura do objeto.
     * @returns {RabbitMQ}
     */
    gracefullyRestart()
    {

        // Reinicialização inibida
        if (!this.keepAlive) return this;

        // Se o serviço não estiver desligado, então nem vamos tentar iniciá-lo
        if (!this.isOffline) return this;

        // Vamos aguardar alguns segundos e tentar conectar novamente
        setTimeout(
            async () =>
            {
                await this.init();
            },
            this.config.config.WAIT_TO_RECONNECT
        );

        return this;

    }

}

export default RabbitMQ;
