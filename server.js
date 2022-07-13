const express = require('express');
const path = require('path');
//Initial table of messages
const messages = require('./messages');

const app = express();

//Run client on express server
app.use(express.static(path.join(__dirname, '/client/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

//Return error on non existent path
app.use((req, res) => {
  res.status(404).json({message: 'Not found...' });
});

// Listen on port 8000 or process.env.port
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});