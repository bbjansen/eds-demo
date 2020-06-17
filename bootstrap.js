// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.
'use strict'

// Setup logger
require('console-stamp')(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
      stamp: 'green',
      label: 'white',
  }
})

// Setup database tables
require('./utils/db/schema');

// Initialize 

(async () => {
  try {
    const subscribeQueue = await require('./libs/rabbitmq')('subscriptions')

    // Yes! Consume!
    require('./workers/watchman')(subscribeQueue)

  }
  catch(err) {
    console.error(err.toString())
  }
})()