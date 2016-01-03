/*
Stores

Now that we have our Actions defined, it is time to create our Stores. Each Store manages application state for a domain within an application, so we are going to create one for our product and one for our cart. Let’s start with our ProductStore:
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

// Define initial data points
var _product = {}, _selected = null;

// Method to load product data from mock API
function loadProductData(data) {
  _product = data[0];
  _selected = data[0].variants[0];
}

// Method to set the currently selected product variation
function setSelected(index) {
  _selected = _product.variants[index];
}

/*-----------------------
Above, we define two private methods, loadProductData and setSelected. We use loadProductData to, unsurprisingly, load our mock product data into our _product object. Our setSelected method is used to set which product variant is currently selected.
-----------------------*/
/*----------------------
We expose this data using the public methods getProduct and getSelected, which return their respective internal objects. 
These methods can be called after require‘ing our Store within a view.

|
v
------------------------*/

// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getProduct: function() {
    return _product;
  },

  // Return selected Product
  getSelected: function(){
    return _selected;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

/*----------------------
Lastly, we register a callback to our AppDispatcher that uses a switch statement to determine if the supplied payload matches an action we want to respond to. In the event that it does, we call our private methods with the supplied action data, and fire a change event, forcing our view to retrieve the new state and update its display.
-----------------------*/

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case FluxCartConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;

    // Respond to SELECT_PRODUCT action
    case FluxCartConstants.SELECT_PRODUCT:
      setSelected(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ProductStore.emitChange();

  return true;

});

module.exports = ProductStore;
