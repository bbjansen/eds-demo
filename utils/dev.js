// Copyright (c) 2020, BB Jansen
//
// Please see the included LICENSE file for more information.
'use strict'

require('dotenv').config('../')

require('./nuke')

setTimeout(function(){ 
  require('./dummy/db_data')
}, 2000)

setTimeout(function(){ 
  require('./dummy/rabbitmq_data')
}, 4000)