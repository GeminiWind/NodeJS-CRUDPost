var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080');
socket.on('chat', function(chat) {
    let li = document.createElement('li');
    let content = document.createElement('p'); 
    let sender = document.createElement('h4');
    sender.textContent = 'From: ' + chat.author; 
    content.textContent = ' ' + chat.content;  
    li.appendChild(sender); 
    li.appendChild(content); 
    document.getElementById('chat_area').appendChild(li);
});
