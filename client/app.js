//global variables
let userName = '';

//elements
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessagesForm = document.getElementById('add-messages-form');
const messageContentInput = document.getElementById('message-content');

const socket = io();

//functions
const addMessage = (user, message) => {
  console.log(user);
  const li = document.createElement('li');
  li.classList.add('message');
  li.classList.add('message--received');
  if(user === userName) li.classList.add('message--self');
  li.innerHTML = `
  <h3 class="message__author">${user === userName ? 'You' : user}</h3>
  <div class="message__content">
    ${message}
  </div>`;
  messagesList.appendChild(li);
}

//socket listeners
socket.on('message', ({author, message}) => addMessage(author, message));
socket.on('newuser', ({user}) => {
  addMessage('Chat Bot', `${user} has joined chat!`)
});

socket.on('userLeft', ({user}) => {
  addMessage('Chat Bot', `${user} has left the chat!`)
});

// Event listeners
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const loginInput = document.getElementById('username');
  if(!loginInput.value) return alert('Please enter username');
  userName=loginInput.value;
  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
  socket.emit('join', userName);
  socket.emit('newuser', username);
  loginInput.value = '';
});

addMessagesForm.addEventListener('submit', e => { 
  e.preventDefault();
  let messageContent = messageContentInput.value;
  if(!messageContent.length) return alert('Please write message');
  addMessage(userName, messageContentInput.value);
  socket.emit('message', {author: userName, message: messageContent});
  messageContentInput.value = '';
});