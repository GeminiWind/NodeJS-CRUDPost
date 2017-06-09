  var socket = io();
  socket.on('chat', function(chat) {  // Create a list item to add to the page.
       
      var li = document.createElement('li');  // Create an element for each piece of data in the phone call object.
       
      var content = document.createElement('p'); 
      var sender = document.createElement('h4');  // Set the display text for each element.
       
      sender.textContent = 'From: ' + chat.author; 
      content.textContent = ' ' + chat.content;  
      li.appendChild(sender); 
      li.appendChild(content); 
      // Append the new object to the #phone-calls div.
       
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