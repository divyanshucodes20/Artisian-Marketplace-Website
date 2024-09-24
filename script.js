// Ensure DOM content is loaded before executing JavaScript code
document.addEventListener('DOMContentLoaded', function() {

    // Add event listener for hovering over profile picture to zoom in/out
    const profilePicture = document.querySelector('.profile-picture img');
    if (profilePicture) {
      profilePicture.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
      });
      profilePicture.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
      });
    }
  
    // Add event listener for Buy button click
    const buyButtons = document.querySelectorAll('.buy-btn');
    if (buyButtons) {
      buyButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Redirect to transaction page
          window.location.href = 'transaction.html';
        });
      });
    }
  
    // Add event listener for Review button click
    const reviewButtons = document.querySelectorAll('.review-btn');
    if (reviewButtons) {
      reviewButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Show review modal or form
          showReviewForm();
        });
      });
    }
  
    // Function to show review form
    function showReviewForm() {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Leave a Review</h2>
          <form id="review-form">
            <label for="rating">Rating:</label>
            <select id="rating" name="rating">
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
  
      // Close modal when clicking outside the modal
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
  
      // Close modal when clicking on the close button
      const closeButton = modal.querySelector('.close');
      closeButton.addEventListener('click', function() {
        modal.style.display = "none";
      });
  
      // Handle form submission
      const reviewForm = document.getElementById('review-form');
      reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        submitReview();
      });
    }
  
    // Function to submit review
    function submitReview() {
      // Simulate submitting review (in a real scenario, you would send data to the server)
      alert('Review submitted successfully!');
      // Close the modal
      const modal = document.querySelector('.modal');
      modal.style.display = "none";
    }
  
  });
  // Define an array to store cart items
let cartItems = [];

// Add event listener for Add to Cart button click
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', function() {
    // Get product details
    const product = {
      name: "Product Title", // Replace with actual product name
      image: `image${index + 1}.jpg`, // Assuming the images are named image1.jpg, image2.jpg, etc.
      price: 20.99, // Replace with actual product price
      artist: "Artisan 1", // Replace with actual artist name
      quantity: 1 // Default quantity is 1
    };
    // Add product to cartItems array
    cartItems.push(product);
    // Save cartItems array to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Change button text to "Added to Cart"
    button.textContent = 'Added to Cart';
    button.disabled = true; // Disable the button after adding to cart
    // Redirect to cart page after 1 second
    setTimeout(function() {
      window.location.href = 'cart.html';
    }, 1000);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('scroll-container'); // Corrected ID
  let scrollAmount = 1; // Adjust scroll amount
  let delay = 20; // Adjust scroll speed (milliseconds)
  let scrollInterval; // Declare scrollInterval variable

  function startScroll() {
    container.scrollLeft += scrollAmount;
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }
  }

  scrollInterval = setInterval(startScroll, delay); // Assign interval to scrollInterval variable

  container.addEventListener('mouseenter', function() {
    clearInterval(scrollInterval);
  });

  container.addEventListener('mouseleave', function() {
    scrollInterval = setInterval(startScroll, delay); // Reassign scrollInterval
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  const signinForm = document.getElementById('signin-form');
  const registerBtn = document.getElementById('register-btn');
  const signinBtn = document.getElementById('signin-btn');
  const profileBtn = document.getElementById('profile-btn');
  const profileData = {}; // Object to store user profile data

  // Show sign-up form when Register button is clicked
  registerBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showForm(signupForm);
  });

  // Handle sign-up form submission
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Get user inputs
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    // Perform sign-up process (validate inputs, create user, etc.)
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Store user data in profileData object (you can send this data to the server)
    profileData.username = username;
    profileData.email = email;
    profileData.password = password;
    // Hide sign-up form, show profile button
    hideForm(signupForm);
    profileBtn.style.display = 'block';
    // Optionally, you can clear the sign-up form inputs
    signupForm.reset();
  });

  // Show sign-in form when Sign In button is clicked
  signinBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showForm(signinForm);
  });

  // Handle sign-in form submission
  signinForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Get user inputs
    const usernameOrEmail = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
    // Perform sign-in process (validate inputs, authenticate user, etc.)
    // Here, you would typically send a request to your server to verify credentials
    // For demonstration purposes, let's assume authentication is successful
    const authenticated = true; // Replace with actual authentication logic
    if (authenticated) {
      // Hide sign-in form, show profile button
      hideForm(signinForm);
      profileBtn.style.display = 'block';
      // Optionally, you can clear the sign-in form inputs
      signinForm.reset();
    } else {
      alert('Invalid username/email or password.');
    }
  });

  // Function to show a form
  function showForm(form) {
    form.classList.add('visible');
  }

  // Function to hide a form
  function hideForm(form) {
    form.classList.remove('visible');
  }

  // Dummy function to simulate saving user profile data to server
  function saveProfileDataToServer(data) {
    // This function would typically make an AJAX request to the server to save data
    console.log('Saving user profile data to server:', data);
  }

  // Profile button functionality
  profileBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // Assuming the profile data is already filled
    console.log('User Profile:', profileData);
    // Here you can implement functionality to display and edit user profile data
    // For now, let's just save the data to the server
    saveProfileDataToServer(profileData);
  });
});
