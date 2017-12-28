require('babel-register')({
    plugins: ['transform-async-to-generator']
  });
require('./src/app.js');