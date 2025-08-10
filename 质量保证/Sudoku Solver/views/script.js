document.addEventListener('DOMContentLoaded', function() {
    const puzzleInput = document.getElementById('puzzleInput');
    const solveBtn = document.getElementById('solveBtn');
    const solution = document.getElementById('solution');
    const solutionText = document.getElementById('solutionText');
    const coordinateInput = document.getElementById('coordinateInput');
    const valueInput = document.getElementById('valueInput');
    const checkBtn = document.getElementById('checkBtn');
    const checkResult = document.getElementById('checkResult');
    const exampleBtns = document.querySelectorAll('.example-btn');

    // Solve puzzle functionality
    solveBtn.addEventListener('click', async function() {
        const puzzle = puzzleInput.value.trim();
        
        if (!puzzle) {
            alert('Please enter a puzzle to solve.');
            return;
        }

        try {
            const response = await fetch('/api/solve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ puzzle })
            });

            const result = await response.json();
            
            if (result.error) {
                alert(`Error: ${result.error}`);
                solution.style.display = 'none';
            } else {
                solutionText.textContent = formatSolution(result.solution);
                solution.style.display = 'block';
            }
        } catch (error) {
            alert('Error solving puzzle. Please try again.');
            console.error('Error:', error);
        }
    });

    // Check placement functionality
    checkBtn.addEventListener('click', async function() {
        const puzzle = puzzleInput.value.trim();
        const coordinate = coordinateInput.value.trim().toUpperCase();
        const value = parseInt(valueInput.value);

        if (!puzzle) {
            alert('Please enter a puzzle first.');
            return;
        }

        if (!coordinate) {
            alert('Please enter a coordinate.');
            return;
        }

        if (!value || value < 1 || value > 9) {
            alert('Please enter a valid value (1-9).');
            return;
        }

        try {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ puzzle, coordinate, value })
            });

            const result = await response.json();
            
            if (result.error) {
                checkResult.textContent = `Error: ${result.error}`;
                checkResult.className = 'error';
            } else if (result.valid) {
                checkResult.textContent = 'Valid placement!';
                checkResult.className = 'valid';
            } else {
                const conflicts = result.conflict.join(', ');
                checkResult.textContent = `Invalid placement. Conflicts: ${conflicts}`;
                checkResult.className = 'invalid';
            }
            
            checkResult.style.display = 'block';
        } catch (error) {
            alert('Error checking placement. Please try again.');
            console.error('Error:', error);
        }
    });

    // Example puzzle buttons
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const puzzle = this.getAttribute('data-puzzle');
            puzzleInput.value = puzzle;
        });
    });

    // Format solution for display
    function formatSolution(solution) {
        let formatted = '';
        for (let i = 0; i < 9; i++) {
            const row = solution.slice(i * 9, (i + 1) * 9);
            formatted += row.split('').join(' ') + '\n';
            if ((i + 1) % 3 === 0 && i < 8) {
                formatted += '------+-------+------\n';
            }
        }
        return formatted;
    }

    // Enter key support for puzzle input
    puzzleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            solveBtn.click();
        }
    });

    // Enter key support for coordinate and value inputs
    coordinateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            valueInput.focus();
        }
    });

    valueInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });
});
