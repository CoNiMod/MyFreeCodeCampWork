document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const resultContainer = document.getElementById('resultContainer');
    const errorContainer = document.getElementById('errorContainer');
    const originalUrlSpan = document.getElementById('originalUrl');
    const shortUrlLink = document.getElementById('shortUrl');
    const errorMessage = document.getElementById('errorMessage');

    // Hide result and error containers initially
    resultContainer.style.display = 'none';
    errorContainer.style.display = 'none';

    urlForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a URL');
            return;
        }

        try {
            // Show loading state
            const submitButton = urlForm.querySelector('button');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Shortening...';
            submitButton.disabled = true;

            const response = await fetch('/api/shorturl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });

            const data = await response.json();

            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            if (data.error) {
                showError(data.error);
            } else {
                showResult(data.original_url, data.short_url);
            }

        } catch (error) {
            console.error('Error:', error);
            showError('An error occurred while shortening the URL');
            
            // Reset button state
            const submitButton = urlForm.querySelector('button');
            submitButton.textContent = 'Shorten URL';
            submitButton.disabled = false;
        }
    });

    function showResult(originalUrl, shortUrl) {
        // Hide error container
        errorContainer.style.display = 'none';
        
        // Update result content
        originalUrlSpan.textContent = originalUrl;
        shortUrlLink.textContent = `${window.location.origin}/api/shorturl/${shortUrl}`;
        shortUrlLink.href = `/api/shorturl/${shortUrl}`;
        
        // Show result container
        resultContainer.style.display = 'block';
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Clear input
        urlInput.value = '';
    }

    function showError(message) {
        // Hide result container
        resultContainer.style.display = 'none';
        
        // Update error message
        errorMessage.textContent = message;
        
        // Show error container
        errorContainer.style.display = 'block';
        
        // Scroll to error
        errorContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Add some interactive features
    urlInput.addEventListener('input', function() {
        // Hide containers when user starts typing
        if (this.value.trim()) {
            resultContainer.style.display = 'none';
            errorContainer.style.display = 'none';
        }
    });

    // Add keyboard shortcut (Enter key)
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            urlForm.dispatchEvent(new Event('submit'));
        }
    });

    // Focus on input when page loads
    urlInput.focus();
});
