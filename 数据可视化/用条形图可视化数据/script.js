// US GDP Bar Chart
// Using D3.js to create an interactive bar chart visualization

// Set up dimensions and margins
const margin = { top: 60, right: 30, bottom: 60, left: 60 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Create tooltip
const tooltip = d3.select('#tooltip');

// Load data
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(data => {
        // Process data
        data.data.forEach(d => {
            d[0] = new Date(d[0]); // Convert date string to Date object
            d[1] = +d[1]; // Convert GDP to number
        });

        // Create scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data.data, d => d[0]))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data.data, d => d[1])])
            .range([height, 0]);

        // Create axes
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat('%Y'));

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d3.format('$,.0f'));

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
            .text('GDP (Billions of Dollars)');

        // Calculate bar width
        const barWidth = width / data.data.length;

        // Create bars
        svg.selectAll('.bar')
            .data(data.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d[0]))
            .attr('y', d => yScale(d[1]))
            .attr('width', barWidth)
            .attr('height', d => height - yScale(d[1]))
            .attr('data-date', d => d[0])
            .attr('data-gdp', d => d[1])
            .on('mouseover', function(event, d) {
                // Show tooltip
                tooltip.style('opacity', 1)
                    .attr('data-date', d[0])
                    .html(`
                        <div class="tooltip-title">US GDP</div>
                        <div class="tooltip-date">Date: ${d3.timeFormat('%B %Y')(d[0])}</div>
                        <div class="tooltip-gdp">GDP: $${d3.format(',')(d[1])} Billion</div>
                    `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                // Hide tooltip
                tooltip.style('opacity', 0);
            });
    })
    .catch(error => {
        console.error('Error loading data:', error);
        d3.select('#chart')
            .append('div')
            .style('text-align', 'center')
            .style('padding', '50px')
            .style('color', '#e74c3c')
            .text('Error loading data. Please try again.');
    });
