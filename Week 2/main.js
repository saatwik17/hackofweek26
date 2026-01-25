// Restaurant Menu Website - Main JavaScript
// Comprehensive menu data and interactive functionality

// Menu Data with realistic Indian pricing
const menuData = [
    // Burgers
    {
        id: 1,
        name: "McAloo Tikki Burger",
        category: "burgers",
        type: "veg",
        price: 45,
        image: "resources/fries-1.jpg",
        description: "Crispy potato patty with special sauce in a soft bun",
        popular: true,
        new: false
    },
    {
        id: 2,
        name: "McSpicy Chicken Burger",
        category: "burgers",
        type: "non-veg",
        price: 161,
        image: "resources/chicken-1.jpg",
        description: "Spicy chicken patty with lettuce and zesty mayo",
        popular: true,
        new: false
    },
    {
        id: 3,
        name: "McVeggie Burger",
        category: "burgers",
        type: "veg",
        price: 102,
        image: "resources/fries-2.jpg",
        description: "Mixed vegetable patty with fresh lettuce and mayo",
        popular: false,
        new: false
    },
    {
        id: 4,
        name: "Chicken Maharaja Mac",
        category: "burgers",
        type: "non-veg",
        price: 201,
        image: "resources/chicken-2.jpg",
        description: "Double chicken patty with special Maharaja sauce",
        popular: true,
        new: false
    },
    {
        id: 5,
        name: "McSpicy Paneer Burger",
        category: "burgers",
        type: "veg",
        price: 156,
        image: "resources/fries-3.jpg",
        description: "Spicy paneer patty with creamy sauce and lettuce",
        popular: false,
        new: true
    },
    {
        id: 6,
        name: "American Cheese Supreme",
        category: "burgers",
        type: "non-veg",
        price: 132,
        image: "resources/chicken-3.jpg",
        description: "Chicken patty with American cheese and signature sauce",
        popular: false,
        new: false
    },
    
    // Pizza
    {
        id: 7,
        name: "Margherita Pizza",
        category: "pizza",
        type: "veg",
        price: 199,
        image: "resources/pizza-1.jpg",
        description: "Classic cheese and tomato pizza with herbs",
        popular: true,
        new: false
    },
    {
        id: 8,
        name: "Pepperoni Pizza",
        category: "pizza",
        type: "non-veg",
        price: 399,
        image: "resources/pizza-2.jpg",
        description: "Classic pepperoni with mozzarella cheese",
        popular: true,
        new: false
    },
    {
        id: 9,
        name: "Veggie Supreme Pizza",
        category: "pizza",
        type: "veg",
        price: 459,
        image: "resources/pizza-1.jpg",
        description: "Loaded with fresh vegetables and cheese",
        popular: false,
        new: false
    },
    {
        id: 10,
        name: "Chicken Tikka Pizza",
        category: "pizza",
        type: "non-veg",
        price: 479,
        image: "resources/pizza-2.jpg",
        description: "Tandoori chicken tikka with Indian spices",
        popular: true,
        new: true
    },
    {
        id: 11,
        name: "Peppy Paneer Pizza",
        category: "pizza",
        type: "veg",
        price: 399,
        image: "resources/pizza-1.jpg",
        description: "Paneer cubes with spicy seasonings",
        popular: false,
        new: false
    },
    {
        id: 12,
        name: "Non-Veg Supreme Pizza",
        category: "pizza",
        type: "non-veg",
        price: 579,
        image: "resources/pizza-2.jpg",
        description: "Loaded with chicken, pepperoni, and sausage",
        popular: false,
        new: false
    },
    
    // Sides
    {
        id: 13,
        name: "French Fries",
        category: "sides",
        type: "veg",
        price: 56,
        image: "resources/fries-1.jpg",
        description: "Crispy golden fries, lightly salted",
        popular: true,
        new: false
    },
    {
        id: 14,
        name: "Chicken McNuggets (6 pcs)",
        category: "sides",
        type: "non-veg",
        price: 159,
        image: "resources/chicken-1.jpg",
        description: "Crispy chicken nuggets with dipping sauce",
        popular: true,
        new: false
    },
    {
        id: 15,
        name: "Garlic Bread",
        category: "sides",
        type: "veg",
        price: 149,
        image: "resources/fries-2.jpg",
        description: "Warm garlic bread with herbs and butter",
        popular: false,
        new: false
    },
    {
        id: 16,
        name: "Chicken Wings (6 pcs)",
        category: "sides",
        type: "non-veg",
        price: 199,
        image: "resources/chicken-2.jpg",
        description: "Spicy baked chicken wings",
        popular: true,
        new: true
    },
    {
        id: 17,
        name: "Cheese Garlic Bread",
        category: "sides",
        type: "veg",
        price: 179,
        image: "resources/fries-3.jpg",
        description: "Garlic bread topped with melted cheese",
        popular: false,
        new: false
    },
    {
        id: 18,
        name: "Veg Pizza McPuff",
        category: "sides",
        type: "veg",
        price: 69,
        image: "resources/fries-1.jpg",
        description: "Crispy puff with vegetable filling",
        popular: false,
        new: false
    },
    
    // Beverages
    {
        id: 19,
        name: "Coca Cola",
        category: "beverages",
        type: "veg",
        price: 73,
        image: "resources/beverages-1.jpg",
        description: "Chilled Coca Cola soft drink",
        popular: true,
        new: false
    },
    {
        id: 20,
        name: "Chocolate Shake",
        category: "beverages",
        type: "veg",
        price: 141,
        image: "resources/beverages-2.jpg",
        description: "Rich and creamy chocolate milkshake",
        popular: true,
        new: false
    },
    {
        id: 21,
        name: "Strawberry Shake",
        category: "beverages",
        type: "veg",
        price: 141,
        image: "resources/beverages-3.jpg",
        description: "Fresh strawberry milkshake",
        popular: false,
        new: false
    },
    {
        id: 22,
        name: "Mango Smoothie",
        category: "beverages",
        type: "veg",
        price: 233,
        image: "resources/beverages-1.jpg",
        description: "Refreshing mango smoothie",
        popular: true,
        new: true
    },
    {
        id: 23,
        name: "Iced Coffee",
        category: "beverages",
        type: "veg",
        price: 157,
        image: "resources/beverages-2.jpg",
        description: "Chilled coffee with ice",
        popular: false,
        new: false
    },
    {
        id: 24,
        name: "Lemon Ice Tea",
        category: "beverages",
        type: "veg",
        price: 145,
        image: "resources/beverages-3.jpg",
        description: "Refreshing lemon flavored iced tea",
        popular: false,
        new: false
    },
    
    // Desserts
    {
        id: 25,
        name: "McFlurry Oreo",
        category: "desserts",
        type: "veg",
        price: 105,
        image: "resources/beverages-1.jpg",
        description: "Soft serve with Oreo cookie pieces",
        popular: true,
        new: false
    },
    {
        id: 26,
        name: "Chocolate Lava Cake",
        category: "desserts",
        type: "veg",
        price: 129,
        image: "resources/beverages-2.jpg",
        description: "Warm chocolate cake with gooey center",
        popular: true,
        new: true
    },
    {
        id: 27,
        name: "Soft Serve Hot Fudge",
        category: "desserts",
        type: "veg",
        price: 81,
        image: "resources/beverages-3.jpg",
        description: "Vanilla soft serve with hot fudge",
        popular: false,
        new: false
    },
    {
        id: 28,
        name: "Choco Truffle Cake",
        category: "desserts",
        type: "veg",
        price: 89,
        image: "resources/beverages-1.jpg",
        description: "Rich chocolate truffle cake",
        popular: false,
        new: false
    }
];

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentSort = 'popular';
let filteredMenu = [...menuData];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartPanel = document.getElementById('cart-panel');
const cartOverlay = document.getElementById('cart-overlay');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const resultsCount = document.getElementById('results-count');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeTypewriter();
    initializeSlider();
    initializeCategoryButtons();
    initializeCart();
    initializeSearch();
    initializeSort();
    initializeScrollAnimations();
    initializePopularChart();
    
    // Render initial content
    renderMenu();
    renderCart();
    renderPopularItems();
    
    // Initialize particle background
    initializeParticles();
    
    console.log('Tasty Delights Menu System Initialized');
}

// Typewriter Effect for Hero
function initializeTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Welcome to Tasty Delights',
            'Delicious Food Awaits',
            'Order Your Favorites',
            'Fast & Fresh Delivery'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Featured Items Slider
function initializeSlider() {
    const splide = new Splide('#featured-slider', {
        type: 'loop',
        perPage: 4,
        perMove: 1,
        gap: '1rem',
        autoplay: true,
        interval: 3000,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 2,
            },
            480: {
                perPage: 1,
            }
        }
    });
    splide.mount();
}

// Category Filter Buttons
function initializeCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.dataset.category;
            
            // Filter and render menu
            filterMenu();
            renderMenu();
            
            // Animate button click
            anime({
                targets: this,
                scale: [0.95, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Cart Functionality
function initializeCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Checkout functionality coming soon! Thank you for your order.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
            closeCart();
        }
    });
}

function openCart() {
    cartPanel.classList.add('open');
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartPanel.classList.remove('open');
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function addToCart(itemId, quantity = 1) {
    const item = menuData.find(item => item.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
    
    // Success animation
    anime({
        targets: `#item-${itemId}`,
        scale: [1, 1.05, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Show success message
    showNotification(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateCartQuantity(itemId, quantity) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <svg class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                </svg>
                <p>Your cart is empty</p>
                <p class="text-sm mt-2">Add some delicious items to get started!</p>
            </div>
        `;
        cartTotal.textContent = '₹0';
        document.getElementById('checkout-btn').disabled = true;
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="flex items-center space-x-4 py-4 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1">
                    <h4 class="font-semibold text-sm">${item.name}</h4>
                    <p class="text-gray-600 text-xs">₹${item.price}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">-</button>
                    <span class="w-8 text-center font-medium">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `₹${total}`;
    document.getElementById('checkout-btn').disabled = false;
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.classList.add('cart-badge');
    } else {
        cartCount.classList.remove('cart-badge');
    }
}

// Search Functionality
function initializeSearch() {
    searchInput.addEventListener('input', function() {
        filterMenu();
        renderMenu();
    });
}

// Sort Functionality
function initializeSort() {
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        sortMenu();
        renderMenu();
    });
}

// Menu Filtering and Sorting
function filterMenu() {
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredMenu = menuData.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                             item.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    sortMenu();
    resultsCount.textContent = filteredMenu.length;
}

function sortMenu() {
    switch (currentSort) {
        case 'price-low':
            filteredMenu.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredMenu.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'popular':
        default:
            filteredMenu.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
            break;
    }
}

// Menu Rendering
function renderMenu() {
    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="h-24 w-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0a7.962 7.962 0 016 2.562M9 6.306a7.962 7.962 0 00-6 2.562"></path>
                </svg>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
                <p class="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    menuGrid.innerHTML = filteredMenu.map(item => `
        <div id="item-${item.id}" class="menu-card bg-white rounded-xl shadow-lg overflow-hidden reveal">
            <div class="relative">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                <div class="absolute top-3 left-3 flex space-x-2">
                    ${item.popular ? '<span class="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">⭐ Popular</span>' : ''}
                    ${item.new ? '<span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">🆕 New</span>' : ''}
                    <span class="${item.type === 'veg' ? 'veg-badge' : 'non-veg-badge'} text-xs px-2 py-1 rounded-full font-medium">
                        ${item.type === 'veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-display text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${item.description}</p>
                <div class="flex justify-between items-center">
                    <span class="price-tag px-3 py-1 rounded-full text-sm font-accent">₹${item.price}</span>
                    <div class="flex items-center space-x-2">
                        <input type="number" min="1" max="10" value="1" class="w-16 px-2 py-1 border border-gray-300 rounded text-center" id="qty-${item.id}">
                        <button onclick="addToCart(${item.id}, document.getElementById('qty-${item.id}').value)" class="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Animate menu items
    anime({
        targets: '.menu-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuad'
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Popular Items Chart
function initializePopularChart() {
    const chartDom = document.getElementById('popular-chart');
    const myChart = echarts.init(chartDom);
    
    const popularItems = menuData
        .filter(item => item.popular)
        .sort((a, b) => b.price - a.price)
        .slice(0, 8);
    
    const option = {
        title: {
            text: 'Most Popular Items',
            left: 'center',
            textStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: '#2C2C2C'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                const data = params[0];
                return `${data.name}<br/>Price: ₹${data.value}<br/>Category: ${data.data.category}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: popularItems.map(item => item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name),
            axisLabel: {
                rotate: 45,
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            name: 'Price (₹)',
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        series: [{
            name: 'Price',
            type: 'bar',
            data: popularItems.map(item => ({
                value: item.price,
                category: item.category,
                itemStyle: {
                    color: item.type === 'veg' ? '#4A7C59' : '#C41E3A'
                }
            })),
            barWidth: '60%',
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    
    myChart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// Render Popular Items
function renderPopularItems() {
    const popularItems = menuData.filter(item => item.popular);
    const popularGrid = document.getElementById('popular-grid');
    
    popularGrid.innerHTML = popularItems.map(item => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden reveal">
            <div class="relative">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                <div class="absolute top-3 left-3">
                    <span class="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">⭐ Popular</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-display text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                <div class="flex justify-between items-center">
                    <span class="price-tag px-3 py-1 rounded-full text-sm font-accent">₹${item.price}</span>
                    <button onclick="addToCart(${item.id})" class="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Particle Background Effect
function initializeParticles() {
    // Simple particle effect using CSS animations
    const particleContainer = document.getElementById('particle-bg');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(212, 165, 116, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;

// Initialize cart count on load
updateCartCount();