// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.
'use strict'

const db = require('../../libs').knex

// Create 'actors' table if it does not exist
db.schema.hasTable('actors').then(function (exists) {
  if (!exists) {
    console.info('[DB] Table `actors` created')

    return db.schema.createTable('actors', function (table) {
      table.integer('id').primary().notNullable()
      table.bigInteger('id_link').notNullable()
      table.string('name').notNullable()
      table.bigInteger('timestamp').notNullable()
    })
  }
})

// Create 'orgs' table if it does not exist
db.schema.hasTable('orgs').then(function (exists) {
  if (!exists) {
    console.info('[DB] Table `orgs` created')

    return db.schema.createTable('orgs', function (table) {
      table.integer('id').primary().notNullable()
      table.bigInteger('id_link').notNullable()
      table.string('name').notNullable()
      table.bigInteger('timestamp').notNullable()
    })
  }
})

// Create 'events' table if it does not exist
db.schema.hasTable('events').then(function (exists) {
  if (!exists) {
    console.info('[DB] Table `events` created')

    return db.schema.createTable('events', function (table) {
      table.integer('id').primary().notNullable()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('type').notNullable()
      table.integer('delay').nullable()
      table.string('category').notNullable()
      table.json('data').nullable()
      table.bigInteger('timestamp').notNullable()
    })
  }
})

// Create 'subscriptions' table if it does not exist
db.schema.hasTable('subscriptions').then(function (exists) {
  if (!exists) {
    console.info('[DB] Table `subscriptions` created')

    return db.schema.createTable('subscriptions', function (table) {
      table.integer('id').primary().notNullable()
      table.integer('actor_id').notNullable()
      table.integer('event_id').notNullable()
      table.boolean('enabled').notNullable()
    })
  }
})