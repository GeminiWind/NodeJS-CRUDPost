import axios from 'axios';
let io = require('socket.io-client');

let socket = io.connect('http://localhost:8080', {reconnect: true});

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
/*  $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
          url: "/chats",
          method: "post",
          data: {
              content: $('#content_chat').val()
          },
          success: function(chat) {
              var li = document.createElement('li');  // Create an element for each piece of data in the phone call object.
              var content = document.createElement('p'); 
              var sender = document.createElement('h4');  // Set the display text for each element.
              sender.textContent = 'From: ' + chat.author[0].local.email; 
              content.textContent = ' ' + chat.content;  
              li.appendChild(sender); 
              li.appendChild(content); 
              document.getElementById('chat_area').appendChild(li);
          }
      });
      return false;
  });*/