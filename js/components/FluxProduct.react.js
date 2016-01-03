/*Product View

It’s time to get down to the meat and potatoes of this app, and that is our Product view. We want to take the props that got passed from our Controller View, and make a rich, interactive product display.

Lets get this party started.
*/

var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

// Flux product view
var FluxProduct = React.createClass({

  // Add item to cart via Actions
  addToCart: function(event){
    var sku = this.props.selected.sku;
    var update = {
      name: this.props.product.name,
      type: this.props.selected.type,
      price: this.props.selected.price
    }
    FluxCartActions.addToCart(sku, update);
    FluxCartActions.updateCartVisible(true);
  },

  // Select product variation via Actions
  selectVariant: function(event){
    FluxCartActions.selectProduct(event.target.value);
  },

/*
Prior to our render method, we define Action methods that we bind to elements in our component. By importing our Actions, we can then call them from these methods, and kick off the update process:

    selectProduct – Sets which product option is currently selected
    addToCart – Adds the currently selected product to the cart and opens the cart

Inside of our render method, we calculate how many units of the selected product are available to sell (ats) by checking how many are in the cart vs the selected products inventory. We use this to toggle the “Add To Cart” button’s state.
*/
	
  // Render product View
  render: function() {
    var ats = (this.props.selected.sku in this.props.cartitems) ?
      this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity :
      this.props.selected.inventory;
    return (
      <div className="flux-product">
        <img src={'img/' + this.props.product.image}/>
        <div className="flux-product-detail">
          <h1 className="name">{this.props.product.name}</h1>
          <p className="description">{this.props.product.description}</p>
          <p className="price">Price: ${this.props.selected.price}</p>
          <select onChange={this.selectVariant}>
            {this.props.product.variants.map(function(variant, index){
              return (
                <option key={index} value={index}>{variant.type}</option>
              )
            })}
          </select>
          <button type="button" onClick={this.addToCart} disabled={ats  > 0 ? '' : 'disabled'}>
            {ats > 0 ? 'Add To Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    );
  },

});

module.exports = FluxProduct;
