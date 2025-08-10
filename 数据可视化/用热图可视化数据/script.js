// Global Temperature Heat Map
// Using D3.js to create an interactive heat map visualization

// Set up dimensions and margins
const margin = { top: 60, right: 30, bottom: 60, left: 60 };
const width = 1000 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Color scale for temperature variations (at least 4 different colors)
const colorScale = d3.scaleQuantile()
    .domain([-3, 3])
    .range([
        '#313695',  // Dark blue (cold)
        '#4575b4',  // Blue
        '#74add1',  // Light blue
        '#abd9e9',  // Very light blue
        '#e0f3f8',  // Very light cyan
        '#ffffcc',  // Light yellow
        '#fee090',  // Light orange
        '#fdae61',  // Orange
        '#f46d43',  // Red-orange
        '#d73027',  // Red
        '#a50026'   // Dark red (hot)
    ]);

// Create SVG container
const svg = d3.select('#heatmap')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Create tooltip
const tooltip = d3.select('#tooltip');

// Load data
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then(data => {
        const dataset = data.monthlyVariance;
        const baseTemp = data.baseTemperature;

        // Process data
        dataset.forEach(d => {
            d.month = d.month - 1; // Convert to 0-based index for D3
            d.temperature = baseTemp + d.variance;
        });

        // Create scales
        const years = d3.extent(dataset, d => d.year);
        const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const variances = d3.extent(dataset, d => d.variance);

        const xScale = d3.scaleLinear()
            .domain(years)
            .range([0, width]);

        const yScale = d3.scaleBand()
            .domain(months)
            .range([0, height]);

        const colorScaleDomain = d3.extent(dataset, d => d.variance);
        colorScale.domain(colorScaleDomain);

        // Create axes
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format('d'))
            .tickValues(xScale.domain().filter((d, i) => i % 10 === 0)); // Show every 10th year

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d => {
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return monthNames[d];
            });

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
            .text('Month');

        // Create cells
        const cellWidth = width / (years[1] - years[0] + 1);
        const cellHeight = height / 12;

        svg.selectAll('.cell')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.month))
            .attr('width', cellWidth)
            .attr('height', cellHeight)
            .attr('fill', d => colorScale(d.variance))
            .attr('data-month', d => d.month)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => d.temperature)
            .on('mouseover', function(event, d) {
                // Show tooltip
                tooltip.style('opacity', 1)
                    .attr('data-year', d.year)
                    .html(`
                        <div class="tooltip-title">${getMonthName(d.month)} ${d.year}</div>
                        <div class="tooltip-temp">Temperature: ${d.temperature.toFixed(1)}°C</div>
                        <div class="tooltip-variance">Variance: ${d.variance.toFixed(1)}°C</div>
                    `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                // Hide tooltip
                tooltip.style('opacity', 0);
            });

        // Create legend
        createLegend(variances);
    })
    .catch(error => {
        console.error('Error loading data:', error);
        d3.select('#heatmap')
            .append('div')
            .style('text-align', 'center')
            .style('padding', '50px')
            .style('color', '#e74c3c')
            .text('Error loading data. Please try again.');
    });

// Function to get month name
function getMonthName(monthIndex) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
}

// Function to create legend
function createLegend(variances) {
    const legendWidth = 400;
    const legendHeight = 20;
    const legendMargin = { top: 20, right: 20, bottom: 20, left: 20 };

    const legendSvg = d3.select('#legend')
        .append('svg')
        .attr('width', legendWidth + legendMargin.left + legendMargin.right)
        .attr('height', legendHeight + legendMargin.top + legendMargin.bottom)
        .append('g')
        .attr('transform', `translate(${legendMargin.left}, ${legendMargin.top})`);

    // Create legend scale
    const legendScale = d3.scaleLinear()
        .domain(variances)
        .range([0, legendWidth]);

    // Create legend axis
    const legendAxis = d3.axisBottom(legendScale)
        .tickValues(colorScale.quantiles())
        .tickFormat(d3.format('.1f'));

    // Create legend gradient
    const defs = legendSvg.append('defs');
    const gradient = defs.append('linearGradient')
        .attr('id', 'legend-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

    // Add gradient stops
    const stops = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    stops.forEach((stop, i) => {
        gradient.append('stop')
            .attr('offset', `${stop * 100}%`)
            .attr('stop-color', colorScale.range()[i]);
    });

    // Create legend rectangle
    legendSvg.append('rect')
        .attr('class', 'legend-item')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#legend-gradient)');

    // Add legend axis
    legendSvg.append('g')
        .attr('transform', `translate(0, ${legendHeight})`)
        .call(legendAxis)
        .selectAll('text')
        .attr('class', 'legend-text')
        .style('font-size', '12px');

    // Add legend title
    legendSvg.append('text')
        .attr('class', 'legend-text')
        .attr('x', legendWidth / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text('Temperature Variance (°C)');
}
