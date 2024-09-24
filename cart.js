document.addEventListener('DOMContentLoaded', function() {
  const cartItemsSection = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');

  // Load cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Display cart items
  function displayCartItems() {
    cartItemsSection.innerHTML = '';
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
      cartItemsSection.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="Product Image">
          <h3>${item.name}</h3>
          <p>Artist: ${item.artist}</p>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="remove-from-cart-btn" data-index="${cartItems.indexOf(item)}">Remove from Cart</button>
        </div>
      `;
    });
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  displayCartItems();

  // Handle checkout button click
  const checkoutButton = document.getElementById('checkout-btn');
  checkoutButton.addEventListener('click', function() {
    // Perform checkout process (e.g., redirect to payment page)
    window.location.href = 'transaction.html';
    // Clear the cart after payment
    clearCart();
  });

  // Function to clear the cart after payment
  function clearCart() {
    cartItems = [];
    localStorage.removeItem('cartItems');
    displayCartItems(); // Update the cart display
  }

  // Add event listener to remove from cart buttons
  cartItemsSection.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart-btn')) {
      const itemIndex = parseInt(event.target.dataset.index);
      cartItems.splice(itemIndex, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      displayCartItems(); // Update the cart display
    }
  });

});

// Add event listener for Add to Cart button click
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', function() {
    const product = {
      name: "Product Title", // Replace with actual product name
      image: `image1.jpg`, // Assuming the images are named image1.jpg, image2.jpg, etc.
      price: 20.99, // Replace with actual product price
      artist: "Artisan 1", // Replace with actual artist name
      quantity: 1
    };
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Update the cart display
  });
});
