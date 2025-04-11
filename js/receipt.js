// Get the order details from localStorage
const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

if (orderDetails) {
    // Set the order ID
    document.getElementById('order-id').textContent = orderDetails.orderId;

    // Display the ordered items
    const receiptItemsContainer = document.getElementById('receipt-items');
    let itemsHtml = '';
    orderDetails.items.forEach(item => {
        const itemTotal = (item.quantity * 3.50).toFixed(2); // Adjust the price if needed
        itemsHtml += `
             <li>${item.name} (${item.size}) x${item.quantity} - $${itemTotal}</li>
         `;
    });
    receiptItemsContainer.innerHTML = `<ul>${itemsHtml}</ul>`;

    // Set the total price
    document.getElementById('receipt-total').textContent = orderDetails.total.toFixed(2);
} else {
    document.getElementById('receipt-items').innerHTML = '<p>No items found.</p>';
}

 // Print the Receipt
 function printReceipt() {
    const printWindow = window.open('', '', 'height=800, width=600');
    printWindow.document.write('<html><head><title>Receipt</title></head><body>');
    printWindow.document.write(document.getElementById("receipt").innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Download the Receipt as JPEG
function downloadReceipt() {
    html2canvas(document.getElementById("receipt")).then(function(canvas) {
        // Convert canvas to a JPEG file
        var imgData = canvas.toDataURL("image/jpeg");
        var link = document.createElement('a');
        link.href = imgData;
        link.download = 'receipt.jpg';
        // Ensure the link is clicked programmatically
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Trigger the click event to start download
        document.body.removeChild(link); // Remove the link after clicking
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