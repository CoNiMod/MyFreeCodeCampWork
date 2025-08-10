// Exercise Tracker Client-side JavaScript

// API Base URL
const API_BASE = '';

// Utility Functions
function showResponse(data, isError = false) {
    const responseContainer = document.getElementById('response');
    const responseContent = responseContainer.querySelector('.response-content');
    
    responseContainer.className = `response-container show ${isError ? 'response-error' : ''}`;
    
    if (typeof data === 'object') {
        responseContent.textContent = JSON.stringify(data, null, 2);
    } else {
        responseContent.textContent = data;
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        responseContainer.classList.remove('show');
    }, 5000);
}

function showError(message) {
    showResponse(message, true);
}

function showSuccess(data) {
    showResponse(data, false);
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// User Management Functions
async function createUser() {
    const username = document.getElementById('username').value.trim();
    
    if (!username) {
        showError('Username is required');
        return;
    }
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess(data);
            clearForm('username');
            loadUsers(); // Refresh user list
        } else {
            showError(data.error || 'Failed to create user');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    }
}

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        
        if (response.ok) {
            displayUsers(users);
        } else {
            showError('Failed to load users');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    }
}

function displayUsers(users) {
    const usersContainer = document.getElementById('usersList');
    
    if (users.length === 0) {
        usersContainer.innerHTML = '<p>No users found. Create a user to get started!</p>';
        return;
    }
    
    const usersHTML = users.map(user => `
        <div class="user-card">
            <div class="user-info">
                <strong>${user.username}</strong>
            </div>
            <div class="user-id">ID: ${user._id}</div>
        </div>
    `).join('');
    
    usersContainer.innerHTML = usersHTML;
}

// Exercise Management Functions
async function addExercise() {
    const userId = document.getElementById('userId').value.trim();
    const description = document.getElementById('description').value.trim();
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    
    if (!userId || !description || !duration) {
        showError('User ID, description, and duration are required');
        return;
    }
    
    if (isNaN(duration) || duration <= 0) {
        showError('Duration must be a positive number');
        return;
    }
    
    try {
        const exerciseData = {
            description,
            duration: Number(duration)
        };
        
        if (date) {
            exerciseData.date = date;
        }
        
        const response = await fetch(`/api/users/${userId}/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exerciseData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess(data);
            // Clear form fields except userId
            document.getElementById('description').value = '';
            document.getElementById('duration').value = '';
            document.getElementById('date').value = '';
        } else {
            showError(data.error || 'Failed to add exercise');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    }
}

// Exercise Log Functions
async function getExerciseLog() {
    const userId = document.getElementById('logUserId').value.trim();
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const limit = document.getElementById('limit').value;
    
    if (!userId) {
        showError('User ID is required');
        return;
    }
    
    try {
        let url = `/api/users/${userId}/logs`;
        const params = new URLSearchParams();
        
        if (fromDate) params.append('from', fromDate);
        if (toDate) params.append('to', toDate);
        if (limit) params.append('limit', limit);
        
        if (params.toString()) {
            url += '?' + params.toString();
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            displayExerciseLog(data);
            showSuccess(data);
        } else {
            showError(data.error || 'Failed to get exercise log');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    }
}

function displayExerciseLog(logData) {
    const logContainer = document.getElementById('exerciseLog');
    
    if (!logData.log || logData.log.length === 0) {
        logContainer.innerHTML = '<p>No exercises found for this user.</p>';
        return;
    }
    
    const summaryHTML = `
        <div class="log-summary">
            <h4>Exercise Summary</h4>
            <p><strong>Username:</strong> ${logData.username}</p>
            <p><strong>Total Exercises:</strong> ${logData.count}</p>
            <p><strong>User ID:</strong> ${logData._id}</p>
        </div>
    `;
    
    const exercisesHTML = logData.log.map(exercise => `
        <div class="exercise-item">
            <div class="exercise-description">${exercise.description}</div>
            <div class="exercise-details">
                <strong>Duration:</strong> ${exercise.duration} minutes<br>
                <strong>Date:</strong> ${exercise.date}
            </div>
        </div>
    `).join('');
    
    logContainer.innerHTML = summaryHTML + exercisesHTML;
}

// Form Validation
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    return isValid;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load users on page load
    loadUsers();
    
    // Add form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Handle form submission
            }
        });
    });
    
    // Add input validation styling
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 53, 69)') {
                this.style.borderColor = '#e9ecef';
            }
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit forms
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            const form = activeElement.closest('section');
            if (form) {
                const submitButton = form.querySelector('.btn-primary');
                if (submitButton) {
                    submitButton.click();
                }
            }
        }
    }
});

// Export functions for global access
window.createUser = createUser;
window.loadUsers = loadUsers;
window.addExercise = addExercise;
window.getExerciseLog = getExerciseLog;
