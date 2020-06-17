// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.
'use strict'

require('dotenv').config('../')

const db = require('../libs').knex;

//
// WARNING
//

// This script is for development purposes only.
// It will NUKE EVERTYTHING
// Drops database and all queues and makes fresh ones

// You have been warning.

(async () => {
    try {

        const subscribeQueue = await require('../libs/rabbitmq')('subscriptions')

        // Delete Queues
        await subscribeQueue.deleteQueue('subscriptions')

        // Drop all tables
        await db.schema.dropTableIfExists('actors')
        await db.schema.dropTableIfExists('orgs')
        await db.schema.dropTableIfExists('events')
        await db.schema.dropTableIfExists('subscriptions')

        // Setup queues
        await subscribeQueue.assertQueue('subscriptions')

        // Setup database tables
        require('../utils/db/schema');

        console.info('[DB] dropped')
    }
    catch(err) {
      console.error(err.toString())
    }
})()