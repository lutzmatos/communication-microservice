/**
 * Dependencies
 */

import RabbitMQDefault from './RabbitMQDefault.js';

/**
 * Implementation
 */

export default class RabbitMQHandler extends RabbitMQDefault
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

        //
        this.turnOffServerAvailable()

        //
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
        console.log();
    }

    /***************************************************************************
     * Handlers: Channel
     **************************************************************************/

    channelClose()
    {
        console.log('  ---->> Channel CLOSE');

        //
        this.turnOffChannelAvailable;

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
