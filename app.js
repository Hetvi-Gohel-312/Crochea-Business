// Function to filter and display products
function filterProducts() {
    const category = document.querySelector('input[name="category"]:checked')?.value || 'all';
    const priceRange = document.querySelector('input[name="price"]:checked')?.value || 'all';
    const sortBy = document.getElementById('sort-select')?.value || 'default';

    let filteredProducts = products;

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (priceRange !== 'all') {
        const [min, maxRaw] = priceRange.split('-');
        const max = maxRaw === '+' ? Infinity : parseInt(maxRaw);
        filteredProducts = filteredProducts.filter(product => product.price >= parseInt(min) && product.price <= max);
    }

    if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    document.getElementById('product-count').innerText = `Showing ${filteredProducts.length} products`;

    // Render filtered products
    renderProducts(filteredProducts, 'products-grid');
}

// Function to render products in a specified container
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-image" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="product-category">${product.category}</p>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); cart.addItem(${product.id})">
                    Add to Cart
                </button>
                <button class="read-more-btn" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">Read More →</button>
            </div>
        </div>
    `).join('');
}

// Event listeners for filters
document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', filterProducts);
});

document.querySelectorAll('input[name="price"]').forEach(input => {
    input.addEventListener('change', filterProducts);
});

document.getElementById('sort-select').addEventListener('change', filterProducts);

// Initial display of all products
document.addEventListener('DOMContentLoaded', () => {
    filterProducts(); // Display all products initially
});


/*Product-Details Script*/
// Function to load recently viewed and related products
function loadRelatedAndRecentlyViewed() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!isNaN(productId)) {
        const currentProduct = products.find(p => p.id === productId);
        if (currentProduct) {
            const relatedProducts = products
                .filter(p => p.category === currentProduct.category && p.id !== productId)
                .slice(0, 4);
            renderProducts(relatedProducts, 'related-products');

            const recentProducts = products
                .filter(p => p.id !== productId)
                .slice(0, 4);
            renderProducts(recentProducts, 'recently-viewed');
        }
    }
}

// Main product grid rendering
function renderProductGrid() {
    renderProducts(products, 'products-grid');
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('product-detail.html')) {
        loadRelatedAndRecentlyViewed();
    } else if (window.location.pathname.includes('products.html')) {
        renderProductGrid();
    }
});



