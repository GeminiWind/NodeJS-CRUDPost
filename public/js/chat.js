/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var socket = io();
socket.on('chat', function (chat) {
    // Create a list item to add to the page.

    var li = document.createElement('li'); // Create an element for each piece of data in the phone call object.

    var content = document.createElement('p');
    var sender = document.createElement('h4'); // Set the display text for each element.

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDk2MjEwMjQyYTdkYjUzZTE2M2E/NDkxNyoqKiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZS9qcy9jaGF0LmpzIl0sIm5hbWVzIjpbInNvY2tldCIsImlvIiwib24iLCJjaGF0IiwibGkiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZW50Iiwic2VuZGVyIiwidGV4dENvbnRlbnQiLCJhdXRob3IiLCJhcHBlbmRDaGlsZCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEVFLElBQUlBLFNBQVNDLElBQWI7QUFDQUQsT0FBT0UsRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBU0MsSUFBVCxFQUFlO0FBQUc7O0FBRWhDLFFBQUlDLEtBQUtDLFNBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVCxDQUY2QixDQUVXOztBQUV4QyxRQUFJQyxVQUFVRixTQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQWQ7QUFDQSxRQUFJRSxTQUFTSCxTQUFTQyxhQUFULENBQXVCLElBQXZCLENBQWIsQ0FMNkIsQ0FLZTs7QUFFNUNFLFdBQU9DLFdBQVAsR0FBcUIsV0FBV04sS0FBS08sTUFBckM7QUFDQUgsWUFBUUUsV0FBUixHQUFzQixNQUFNTixLQUFLSSxPQUFqQztBQUNBSCxPQUFHTyxXQUFILENBQWVILE1BQWY7QUFDQUosT0FBR08sV0FBSCxDQUFlSixPQUFmO0FBQ0E7O0FBRUFGLGFBQVNPLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNELFdBQXJDLENBQWlEUCxFQUFqRDtBQUNILENBZEQ7QUFlRiIsImZpbGUiOiJqcy9jaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ5NjIxMDI0MmE3ZGI1M2UxNjNhIiwiICB2YXIgc29ja2V0ID0gaW8oKTtcbiAgc29ja2V0Lm9uKCdjaGF0JywgZnVuY3Rpb24oY2hhdCkge8KgIC8vIENyZWF0ZSBhIGxpc3QgaXRlbSB0byBhZGQgdG8gdGhlIHBhZ2UuXG4gICAgICDCoFxuICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTvCoCAvLyBDcmVhdGUgYW4gZWxlbWVudCBmb3IgZWFjaCBwaWVjZSBvZiBkYXRhIGluIHRoZSBwaG9uZSBjYWxsIG9iamVjdC5cbiAgICAgIMKgXG4gICAgICB2YXIgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTvCoFxuICAgICAgdmFyIHNlbmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7wqAgLy8gU2V0IHRoZSBkaXNwbGF5IHRleHQgZm9yIGVhY2ggZWxlbWVudC5cbiAgICAgIMKgXG4gICAgICBzZW5kZXIudGV4dENvbnRlbnQgPSAnRnJvbTogJyArIGNoYXQuYXV0aG9yO8KgXG4gICAgICBjb250ZW50LnRleHRDb250ZW50ID0gJyAnICsgY2hhdC5jb250ZW50O8KgwqBcbiAgICAgIGxpLmFwcGVuZENoaWxkKHNlbmRlcik7wqBcbiAgICAgIGxpLmFwcGVuZENoaWxkKGNvbnRlbnQpO8KgXG4gICAgICAvLyBBcHBlbmQgdGhlIG5ldyBvYmplY3QgdG8gdGhlICNwaG9uZS1jYWxscyBkaXYuXG4gICAgICDCoFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXRfYXJlYScpLmFwcGVuZENoaWxkKGxpKTtcbiAgfSk7XG4vKiAgJCgnZm9ybScpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICAgIHVybDogXCIvY2hhdHNcIixcbiAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgY29udGVudDogJCgnI2NvbnRlbnRfY2hhdCcpLnZhbCgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihjaGF0KSB7XG4gICAgICAgICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7wqAgLy8gQ3JlYXRlIGFuIGVsZW1lbnQgZm9yIGVhY2ggcGllY2Ugb2YgZGF0YSBpbiB0aGUgcGhvbmUgY2FsbCBvYmplY3QuXG4gICAgICAgICAgICAgIHZhciBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO8KgXG4gICAgICAgICAgICAgIHZhciBzZW5kZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO8KgIC8vIFNldCB0aGUgZGlzcGxheSB0ZXh0IGZvciBlYWNoIGVsZW1lbnQuXG4gICAgICAgICAgICAgIHNlbmRlci50ZXh0Q29udGVudCA9ICdGcm9tOiAnICsgY2hhdC5hdXRob3JbMF0ubG9jYWwuZW1haWw7wqBcbiAgICAgICAgICAgICAgY29udGVudC50ZXh0Q29udGVudCA9ICcgJyArIGNoYXQuY29udGVudDvCoMKgXG4gICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKHNlbmRlcik7wqBcbiAgICAgICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoY29udGVudCk7wqBcbiAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXRfYXJlYScpLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfSk7Ki9cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZS9qcy9jaGF0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==