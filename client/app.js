//global variables
let userName = '';

//elements
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessagesForm = document.getElementById('add-messages-form');
const messageContentInput = document.getElementById('message-content');

//functions
const addMessage = (user, message) => {
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

// Event listeners
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const loginInput = document.getElementById('username').value;
  if(!loginInput) return alert('Please enter username');

  userName = loginInput.value;
  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
});

addMessagesForm.addEventListener('submit', e => { 
  e.preventDefault();
  console.log(messageContentInput);
  if(!messageContentInput.value) return alert('Please write message');
  addMessage(userName, messageContentInput.value);
})