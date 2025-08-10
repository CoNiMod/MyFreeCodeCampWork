// Doping in Professional Bicycle Racing Scatter Plot
// Using D3.js to create an interactive scatter plot visualization

// Set up dimensions and margins
const margin = { top: 60, right: 30, bottom: 60, left: 60 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select('#scatterplot')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Create tooltip
const tooltip = d3.select('#tooltip');

// Load data
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(data => {
        // Process data
        data.forEach(d => {
            // Parse time string to get minutes and seconds
            const timeParts = d.Time.split(':');
            const minutes = parseInt(timeParts[0]);
            const seconds = parseInt(timeParts[1]);
            
            // Create Date object for y-axis (time)
            d.TimeInMinutes = new Date(1970, 0, 1, 0, minutes, seconds);
            
            // Create Date object for x-axis (year)
            d.Year = new Date(d.Year, 0, 1);
        });

        // Create scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.Year))
            .range([0, width]);

        const yScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.TimeInMinutes))
            .range([height, 0]);

        // Create axes
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format('d'));

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d3.timeFormat('%M:%S'));

        // Add x-axis
        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        // Add y-axis
        svg.append('g')
            .attr('id', 'y-axis')
            .call(yAxis);

        // Add axis labels
        svg.append('text')
            .attr('class', 'axis-label')
            .attr('x', width / 2)
            .attr('y', height + 40)
            .attr('text-anchor', 'middle')
            .text('Year');

        svg.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .text('Time (Minutes:Seconds)');

        // Create dots
        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(d.Year))
            .attr('cy', d => yScale(d.TimeInMinutes))
            .attr('r', 6)
            .attr('fill', d => d.Doping ? '#e74c3c' : '#3498db')
            .attr('data-xvalue', d => d.Year)
            .attr('data-yvalue', d => d.TimeInMinutes)
            .on('mouseover', function(event, d) {
                // Show tooltip
                tooltip.style('opacity', 1)
                    .attr('data-year', d.Year.getFullYear())
                    .html(`
                        <div class="tooltip-title">${d.Name}</div>
                        <div class="tooltip-time">Time: ${d.Time}</div>
                        <div class="tooltip-year">Year: ${d.Year.getFullYear()}</div>
                        <div class="tooltip-doping">${d.Doping ? 'Doping Allegations: ' + d.Doping : 'No Doping Allegations'}</div>
                    `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                // Hide tooltip
                tooltip.style('opacity', 0);
            });

        // Create legend
        createLegend();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        d3.select('#scatterplot')
            .append('div')
            .style('text-align', 'center')
            .style('padding', '50px')
            .style('color', '#e74c3c')
            .text('Error loading data. Please try again.');
    });

// Function to create legend
function createLegend() {
    const legendSvg = d3.select('#legend')
        .append('svg')
        .attr('width', 400)
        .attr('height', 100);

    // Legend items
    const legendItems = [
        { color: '#3498db', text: 'No Doping Allegations' },
        { color: '#e74c3c', text: 'Doping Allegations' }
    ];

    // Create legend groups
    const legendGroups = legendSvg.selectAll('.legend-group')
        .data(legendItems)
        .enter()
        .append('g')
        .attr('class', 'legend-group')
        .attr('transform', (d, i) => `translate(20, ${i * 30 + 20})`);

    // Add colored circles
    legendGroups.append('circle')
        .attr('class', 'legend-item')
        .attr('r', 6)
        .attr('fill', d => d.color);

    // Add text labels
    legendGroups.append('text')
        .attr('class', 'legend-text')
        .attr('x', 15)
        .attr('y', 4)
        .text(d => d.text);
}
