const express = require('express');
const session = require("express-session");
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// // Import socket for chat messaging feature
// const socket = require('socket.io');
// const bcrypt = require('bcrypt');
// saltRounds = 10;

// Create a new Express application (web server)
const app = express();

// API for our database models
const Image = require('./models/Image');

// Set the port based on the environment variable (PORT=8080 node server.js)
// and fallback to 4567
const PORT = process.env.PORT || 4567;

// ALL APP.USE
// Needed for Heroku
app.use('/static', express.static('build/static'));
app.use(jsonParser);

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(
  session({
    secret: "troys super secret password",
    resave: false,
    saveUninitialized: true
  })
);

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.get('/.json', (request, response) => {
    Promise.all([
      Image.all()
    ])
    .then(([images]) => {
      console.log(`about to render api`)
      response.json({
        images: images
      });
    });
});

app.get('/max', (request, response) => {
  Image.max()
  .then((image) => {
    console.log(`about to render api`)
    response.json({
      max: image
    });
  });
});

// Start the web server listening on the provided port.
const server = app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});

// // Socket/Chat functions must be after app.listen
// const io = socket(server);

// io.on('connection', (socket) => {
//   console.log(socket.id);
//   socket.on('SEND_MESSAGE', (data) => {
//     io.emit('RECEIVE_MESSAGE', data);
//   });
//   socket.on('disconnect', (socket) => {
//     console.log('user disconnected')
//   });
// });