/*Controller View

Our Controller View is our top level component that listens for changes on our stores and then updates our application’s state by calling our Store’s public methods. This state is then passed down to child components via props.

The Controller View is responsible for:

    Setting our applications state by calling Store’s public methods
    Composing child components and passing state properties via props
    Listening for Store’s change events
*/

var React = require('react');
var CartStore = require('../stores/CartStore');
var ProductStore = require('../stores/ProductStore');
var FluxProduct = require('./FluxProduct.react');
var FluxCart = require('./FluxCart.react');

// Method to retrieve state from Stores
function getCartState() {
  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}


/*
We start by creating a public method called getCartState. We use this method to call public methods on Stores to retrieve their current state and set our applications state with the results. We call this method first during the getInitialState method, and also when a Store’s change event is received.
*/


// Define main Controller View
var FluxCartApp = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getCartState();
  },

/*  In order to receive these change events, we add listeners on our Stores during the mounting process, so that we know when they change. We remove these events when/if our component is unmounted.  */	
	
  // Add change listeners to stores
  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  },

/*  In our render method, we compose our component using the FluxCart and FluxProduct components. Here, we pass our state props down to them using component properties, or props.  */
	
  // Render our child components, passing state via props
  render: function() {
    return (
      <div className="flux-cart-app">
        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getCartState());
  }

});

module.exports = FluxCartApp;
