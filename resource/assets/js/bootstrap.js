
window.$ = window.jQuery = require('jquery');

require('bootstrap');

window.axios = require('axios');

window.axios.defaults.headers.common = {
     'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content'),
};


let io = require('socket.io-client');
window.socket = io.connect('http://localhost:8080');