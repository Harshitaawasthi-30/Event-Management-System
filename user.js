// user.js

document.getElementById('view-cart').addEventListener('click', () => {
    const userId = 'user_id_here';  // Replace with the actual user ID

    fetch(`http://localhost:5000/user/cart/${userId}`)
        .then(response => response.json())
        .then(data => {
            const cart = document.getElementById('cart');
            cart.innerHTML = '';  // Clear the cart display
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `Item: ${item.name}, Price: ${item.price}`;
                cart.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error fetching cart:', error));
});


// user.js

document.getElementById('add-guest').addEventListener('click', () => {
    const guestName = document.getElementById('guest-name').value;
    const userId = 'user_id_here';  // Replace with actual user ID

    fetch(`http://localhost:5000/user/add-guest/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guestName })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Guest added:', data);
        // Optionally refresh the guest list
    })
    .catch(error => console.error('Error adding guest:', error));
});
