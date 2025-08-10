// US Education Choropleth Map
// Using D3.js to create an interactive choropleth map visualization

// Set up dimensions and margins
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Color scale for education levels (at least 4 different colors)
const colorScale = d3.scaleQuantile()
    .domain([0, 100])
    .range([
        '#e8f5e8',  // Light green
        '#c7e9c0',  // Light green
        '#a1d99b',  // Medium green
        '#74c476',  // Green
        '#41ab5d',  // Dark green
        '#238b45',  // Darker green
        '#006d2c',  // Very dark green
        '#00441b'   // Darkest green
    ]);

// Create SVG container
const svg = d3.select('#choropleth')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Create tooltip
const tooltip = d3.select('#tooltip');

// Create projection and path generator
const projection = d3.geoAlbersUsa()
    .fitSize([width, height], null);

const path = d3.geoPath().projection(projection);

// Load data
Promise.all([
    d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'),
    d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
])
.then(([countiesData, educationData]) => {
    // Create a map of FIPS codes to education data
    const educationMap = {};
    educationData.forEach(d => {
        educationMap[d.fips] = d;
    });

    // Convert TopoJSON to GeoJSON
    const counties = topojson.feature(countiesData, countiesData.objects.counties);
    const states = topojson.feature(countiesData, countiesData.objects.states);

    // Add education data to counties
    counties.features.forEach(feature => {
        const fips = feature.id;
        const educationInfo = educationMap[fips];
        if (educationInfo) {
            feature.properties.education = educationInfo.bachelorsOrHigher;
            feature.properties.area_name = educationInfo.area_name;
            feature.properties.state = educationInfo.state;
        }
    });

    // Create color scale domain based on actual data
    const educationValues = counties.features
        .map(d => d.properties.education)
        .filter(d => d !== undefined);
    
    colorScale.domain(d3.extent(educationValues));

    // Draw counties
    svg.selectAll('.county')
        .data(counties.features)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('d', path)
        .attr('fill', d => {
            const education = d.properties.education;
            return education ? colorScale(education) : '#ccc';
        })
        .attr('data-fips', d => d.id)
        .attr('data-education', d => d.properties.education || 0)
        .on('mouseover', function(event, d) {
            if (d.properties.education !== undefined) {
                // Show tooltip
                tooltip.style('opacity', 1)
                    .attr('data-education', d.properties.education)
                    .html(`
                        <div class="tooltip-title">${d.properties.area_name}, ${d.properties.state}</div>
                        <div class="tooltip-education">${d.properties.education}%</div>
                    `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            }
        })
        .on('mouseout', function() {
            // Hide tooltip
            tooltip.style('opacity', 0);
        });

    // Draw state boundaries
    svg.append('path')
        .datum(states)
        .attr('class', 'state')
        .attr('d', path);

    // Create legend
    createLegend();
})
.catch(error => {
    console.error('Error loading data:', error);
    d3.select('#choropleth')
        .append('div')
        .style('text-align', 'center')
        .style('padding', '50px')
        .style('color', '#e74c3c')
        .text('Error loading data. Please try again.');
});

// Function to create legend
function createLegend() {
    const legendWidth = 300;
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
        .domain([0, 100])
        .range([0, legendWidth]);

    // Create legend axis
    const legendAxis = d3.axisBottom(legendScale)
        .tickValues(colorScale.quantiles())
        .tickFormat(d3.format('.0f'));

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
    const stops = [0, 0.2, 0.4, 0.6, 0.8, 1];
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
        .text('Education Level (%)');
}
