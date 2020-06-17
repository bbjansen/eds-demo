// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.
'use strict'

require('dotenv').config('../');
const db = require('../../libs').knex;

// Dummy actor data

const actors = [
  {
    id: 1,
    id_link: 21293921239,
    name: "bob",
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 2,
    id_link: 911465528212,
    name: "sven",
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 3,
    id_link: 211461520920,
    name: "rick",
    timestamp: Math.round((new Date()).getTime() / 1000)
  }
];

const orgs = [
  {
    id: 1,
    id_link: 621469538291,
    name: "jansen bv",
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 2,
    id_link: 498265518256,
    name: "stam bv",
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 3,
    id_link: 2189178527500,
    name: "schmitz bv",
    timestamp: Math.round((new Date()).getTime() / 1000)
  }
];

const events = [
  {
    id: 1,
    name: "open_bank_account",
    description: "Open a bank account for your organization.",
    type: "once",
    category: "accounting",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 2,
    name: "pay_up_shares",
    description: "Pay up the organizations shares.",
    type: "once",
    category: "org",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 3,
    name: "register_taxes",
    description: "Register extended fiscal year with the the tax authorities",
    type: "once",
    category: "accounting",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 4,
    name: "start_dga_salary",
    description: "Start a DGA salary for your organization director(s)",
    type: "once",
    category: "services",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 5,
    name: "trademark_registration",
    description: "Register your organizations trademark.",
    type: "repeat",
    delay: 3000,
    category: "legal",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 6,
    name: "verify_data",
    description: "Verify the organizations data.",
    type: "once",
    category: "system",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 7,
    name: "enable_bookkeeping",
    description: "Enable bookkeeping now and get the first three months for free!",
    type: "repeat",
    delay: 15000,
    category: "system",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
  {
    id: 8,
    name: "logo",
    description: "Need a logo for your organization? Contact us!",
    type: "repeat",
    delay: 10000,
    category: "system",
    data: null,
    timestamp: Math.round((new Date()).getTime() / 1000)
  },
];

// not added yet
const subscriptions = [
  {
    id: 1,
    actor_id: 1,
    event_id: 1,
    enabled: true
  },
  {
    id: 2,
    actor_id: 1,
    event_id: 2,
    enabled: true
  },
  {
    id: 3,
    actor_id: 1,
    event_id: 3,
    enabled: true
  },
  {
    id: 4,
    actor_id: 1,
    event_id: 4,
    enabled: true
  },
  {
    id: 5,
    actor_id: 1,
    event_id: 5,
    enabled: true
  },
  {
    id: 6,
    actor_id: 1,
    event_id: 6,
    enabled: true
  },
  {
    id: 7,
    actor_id: 1,
    event_id: 7,
    enabled: true
  },
  {
    id: 8,
    actor_id: 1,
    event_id: 8,
    enabled: true
  },
  {
    id: 9,
    actor_id: 2,
    event_id: 1,
    enabled: true
  },
  {
    id: 10,
    actor_id: 2,
    event_id: 2,
    enabled: true
  },
  {
    id: 11,
    actor_id: 2,
    event_id: 3,
    enabled: true
  },
  {
    id: 12,
    actor_id: 2,
    event_id: 4,
    enabled: true
  },
  {
    id: 13,
    actor_id: 2,
    event_id: 5,
    enabled: true
  },
  {
    id: 14,
    actor_id: 2,
    event_id: 6,
    enabled: true
  },
  {
    id: 15,
    actor_id: 2,
    event_id: 7,
    enabled: true
  },
  {
    id: 16,
    actor_id: 2,
    event_id: 8,
    enabled: true
  },
  {
    id: 17,
    actor_id: 3,
    event_id: 1,
    enabled: true
  },
  {
    id: 18,
    actor_id: 3,
    event_id: 2,
    enabled: true
  },
  {
    id: 19,
    actor_id: 3,
    event_id: 3,
    enabled: true
  },
  {
    id: 20,
    actor_id: 3,
    event_id: 4,
    enabled: true
  },
  {
    id: 21,
    actor_id: 3,
    event_id: 5,
    enabled: true
  },
  {
    id: 22,
    actor_id: 3,
    event_id: 6,
    enabled: true
  },
  {
    id: 23,
    actor_id: 3,
    event_id: 7,
    enabled: true
  },
  {
    id: 24,
    actor_id: 3,
    event_id: 8,
    enabled: true
  }
];


// Initialize 

(async () => {
  try {
    for (let actor of actors) {
      await db('actors').insert({
        id: actor.id,
        id_link: actor.id_link,
        name: actor.name,
        timestamp: actor.timestamp
      })
    }

    console.info('[DB] Dummy `actors` data inserted')

    for (let org of orgs) {
      await db('orgs').insert({
        id: org.id,
        id_link: org.id_link,
        name: org.name,
        timestamp: org.timestamp
      })
    }

    console.info('[DB] Dummy `orgs` data inserted')

    for (let event of events) {
      await db('events').insert({
        id: event.id,
        name: event.name,
        description: event.description,
        type: event.type,
        delay: event.delay,
        category: event.category,
        data: event.data,
        timestamp: event.timestamp
      })
    }

    console.info('[DB] Dummy `events` data inserted')

    for (let subscription of subscriptions) {
      await db('subscriptions').insert({
        id: subscription.id,
        actor_id: subscription.actor_id,
        event_id: subscription.event_id,
        enabled: subscription.enabled
      })
    }

    console.info('[DB] Dummy `subscriptions` data inserted')
  }
  catch(err) {
    console.error(err.toString())
  }
})();
