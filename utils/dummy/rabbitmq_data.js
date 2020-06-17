// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.
'use strict'

require('dotenv').config('../');
const db = require('../../libs').knex;
const UUID = require('uuid/v4');

// Initialize 
(async () => {
  try {

    // Let's create a bunch of queues shall we?
    const subscribeQueue = await require('../../libs/rabbitmq')('subscriptions')
  
    // Setup delayed message support for the `usrEvents` queue. 
    subscribeQueue.assertExchange('delayed', 'x-delayed-message', {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: { 'x-delayed-type': 'direct' }
    })
  
    // Bind `subscribeQueue` queue to 'delayed' exchange via a route named 'subscribe'.
    subscribeQueue.bindQueue('subscriptions', 'delayed', 'subscribe')

    const subscriptions = await db('subscriptions').select()
  
    for (const subscription of subscriptions) {

      if(subscription.enabled === 1) {
        const actor = await db('actors').select().where('id', subscription.actor_id)
        const event = await db('events').select().where('id', subscription.event_id)
        const data = { actor, event, subscription}
  
        await subscribeQueue.publish('delayed', 'subscribe', Buffer.from(JSON.stringify(data)), {
          correlationId: UUID(),
          headers: { 'x-delay': event.delay }
        })
      }
    }

    console.info('[DB] Dummy `rabbitmq` messages inserted')
  }
  catch(err) {
    console.error(err.toString())
  }
})();
