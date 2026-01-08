// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
        loadCartSummary();
    }
});

// Load cart summary in checkout
function loadCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('orderItems');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderItems) return;
    
    let subtotal = 0;
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        orderItems.appendChild(itemElement);
    });
    
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (orderShipping) orderShipping.textContent = `$${shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle checkout submission
function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        card: document.getElementById('card').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value
    };
    
    // In a real app, you would send this data to your server
    // For demo purposes, we'll just show a success message
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Show success message
    alert('Thank you for your order! Your leather goods will be shipped soon.');
    
    // Redirect to home page
    window.location.href = 'index.html';
}