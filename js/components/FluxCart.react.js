/*Cart View

Gotta have a cart. So lets put one together. In our app, when a product is added to the cart, a single line item represents the selected option. The quantity of that option can be increased, but it won’t create new line items. Instead, the quantity being purchased is displayed and the line item’s price adjusts accordingly.

Let’s make this happen:
*/

var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

// Flux cart view
var FluxCart = React.createClass({

  // Hide cart via Actions
  closeCart: function(){
    FluxCartActions.updateCartVisible(false);
  },

  // Show cart via Actions
  openCart: function(){
    FluxCartActions.updateCartVisible(true);
  },

  // Remove item from Cart via Actions
  removeFromCart: function(sku){
    FluxCartActions.removeFromCart(sku);
    FluxCartActions.updateCartVisible(false);
  },

  // Render cart view
  render: function() {
    var self = this, products = this.props.products;
    return (
      <div className={"flux-cart " + (this.props.visible ? 'active' : '')}>
        <div className="mini-cart">
          <button type="button" className="close-cart" onClick={this.closeCart}>×</button>
          <ul>
            {Object.keys(products).map(function(product){
              return (
                <li key={product}>
                  <h1 className="name">{products[product].name}</h1>
                  <p className="type">{products[product].type} x {products[product].quantity}</p>
                  <p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
                  <button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
                </li>
              )
            })}
          </ul>
          <span className="total">Total: ${this.props.total}</span>
        </div>
        <button type="button" className="view-cart" onClick={this.openCart} disabled={Object.keys(this.props.products).length > 0 ? "" : "disabled"}>View Cart ({this.props.count})</button>
      </div>
    );
  },

});

module.exports = FluxCart;

/*And now we have a cart! Our cart component has three event methods:

    closeCart – Close the cart
    openCart – Opens the cart
    removeFromCart – Removes item from the cart and closes the cart

When rendering our cart, we use the map method to render out our line items. Notice on the <li> tag, we added the key attribute. This is a special attribute used when adding dynamic children to a component. It is used internally in React to uniquely identify said children, so that they retain the proper order and state during reconciliation. If you remove this and open your console, you can see that React will throw a warning telling you that key hasn’t been set, and you will likely experience rendering anomalies.

For our cart’s hide and show functionality, all that we are doing is adding and removing an active class, and letting CSS do the rest.
*/