// admin.js

// Fetch users on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

// Fetch users from the backend API
function fetchUsers() {
    fetch('http://localhost:5000/admin/users')  // Replace with your backend URL
        .then(response => response.json())
        .then(data => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';  // Clear the list
            data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `Username: ${user.username}`;
                usersList.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Add similar functions for fetching vendors, managing memberships, etc.

// admin.js

document.getElementById('add-member').addEventListener('click', () => {
    const memberData = {
        userId: 'user_id_here',  // Replace with actual user ID
        membershipType: 'Gold',  // Example type
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))  // 1 year membership
    };

    fetch('http://localhost:5000/admin/add-membership', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Membership added:', data);
        // Optionally refresh the membership list
    })
    .catch(error => console.error('Error adding membership:', error));
});


// admin.js
window.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function fetchUsers() {
    fetch('http://localhost:5000/admin/users')  // Adjust this to match your backend URL
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';  // Clear the list first
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `Username: ${user.username}`;
                usersList.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// admin.js
document.getElementById('add-membership').addEventListener('click', () => {
    const memberData = {
        userId: 'user_id_here',  // Replace with actual user ID
        membershipType: 'Gold',  // Example membership type
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))  // 1 year membership
    };

    fetch('http://localhost:5000/admin/add-membership', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Membership added:', data);
        // Optionally, refresh the membership list
    })
    .catch(error => console.error('Error adding membership:', error));
});
