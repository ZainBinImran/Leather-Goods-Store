// Sample products data
const products = [
    {
        id: 1,
        name: "Classic Leather Belt",
        category: "belts",
        price: 49.99,
        image: "images/products/belt1.jpg",
        description: "Handcrafted full-grain leather belt with stainless steel buckle."
    },
    {
        id: 2,
        name: "Minimalist Wallet",
        category: "wallets",
        price: 39.99,
        image: "images/products/wallet1.jpg",
        description: "Slim leather wallet with multiple card slots and cash compartment."
    },
    {
        id: 3,
        name: "Braided Leather Belt",
        category: "belts",
        price: 59.99,
        image: "images/products/belt2.jpg",
        description: "Elegant braided leather belt for formal occasions."
    },
    {
        id: 4,
        name: "Bifold Leather Wallet",
        category: "wallets",
        price: 45.99,
        image: "images/products/wallet2.jpg",
        description: "Classic bifold wallet with premium leather finish."
    },
    {
        id: 5,
        name: "Western Style Belt",
        category: "belts",
        price: 69.99,
        image: "images/products/belt1.jpg",
        description: "Western-inspired leather belt with decorative buckle."
    },
    {
        id: 6,
        name: "Passport Holder",
        category: "wallets",
        price: 34.99,
        image: "images/products/wallet1.jpg",
        description: "Leather passport holder with travel card slots."
    },
    {
        id: 7,
        name: "Reversible Belt",
        category: "belts",
        price: 54.99,
        image: "images/products/belt2.jpg",
        description: "Two-tone reversible leather belt for versatile styling."
    },
    {
        id: 8,
        name: "Money Clip Wallet",
        category: "wallets",
        price: 42.99,
        image: "images/products/wallet2.jpg",
        description: "Modern wallet with integrated money clip."
    }
];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    
    if (productsContainer) {
        displayProducts(products);
        setupFilters();
        setupSorting();
    }
    
    // Add to cart buttons functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
});

// Display products
function displayProducts(productsArray) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
        `;
        
        container.appendChild(productCard);
    });
}

// Filter products by category
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            let filteredProducts;
            
            if (filter === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => product.category === filter);
            }
            
            displayProducts(filteredProducts);
        });
    });
}

// Sort products
function setupSorting() {
    const sortSelect = document.querySelector('.sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedProducts = [...products];
            
            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    // Keep original order
                    break;
            }
            
            displayProducts(sortedProducts);
        });
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);