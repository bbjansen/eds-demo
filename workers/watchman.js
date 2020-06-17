// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.

'use strict'

const UUID = require('uuid/v4')

// Collected subscriptions waiting in the `subscriptions` queue
// are consumed on a 1:1 bases. The worker stores processes each
// scheduled subscription and upon conditions met it triggers an
// notification

module.exports = async function (subscribeQueue) {
  try {

    // 1:1
    // Consume one message at a time for optimum speed,
    // stability and data integrity.

    subscribeQueue.prefetch(1)
    subscribeQueue.consume('subscriptions', store)
  }
  catch(err) {

    console.error(err.toString())
  }

  async function store (msg) {

    // Parse event content
    const data = JSON.parse(msg.content.toString())
  
    try {

 
      // Acknowledge message
      await subscribeQueue.ack(msg)


      // Resend to the queue if `type` is a repeat

      if(data.event[0].type === 'repeat') {
        await subscribeQueue.publish('delayed', 'subscribe', Buffer.from(JSON.stringify(data)), {
          correlationId: UUID(),
          headers: { 'x-delay': data.event[0].delay }
        })
      }

      console.log('[Event] [ ' + data.actor[0].name + ' ] ' + data.event[0].description)
    } catch (err) {

        // Send message back to the queue for a retry
        await subscribeQueue.nack(msg)
        console.error(err.toString()) 
    }
  }
}


