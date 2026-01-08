// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    setupCartEventListeners();
});

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        updateCartSummary(0, 0);
        return;
    }
    
    if (emptyCartDiv) emptyCartDiv.style.display = 'none';
    
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">
                $${itemTotal.toFixed(2)}
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateCartSummary(subtotal, 5.99); // $5.99 shipping
    updateCartCount();
}

// Setup cart event listeners
function setupCartEventListeners() {
    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const isPlus = e.target.classList.contains('plus');
            updateQuantity(productId, isPlus ? 1 : -1);
        }
        
        // Remove item
        if (e.target.closest('.remove-item')) {
            const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
            removeFromCart(productId);
        }
    });
}

// Update item quantity
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    // Remove item if quantity is 0 or less
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update cart summary
function updateCartSummary(subtotal, shipping) {
    const total = subtotal + shipping;
    
    document.getElementById('subtotal')?.textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping')?.textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total')?.textContent = `$${total.toFixed(2)}`;
}