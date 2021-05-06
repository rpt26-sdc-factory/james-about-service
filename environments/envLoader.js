const path = require('path');

switch(process.env.NODE_ENV) {
  case 'development':
  default:
    require('dotenv').config({path: path.resolve(path.join(__dirname, '.dev.env'))});
    break;
  case 'production':
    require('dotenv').config({path: path.resolve(path.join(__dirname, '.prod.env'))});
    break;
  case 'test':
    require('dotenv').config({path: path.resolve(path.join(__dirname, '.test.env'))});
    break;
}