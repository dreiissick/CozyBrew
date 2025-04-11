function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const isActive = navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open', isActive);

    // Prevent page scroll when the menu is active
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}
function addToCart(productName) {
    const productItem = event.target.closest('.product-item');
    const size = productItem.querySelector('select').value;
    const quantity = parseInt(productItem.querySelector('input[type="number"]').value);

    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    cart.push({
        name: productName,
        size: size,
        quantity: quantity,
        price: getPrice(productName, size)
    });

    localStorage.setItem('cartItems', JSON.stringify(cart));

    updateCartCount();

    // Removed alert
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
}

function getPrice(productName, size) {
    let basePrice = 3.00;
    if (size === 'medium') basePrice += 1.00;
    if (size === 'large') basePrice += 2.00;
    return basePrice;
}

window.onload = updateCartCount;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});