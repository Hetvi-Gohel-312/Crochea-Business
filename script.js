/*Hero Animations*/
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
  animatedText.innerHTML = `<span>Stylish Blinds Stylish Blinds Stylish Blinds </span>`;
}

// Example: Log the products to the console
console.log(products);


// Shopping Cart Management
class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartUI();
  }

  loadCart() {
    const saved = localStorage.getItem('CrocheaShoppingCart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('CrocheaShoppingCart', JSON.stringify(this.items));
  }

  addItem(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity: quantity
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showNotification(`${product.name} added to cart!`, 'success');
  }

  removeItem(productId) {
    const product = this.items.find(item => item.id === productId);
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
    if (product) {
      this.showNotification(`${product.name} removed from cart!`, 'info');
    }
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartUI();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartUI() {
    // Update cart badges
    const cartBadges = document.querySelectorAll('.cart-badge, .cart-count');
    const itemCount = this.getItemCount();
    
    cartBadges.forEach(badge => {
      badge.textContent = itemCount;
      badge.style.display = itemCount > 0 ? 'inline-block' : 'none';
    });

    // Update cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
      this.renderCartPage();
    }

    // Update checkout page if we're on it
    if (window.location.pathname.includes('checkout.html')) {
      this.renderCheckoutSummary();
    }
  }

  renderCartPage() {
    const cartContent = document.getElementById('cart-content');
    const cartEmpty = document.getElementById('cart-empty');
    
    if (!cartContent) return;

    if (this.items.length === 0) {
      cartContent.style.display = 'none';
      if (cartEmpty) cartEmpty.style.display = 'block';
      return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';
    cartContent.style.display = 'grid';

    cartContent.innerHTML = `
      <div class="cart-items">
        <h2>Shopping Cart (${this.getItemCount()} items)</h2>
        ${this.items.map(item => this.renderCartItem(item)).join('')}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>₹${this.getTotal().toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Shipping:</span>
          <span>₹99</span>
        </div>
        <div class="summary-row">
          <span>Tax:</span>
          <span>₹${Math.round(this.getTotal() * 0.18).toLocaleString()}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total:</span>
          <span>₹${(this.getTotal() + 99 + Math.round(this.getTotal() * 0.18)).toLocaleString()}</span>
        </div>
        <a href="checkout.html" class="btn btn-primary btn-full">Proceed to Checkout</a>
        <a href="products.html" class="btn btn-outline btn-full" style="margin-top: 1rem;">Continue Shopping</a>
      </div>
    `;
  }

  renderCartItem(item) {
    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-category">${item.category}</p>
        </div>
        <div class="cart-item-quantity">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <div class="cart-item-price">
          <span>₹${(item.price * item.quantity).toLocaleString()}</span>
        </div>
        <div class="remove-item" onclick="cart.removeItem(${item.id})">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    `;
  }

  renderCheckoutSummary() {
    const orderItems = document.getElementById('order-items');
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');

    if (!orderItems) return;

    const subtotalAmount = this.getTotal();
    const shippingAmount = 99;
    const taxAmount = Math.round(subtotalAmount * 0.18);
    const totalAmount = subtotalAmount + shippingAmount + taxAmount;

    orderItems.innerHTML = this.items.map(item => `
      <div class="order-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>Qty: ${item.quantity}</small>
        </div>
        <span>₹${(item.price * item.quantity).toLocaleString()}</span>
      </div>
    `).join('');

    if (subtotal) subtotal.textContent = `₹${subtotalAmount.toLocaleString()}`;
    if (shipping) shipping.textContent = `₹${shippingAmount}`;
    if (tax) tax.textContent = `₹${taxAmount.toLocaleString()}`;
    if (total) total.textContent = `₹${totalAmount.toLocaleString()}`;
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--primary-mint)' : 'var(--primary-sky)'};
      color: var(--dark);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  clear() {
    this.items = [];
    this.saveCart();
    this.updateCartUI();
  }
}

// Recently Viewed Products
class RecentlyViewed {
  constructor() {
    this.products = this.loadRecentlyViewed();
  }

  loadRecentlyViewed() {
    const saved = localStorage.getItem('CrocheaShoppingRecentlyViewed');
    return saved ? JSON.parse(saved) : [];
  }

  saveRecentlyViewed() {
    localStorage.setItem('CrocheaShoppingRecentlyViewed', JSON.stringify(this.products));
  }

  addProduct(productId) {
    // Remove if already exists
    this.products = this.products.filter(id => id !== productId);
    
    // Add to beginning
    this.products.unshift(productId);
    
    // Keep only last 6 products
    this.products = this.products.slice(0, 6);
    
    this.saveRecentlyViewed();
  }

  getProducts() {
    return this.products.map(id => products.find(p => p.id === id)).filter(Boolean);
  }
}

// Initialize cart and recently viewed
const cart = new ShoppingCart();
const recentlyViewed = new RecentlyViewed();

// Product Rendering Functions
function renderProducts(productsToRender, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = productsToRender.map(product => `
    <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">₹${product.price.toLocaleString()}</span>
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-to-cart" onclick="event.stopPropagation(); cart.addItem(${product.id})">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
        <button class="read-more-btn" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">Read More →</button>
      </div>
    </div>
  `).join('');
}



// Product Detail Page
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    window.location.href = 'products.html';
    return;
  }

  // Add to recently viewed
  recentlyViewed.addProduct(productId);

  // Update breadcrumb
  const breadcrumb = document.getElementById('product-breadcrumb');
  if (breadcrumb) {
    breadcrumb.textContent = product.name;
  }

  // Render product detail
  const productDetail = document.getElementById('product-detail');
  if (productDetail) {
    productDetail.innerHTML = `
      <div class="product-images">
        <div class="main-image">
          <img src="${product.image}" alt="${product.name}" id="main-product-image">
        </div>
        <div class="thumbnail-images">
          <img src="${product.image}" alt="${product.name}" class="thumbnail active" onclick="changeMainImage('${product.image}')">
          <img src="${product.image.replace('400x400', '400x500')}" alt="${product.name}" class="thumbnail" onclick="changeMainImage('${product.image.replace('400x400', '400x500')}')">
          <img src="${product.image.replace('400x400', '500x400')}" alt="${product.name}" class="thumbnail" onclick="changeMainImage('${product.image.replace('400x400', '500x400')}')">
        </div>
      </div>
      <div class="product-details">
        <h1>${product.name}</h1>
        <div class="product-meta">
          <div class="product-rating">
            <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
            <span class="rating-count">(${product.reviews} reviews)</span>
          </div>
          <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        </div>
        <div class="product-price">
          <span class="current-price">₹${product.price.toLocaleString()}</span>
          ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
            <input type="number" class="quantity-input" id="product-quantity" value="1" min="1" max="10">
            <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
          </div>
        </div>

        <div class="product-actions">
          <button class="btn btn-primary" onclick="addToCartFromDetail()">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <button class="btn btn-outline" onclick="window.location.href='https://wa.me/916380655921?text=Hi! I am interested in ${encodeURIComponent(product.name)} - ₹${product.price}'">
            <i class="fab fa-whatsapp"></i> Quick Order
          </button>
        </div>

        <div class="product-description">
          <h3>Description</h3>
          <p>${product.description}</p>
          
          <h4>Key Features:</h4>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
          
          <h4>Ingredients:</h4>
          <p>${product.ingredients}</p>
        </div>
      </div>
    `;
  }

  // Render related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, 4);
  renderProducts(relatedProducts, 'related-products');

  // Render recently viewed products
  const recentProducts = recentlyViewed.getProducts()
    .filter(p => p.id !== productId)
    .slice(0, 4);
  renderProducts(recentProducts, 'recently-viewed');
}

function changeMainImage(src) {
  const mainImage = document.getElementById('main-product-image');
  if (mainImage) {
    mainImage.src = src;
  }

  // Update active thumbnail
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.classList.remove('active');
    if (thumb.src === src) {
      thumb.classList.add('active');
    }
  });
}

function updateQuantity(change) {
  const quantityInput = document.getElementById('product-quantity');
  if (quantityInput) {
    const currentValue = parseInt(quantityInput.value);
    const newValue = Math.max(1, Math.min(10, currentValue + change));
    quantityInput.value = newValue;
  }
}

function addToCartFromDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const quantityInput = document.getElementById('product-quantity');
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  
  cart.addItem(productId, quantity);
}

// Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    } else if (field.type === 'tel' && !isValidPhone(field.value)) {
      showFieldError(field, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });

  return isValid;
}

function showFieldError(field, message) {
  field.style.borderColor = 'var(--accent-blush)';
  const errorElement = field.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFieldError(field) {
  field.style.borderColor = 'var(--gray)';
  const errorElement = field.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Checkout Form Submission
// Checkout Form Submission
function handleCheckoutSubmission(event) {
  event.preventDefault();
  
  if (!validateForm('checkout-form')) {
    return;
  }

  // Get form data
  const formData = new FormData(event.target);
  const orderData = Object.fromEntries(formData);
  
  // Get cart items
  const cartItems = cart.items;
  const total = cart.getTotal(); // Removed both tax and shipping charges

  // Create WhatsApp message
  let message = `🛍️ *New Order from Crochea Handmade Hair Accessories*\n\n`;
  message += `👤 *Customer Details:*\n`;
  message += `Name: ${orderData.firstName} ${orderData.lastName}\n`;
  message += `Email: ${orderData.email}\n`;
  message += `Phone: ${orderData.phone}\n\n`;
  
  message += `📍 *Delivery Address:*\n`;
  message += `${orderData.address}\n`;
  message += `${orderData.city}, ${orderData.state} - ${orderData.pincode}\n`;
  message += `${orderData.country}\n\n`;
  
  message += `🛒 *Order Items:*\n`;
  cartItems.forEach(item => {
    message += `• ${item.name} (₹${item.price}) x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}\n`;
  });
  
  message += `\n💰 *Order Summary:*\n`;
  message += `Subtotal: ₹${cart.getTotal().toLocaleString()}\n`;
  // Removed both shipping and tax lines
  message += `*Total: ₹${total.toLocaleString()}*\n\n`;
  
  message += `💳 *Payment Method:* ${orderData.paymentMethod}\n\n`;
  message += `Please confirm this order. Thank you! 🙏`;

  // Encode message for WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/918401527288?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
  
  // Clear cart and redirect
  cart.clear();
  alert('Your order has been sent via WhatsApp! We will contact you shortly to confirm your order.');
  window.location.href = 'index.html';
}


// Mobile Menu Toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  
  if (navMenu && toggle) {
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
  }
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize scroll to top button
function initScrollToTop() {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (!scrollButton) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    
    if (query.length > 2) {
      renderProducts(filteredProducts, 'products-grid');
      updateProductCount(filteredProducts.length);
    } else {
      renderProducts(products, 'products-grid');
      updateProductCount(products.length);
    }
  });
}

function updateProductCount(count) {
  const productCount = document.getElementById('product-count');
  if (productCount) {
    productCount.textContent = `Showing ${count} products`;
  }
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('Crochea Shopping website loaded');
  
  // Initialize scroll to top
  initScrollToTop();
  
  // Initialize mobile menu
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Page-specific initializations
  const currentPage = window.location.pathname;

  if (currentPage.includes('index.html') || currentPage === '/') {
    // Homepage
    const featuredProducts = products.slice(0, 8);
    renderProducts(featuredProducts, 'featured-products');
  }
  
  else if (currentPage.includes('products.html')) {
    // Products page
    let currentFilters = {
      category: 'all',
      price: 'all',
      sort: 'popularity'
    };

    function updateProducts() {
      const filteredProducts = filterProducts(
        currentFilters.category,
        currentFilters.price,
        currentFilters.sort
      );
      renderProducts(filteredProducts, 'products-grid');
      updateProductCount(filteredProducts.length);
    }

    // Initial load
    updateProducts();

    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(input => {
      input.addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        updateProducts();
      });
    });

    // Price filters
    document.querySelectorAll('input[name="price"]').forEach(input => {
      input.addEventListener('change', (e) => {
        currentFilters.price = e.target.value;
        updateProducts();
      });
    });

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        updateProducts();
      });
    }

    // Initialize search
    initSearch();
  }
  
  else if (currentPage.includes('product-detail.html')) {
    // Product detail page
    loadProductDetail();
  }
  
  else if (currentPage.includes('cart.html')) {
    // Cart page
    cart.renderCartPage();
  }
  
  else if (currentPage.includes('checkout.html')) {
    // Checkout page
    cart.renderCheckoutSummary();
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleCheckoutSubmission);
    }

    // Real-time form validation
    const formInputs = document.querySelectorAll('#checkout-form input, #checkout-form select');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required')) {
          if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
          } else {
            clearFieldError(input);
          }
        }
      });
    });
  }

  // Global category filter function for homepage
  window.filterProducts = function(category) {
    window.location.href = `products.html?category=${category}`;
  };

  // Check URL parameters for category filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam && currentPage.includes('products.html')) {
    const categoryRadio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
    if (categoryRadio) {
      categoryRadio.checked = true;
      categoryRadio.dispatchEvent(new Event('change'));
    }
  }
});

// Add CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .nav-menu.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: var(--shadow-lg);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }

  .nav-menu.active ul {
    flex-direction: column;
    gap: 1rem;
  }

  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;
document.head.appendChild(style);
