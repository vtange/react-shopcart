var Dispatcher = require('flux').Dispatcher;

// Create dispatcher instance
var AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = AppDispatcher;

/*Dispatcher

Since we are using the Flux architecture for this application, we are going to need to create our own instance of Facebook’s Dispatcher library. We also add a handleAction helper method to our Dispatcher instance, so that we can identify where this action came from.

While this isn’t explicitly required for our current application, if we wanted to hook into a real API or handle actions from places other than views, it is nice to have this architecture in place if we needed to handle those actions differently than those that originated from views.
*/

/*
In our handleAction method, we receive an action from an action creator and then have our Dispatcher dispatch the action with a source property and the action that was supplied as an argument.
*/