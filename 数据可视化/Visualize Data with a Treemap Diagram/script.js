// Video Game Sales Treemap Diagram
// Using D3.js to create an interactive treemap visualization

// Set up dimensions and margins
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Color scale for different platforms
const colorScale = d3.scaleOrdinal()
    .domain(['PC', 'PS4', 'PS3', 'PS2', 'PS', 'X360', 'XOne', 'XB', 'Wii', 'WiiU', 'DS', '3DS', 'GBA', 'GC', 'N64', 'SNES', 'NES', 'GB', 'GBC', 'PSP', 'PSV', 'DC', 'SAT', 'SCD', 'WS', 'NG', 'TG16', '3DO', 'GG', 'PCFX', '2600', '7800', '5200', 'INT', 'NGP', 'GG', 'PCFX', '2600', '7800', '5200', 'INT', 'NGP'])
    .range([
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#16a085', '#8e44ad',
        '#27ae60', '#d35400', '#c0392b', '#2980b9', '#f1c40f',
        '#e8f5e8', '#ff7675', '#74b9ff', '#fd79a8', '#fdcb6e',
        '#6c5ce7', '#a29bfe', '#00b894', '#00cec9', '#fab1a0',
        '#e17055', '#636e72', '#2d3436', '#b2bec3', '#dfe6e9',
        '#00b894', '#00cec9', '#fab1a0', '#e17055', '#636e72',
        '#2d3436', '#b2bec3', '#dfe6e9', '#74b9ff', '#fd79a8',
        '#fdcb6e', '#6c5ce7', '#a29bfe'
    ]);

// Create SVG container
const svg = d3.select('#treemap')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Create tooltip
const tooltip = d3.select('#tooltip');

// Load and process data
d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then(data => {
        // Process the data for treemap
        const processedData = {
            name: 'Video Games',
            children: data
        };

        // Create treemap layout
        const treemap = d3.treemap()
            .size([width, height])
            .padding(1)
            .round(true);

        // Create root node
        const root = d3.hierarchy(processedData)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        // Generate treemap layout
        treemap(root);

        // Create tiles
        const tiles = svg.selectAll('.tile')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('class', 'tile-group');

        // Add rectangles for tiles
        tiles.append('rect')
            .attr('class', 'tile')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => colorScale(d.data.category))
            .attr('data-name', d => d.data.name)
            .attr('data-category', d => d.data.category)
            .attr('data-value', d => d.data.value)
            .on('mouseover', function(event, d) {
                // Show tooltip
                tooltip.style('opacity', 1)
                    .attr('data-value', d.data.value)
                    .html(`
                        <div class="tooltip-title">${d.data.name}</div>
                        <div class="tooltip-category">Platform: ${d.data.category}</div>
                        <div class="tooltip-value">Sales: ${d.data.value.toLocaleString()}M</div>
                    `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                // Hide tooltip
                tooltip.style('opacity', 0);
            });

        // Add text labels to tiles (only for larger tiles)
        tiles.append('text')
            .attr('class', 'tile-text')
            .attr('x', d => d.x0 + (d.x1 - d.x0) / 2)
            .attr('y', d => d.y0 + (d.y1 - d.y0) / 2)
            .text(d => {
                const width = d.x1 - d.x0;
                const height = d.y1 - d.y0;
                // Only show text if tile is large enough
                if (width > 80 && height > 30) {
                    return d.data.name.length > 15 ? 
                        d.data.name.substring(0, 15) + '...' : 
                        d.data.name;
                }
                return '';
            });

        // Create legend
        createLegend(data);
    })
    .catch(error => {
        console.error('Error loading data:', error);
        d3.select('#treemap')
            .append('div')
            .style('text-align', 'center')
            .style('padding', '50px')
            .style('color', '#e74c3c')
            .text('Error loading data. Please try again.');
    });

// Function to create legend
function createLegend(data) {
    // Get unique categories
    const categories = [...new Set(data.map(d => d.category))].sort();
    
    // Create legend SVG
    const legendSvg = d3.select('#legend')
        .append('svg')
        .attr('width', width)
        .attr('height', 100);

    // Create legend items
    const legendItems = legendSvg.selectAll('.legend-item-group')
        .data(categories)
        .enter()
        .append('g')
        .attr('class', 'legend-item-group')
        .attr('transform', (d, i) => `translate(${(i % 8) * 120}, ${Math.floor(i / 8) * 30})`);

    // Add colored rectangles
    legendItems.append('rect')
        .attr('class', 'legend-item')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d => colorScale(d));

    // Add text labels
    legendItems.append('text')
        .attr('class', 'legend-text')
        .attr('x', 20)
        .attr('y', 12)
        .text(d => d);
}
