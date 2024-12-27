// vendor.js

document.getElementById('add-item-form').addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent form submission

    const itemData = {
        name: document.getElementById('item-name').value,
        price: parseFloat(document.getElementById('item-price').value)
    };

    fetch('http://localhost:5000/vendor/add-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Item added successfully');
        // Optionally refresh the item list
    })
    .catch(error => console.error('Error adding item:', error));
});
