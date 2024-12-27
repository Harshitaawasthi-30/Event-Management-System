const API_URL = 'http://localhost:5000/api/events';

// Fetch and display events
const fetchEvents = async () => {
  const response = await fetch(API_URL);
  const events = await response.json();
  const eventsContainer = document.getElementById('events');
  eventsContainer.innerHTML = events.map(event => `
    <div class="event">
      <h3>${event.title}</h3>
      <p>${event.date} - ${event.location}</p>
      <p>${event.description}</p>
      <button onclick="deleteEvent('${event._id}')">Delete</button>
    </div>
  `).join('');
};

// Add an event
document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const newEvent = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    location: document.getElementById('location').value,
    description: document.getElementById('description').value,
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent),
  });
  e.target.reset();
  fetchEvents();
});

// // Delete an event
const deleteEvent = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchEvents();
};

// Initial fetch
fetchEvents();

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Mock API call or fetch request to validate login
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to appropriate dashboard based on user role
          if (data.role === "admin") {
            window.location.href = "admin.html";
          } else if (data.role === "vendor") {
            window.location.href = "vendor.html";
          } else if (data.role === "user") {
            window.location.href = "user.html";
          }
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
  
  // Handle the login form submission
  document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      // Send a POST request to the server to authenticate the user
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        // Redirect based on the role returned by the server
        if (data.role === "admin") {
          window.location.href = "admin.html"; // Redirect to the admin page
        } else if (data.role === "vendor") {
          window.location.href = "vendor.html"; // Redirect to the vendor page
        } else if (data.role === "user") {
          window.location.href = "user.html"; // Redirect to the user page
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Server error, please try again later.");
    }
  });
