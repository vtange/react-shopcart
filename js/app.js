window.React = require('react');
var ProductData = require('./ProductData');
var CartAPI = require('./utils/CartAPI')
var FluxCartApp = require('./components/FluxCartApp.react');

// Load Mock Product Data into localStorage in [ProductData.js]
ProductData.init();

// Load Mock API Call with [CartAPI.js]
CartAPI.getProductData();

// Render FluxCartApp Controller View
React.render(
  <FluxCartApp />,
  document.getElementById('flux-cart')
);