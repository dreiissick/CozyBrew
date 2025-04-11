// GET CART ITEMS FROM LOCAL STORAGE
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

let total = 0;

if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty ☕</p>';
    document.getElementById('checkout-btn').style.display = 'none';
} else {
    cartItems.forEach((item, index) => {
        const itemTotal = (item.quantity * 3.50).toFixed(2); // CHANGE 3.50 TO YOUR PRODUCT PRICE IF NEEDED
        total += parseFloat(itemTotal);

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Size: ${item.size}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Item Total: $${itemTotal}</p>
            <button onclick="removeItem(${index})">Remove</button>
            <hr>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    totalPriceEl.textContent = total.toFixed(2);
}

// REMOVE ITEM FUNCTION
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload(); // refresh the cart view
}

// CHECKOUT FUNCTION
function checkout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to proceed to payment!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Save order details to localStorage
            localStorage.setItem('orderDetails', JSON.stringify({
                orderId: Math.floor(Math.random() * 1000000), // Generate a random order ID
                items: cartItems,
                total: total
            }));

            // Clear the cart from localStorage
            localStorage.removeItem('cartItems');

            // Optional: Add a small delay before redirecting
            setTimeout(() => {
                // Redirect to receipt page
                window.location.href = 'receipt.html';
            }, 1000); // 1-second delay for the user to see the alert
        }
    });
}

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