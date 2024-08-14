document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    try {
        const response = await fetch('/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),  // Gebruik "name" hier
        });
        
        const result = await response.json();

        if (response.ok) {
            if (result.role === 'teacher') {
                window.location.href = 'teacher.html';
            } else if (result.role === 'student') {
                window.location.href = 'student.html';
            } else {
                errorMessage.textContent = 'Invalid role.';
            }
        } else {
            errorMessage.textContent = result.message || 'Login failed.';
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred.';
    }
});
