/**
 * Dependencies
 */

// Herança
import { EventEmitter, getEventListeners, captureRejectionSymbol } from 'events';

// RabbitMQ
import amqp from 'amqplib';

// RabbitMQ
import {
    RABBIT_MQ_HOST,
    RABBIT_MQ_PORT,
    RABBIT_MQ_USERNAME,
    RABBIT_MQ_PASSWORD,
    RABBIT_MQ_URL
} from '../constants.js';

/**
 * Attributes
 */

const STATE = {
    OFFLINE: 0,
    STARTING: 1,
    ONLINE: 2
};

const local = {
    connection: {
        instance: null,
        available: false
    },
    channel: 
    {
        instance: null,    
        available: false
    },
    config: 
    {
        WAIT_TO_RECONNECT: 5000,
        WAIT_TO_DISCONNECT: 500
    },
    events: 
    {
        captureRejectionSymbol,
        getEventListeners
    },
    state: STATE.OFFLINE,
    keepAlive: true
};

/**
 * Implementation
 */

export default class RabbitMQDefault extends EventEmitter
{

    constructor(...args)
    {
        super(...args);
    }

    /***************************************************************************
     * Getters/Setters
     **************************************************************************/

    get amqp()
    {
        return amqp;
    }

    get config()
    {
        return {
            RABBIT_MQ_URL,
            config: local.config,
            events: local.events
        };
    }

    setConnection(value)
    {
        local.connection.instance = value;
        return this;
    }

    getConnection()
    {
        return local.connection.instance;
    }

    resetConnection()
    {
        local.connection.instance = null;
        return this;
    }

    setChannel(value)
    {
        local.channel.instance = value;
        return this;
    }

    getChannel()
    {
        return local.channel.instance;
    }

    resetChannel()
    {
        local.channel.instance = null;
        return this;
    }

    /***************************************************************************
     * Handlers
     **************************************************************************/

    turnOnOffline()
    {
        local.state = STATE.OFFLINE;
        return this;
    }

    get isOffline()
    {
        return local.state == STATE.OFFLINE;
    }

    turnOnStarting()
    {
        local.state = STATE.STARTING;
        return this;
    }

    get isStarting()
    {
        return local.state == STATE.STARTING;
    }

    turnOnOnline()
    {
        local.state = STATE.ONLINE;
        return this;
    }

    get isOnline()
    {
        return local.state == STATE.ONLINE;
    }

    turnOnServerAvailable()
    {
        local.connection.available = true;
        return this.turnOnOnline();
    }

    turnOffServerAvailable()
    {
        local.connection.available = false;
        return this.turnOnOffline();
    }

    get isServerAvailable()
    {
        return local.connection.available;
    }

    turnOnChannelAvailable()
    {
        local.channel.available = true;
        return this.turnOnOnline();
    }

    turnOffChannelAvailable()
    {
        local.channel.available = false;
        return this.turnOnOffline();
    }

    get isChannelAvailable()
    {
        return local.channel.available;
    }

    turnOnKeepAlive()
    {
        local.keepAlive = true;
        return this;
    }

    turnOffKeepAlive()
    {
        local.keepAlive = false;
        return this;
    }

    get keepAlive()
    {
        return local.keepAlive;
    }

}
