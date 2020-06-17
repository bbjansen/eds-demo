# Event Delivery System Demo
> A simple implementation of a event delivery system (EDS) using RabbitMQ.
## Requirements
- Node.js v8+
- [knex.js]('https://knexjs.org) supported database (MySQL tested only)
- [RabbitMQ](https://www.rabbitmq.com/) 3.6+ with Erlang 20+
- [RabbitMQ Delayed Message Exchange Plugin](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange)


## Bootstrap
1. Setup a database
2. Setup .env (see example below)
3. Run `node ./utils/dev.js` (bootstart)
3. Run ``npm run start``

## .env example
```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASS=
DB_NAME=

RABBITMQ_HOST=localhost
RABBITMQ_USER=
RABBITMQ_PASS=

DEBUG=0
```