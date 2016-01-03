module.exports = {
  // Load Mock Product Data Into localStorage
  init: function() {
    localStorage.clear();
    localStorage.setItem('product', JSON.stringify([
      {
        id: '0011001',
        name: 'Scotch.io Signature Lager',
        image: 'scotch-beer.png',
        description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
        variants: [
          {
            sku: '123123',
            type: '40oz Bottle',
            price: 4.99,
            inventory: 1

          },
          {
            sku: '123124',
            type: '6 Pack',
            price: 12.99,
            inventory: 5
          },
          {
            sku: '1231235',
            type: '30 Pack',
            price: 19.99,
            inventory: 3
          }
        ]
      }
    ]));
  }

};

/*
In the interests of keeping us focused on Flux & React, we will be using a mock API and mock data for our product that we are going to display. That said, writing our product data and our API similarly to the way we would work with a real API adds the benefit that we could have an easier time plugging in a real API down the road if we had wanted to.
*/

/*
As you can see above, we define a product that has options called variants. Our schema mirrors the type of data you might typically get back from a call to a restful API. We go ahead and load this data into localStorage, so that our mock API can grab that data and load it into our app.
*/

/*
See CartAPI.js how our mock API grabs our data from localStorage and then uses Flux actions to send that data to our ProductStore:
*/