/**
 * Dependencies
 */

// Inheritage
import RabbitMQExchange from './RabbitMQExchange.js';

/**
 * Attributes
 */

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

export default class RabbitMQCommand extends RabbitMQExchange
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

    // ...

}
