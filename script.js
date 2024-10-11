// script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting
  
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
  
      // Validate form fields
      if (name === '' || email === '' || message === '') {
        alert('Please fill in all the fields.');
        return;
      }
  
      // Optionally, add more validation (e.g., email format)
  
      // For demonstration, we'll just alert success and reset the form
      alert('Thank you for your message!');
      contactForm.reset();
    });
  
    // Handle Modal Functionality
    const modal = document.getElementById('projectModal');
    const closeModalButton = document.getElementById('closeModal');
  
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    // Fetch Projects from GitHub API
    fetchProjects();
  });
  
  // Function to fetch projects from GitHub API
  function fetchProjects() {
    const projectList = document.getElementById('projectList');
    
    // Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username
    const githubUsername = 'yuvanandini';
    
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        // Check if there are repositories
        if (data.length === 0) {
          projectList.innerHTML = '<p>No projects found.</p>';
          return;
        }
  
        // Limit to top 3 repositories
        const topProjects = data.slice(10, 13);
  
        topProjects.forEach(project => {
          // Create project div
          const projectDiv = document.createElement('div');
          projectDiv.classList.add('project');
          projectDiv.setAttribute('data-title', project.name);
          projectDiv.setAttribute('data-description', project.description || 'No description provided.');
          projectDiv.setAttribute('data-link', project.html_url);
  
          // Add inner HTML
          projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description || 'No description provided.'}</p>
          `;
  
          // Add click event to open modal
          projectDiv.addEventListener('click', () => {
            openModal(projectDiv.getAttribute('data-title'), projectDiv.getAttribute('data-description'), projectDiv.getAttribute('data-link'));
          });
  
          // Append to project list
          projectList.appendChild(projectDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        const projectList = document.getElementById('projectList');
        projectList.innerHTML = '<p>Could not load projects. Please try again later.</p>';
      });
  }
  
  // Function to open modal with project details
  function openModal(title, description, link) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
  
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalLink.href = link;
    modalLink.textContent = 'View on GitHub';
  
    modal.style.display = 'block';
  }
  