/**
 * Dependencies
 */

import RabbitMQAccess from './RabbitMQAccess.js';

/**
 * Implementation
 */

export default class RabbitMQHandler extends RabbitMQAccess
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
     * Handlers: Connection
     **************************************************************************/

    connectionClose()
    {
        console.log('  -->> Connection CLOSE');

        // Vamos imediatamente que o servidor foi desconectado
        this.turnOffServerAvailable()

        // Vamos tentar reiniciar o objeto e as suas conexões
        .gracefullyRestart();

    }

    connectionError(error)
    {
        console.log('  -->> Connection ERROR');
        console.error(error);
    }

    connectionBloqued(reason)
    {
        console.log('  -->> Connection BLOQUED');
        console.log(reason);
    }

    connectionUnbloqued()
    {
        console.log('  -->> Connection UNBLOQUED');
    }

    /***************************************************************************
     * Handlers: Channel
     **************************************************************************/

    channelClose()
    {
        console.log('  ---->> Channel CLOSE');

        // Vamos imediatamente que o canal foi desconectado
        this.turnOffChannelAvailable();

    }

    channelError(error)
    {
        console.log('  ---->> Channel ERROR');
        console.error(error);
    }

    channelReturn(message)
    {
        console.log('  ---->> Channel RETURN');
        console.log('message:', message);
    }

    channelDrain()
    {
        console.log('  ---->> Channel DRAIN');
        console.log();
    }

}
