document.addEventListener('DOMContentLoaded', function() {
    const singleStockForm = document.getElementById('singleStockForm');
    const twoStocksForm = document.getElementById('twoStocksForm');
    const singleResult = document.getElementById('singleResult');
    const twoResult = document.getElementById('twoResult');

    // Handle single stock form submission
    singleStockForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const stockSymbol = document.getElementById('singleStock').value.trim().toUpperCase();
        const like = document.getElementById('singleLike').checked;
        
        if (!stockSymbol) {
            showResult(singleResult, 'Please enter a stock symbol', 'error');
            return;
        }
        
        try {
            const params = new URLSearchParams({
                stock: stockSymbol
            });
            
            if (like) {
                params.append('like', 'true');
            }
            
            const response = await fetch(`/api/stock-prices?${params}`);
            const data = await response.json();
            
            if (response.ok) {
                displaySingleStockResult(data.stockData, singleResult);
            } else {
                showResult(singleResult, data.error || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showResult(singleResult, 'Failed to fetch stock data', 'error');
        }
    });

    // Handle two stocks form submission
    twoStocksForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const stock1 = document.getElementById('stock1').value.trim().toUpperCase();
        const stock2 = document.getElementById('stock2').value.trim().toUpperCase();
        const like = document.getElementById('twoLike').checked;
        
        if (!stock1 || !stock2) {
            showResult(twoResult, 'Please enter both stock symbols', 'error');
            return;
        }
        
        if (stock1 === stock2) {
            showResult(twoResult, 'Please enter two different stock symbols', 'error');
            return;
        }
        
        try {
            const params = new URLSearchParams();
            params.append('stock', stock1);
            params.append('stock', stock2);
            
            if (like) {
                params.append('like', 'true');
            }
            
            const response = await fetch(`/api/stock-prices?${params}`);
            const data = await response.json();
            
            if (response.ok) {
                displayTwoStocksResult(data.stockData, twoResult);
            } else {
                showResult(twoResult, data.error || 'An error occurred', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showResult(twoResult, 'Failed to fetch stock data', 'error');
        }
    });

    // Display single stock result
    function displaySingleStockResult(stockData, resultElement) {
        resultElement.innerHTML = `
            <div class="stock-info">
                <div class="stock-card">
                    <div class="stock-symbol">${stockData.stock}</div>
                    <div class="stock-price">$${stockData.price}</div>
                    <div class="stock-likes">Likes: ${stockData.likes}</div>
                </div>
            </div>
        `;
        
        showResult(resultElement, '', 'success');
    }

    // Display two stocks result
    function displayTwoStocksResult(stockDataArray, resultElement) {
        const stocksHtml = stockDataArray.map(stock => `
            <div class="stock-card">
                <div class="stock-symbol">${stock.stock}</div>
                <div class="stock-price">$${stock.price}</div>
                <div class="stock-likes">Relative Likes: ${stock.rel_likes}</div>
            </div>
        `).join('');
        
        resultElement.innerHTML = `
            <div class="stock-info">
                ${stocksHtml}
            </div>
        `;
        
        showResult(resultElement, '', 'success');
    }

    // Show result with appropriate styling
    function showResult(resultElement, message, type) {
        resultElement.className = `result ${type}`;
        
        if (message) {
            resultElement.innerHTML = `<p>${message}</p>`;
        }
        
        resultElement.classList.add('show');
        
        // Scroll to result
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Clear results when forms are reset
    function clearResults() {
        singleResult.classList.remove('show');
        twoResult.classList.remove('show');
    }

    // Add input event listeners to clear results when user starts typing
    document.getElementById('singleStock').addEventListener('input', clearResults);
    document.getElementById('stock1').addEventListener('input', clearResults);
    document.getElementById('stock2').addEventListener('input', clearResults);
});
