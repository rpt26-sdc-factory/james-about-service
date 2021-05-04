const path = require('path');

switch(process.env.ENVIRONMENT) {
  case 'development':
  default:
    require('dotenv').config({path: path.resolve(path.join(__dirname, '.dev.env'))});
    break;
  case 'production':
    require('dotenv').config({path: path.resolve(path.join(__dirname, '.prod.env'))});
    break;
  case 'testing':
    require('dotenv').config({path: path.resolve(path.join(__dirname, '.test.env'))});
    break;
}