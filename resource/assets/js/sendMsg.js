import axios from 'axios';
import {
    default as swal
} from 'sweetalert2';
axios.defaults.headers.common = {
    'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content'),
};
const chatForm = document.querySelector('form');
chatForm.addEventListener('submit', event => {
    event.preventDefault();
    axios.post('/chats', {
        content: $('#content_chat').val()
    }).then(function(response) {
        let li = document.createElement('li');
        let content = document.createElement('p'); 
        let sender = document.createElement('h4');
        sender.textContent = 'From: ' + response.data.author[0].email; 
        content.textContent = ' ' + response.data.content;  
        li.appendChild(sender); 
        li.appendChild(content); 
        document.getElementById('chat_area').appendChild(li);
        $('#content_chat').empty();
    }).catch(function(error) {
        console.log(error);
        swal({
            title: "Error",
            text: "Whoops!!!Something went wrong",
            type: "error"
        });
    });
});