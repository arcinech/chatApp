const express = require('express');
const path = require('path');
//Initial table of messages
const db = require('./messages');
const socket = require('socket.io');

const app = express();

// Listen on port 8000 or process.env.port
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io=socket(server);

//Run client on express server
app.use(express.static(path.join(__dirname, '/client/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

//Return error on non existent path
app.use((req, res) => {
  res.status(404).json({message: 'Not found...' });
});

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) =>
   { 
    console.log('Oh, I\'ve got something from ' + socket.id);
    db.messages.push(message);
    socket.broadcast.emit('message', message);
    console.log(db.messages);
    });

  socket.on('join', ({user}) => {
    console.log(user)
    console.log('User: ' + user + 'logged with id: '+ socket.id)
    db.messages.push({author: 'ChatBot', message: `User: ${user} joined chat!`});
    db.users.push({author: user, id: socket.id});
    socket.broadcast.emit('newUser', user);
  });

  socket.on('disconnect', () => {
    console.log('User with id:' + socket.id + ' disconnected');
    db.users = db.users.filter(({id, author}) => id !== socket.id);
  })
  console.log('I\'ve added a listener on message event \n');
});
