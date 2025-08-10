# Choropleth Map - US Education Data Visualization

A responsive and interactive choropleth map built with D3.js that visualizes educational attainment data across US counties.

## Features

- **Interactive Choropleth Map**: Visualizes education data with color-coded counties
- **Color-coded Counties**: Different colors representing education levels
- **Interactive Tooltip**: Hover over counties to see detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Legend**: Color-coded legend showing education level ranges
- **Modern UI**: Clean, modern design with smooth animations

## Requirements Implemented

✅ **Requirement #1**: Choropleth map has a title with `id="title"`
✅ **Requirement #2**: Choropleth map has a description with `id="description"`
✅ **Requirement #3**: Choropleth map has counties with `class="county"`
✅ **Requirement #4**: At least 4 different fill colors used for counties
✅ **Requirement #5**: Each county has `data-fips` and `data-education` properties
✅ **Requirement #6**: Every data point has a corresponding county
✅ **Requirement #7**: Counties have matching `data-fips` and `data-education` values
✅ **Requirement #8**: Choropleth map has a legend with `id="legend"`
✅ **Requirement #9**: Legend uses at least 4 different fill colors
✅ **Requirement #10**: Mouse hover shows tooltip with `id="tooltip"`
✅ **Requirement #11**: Tooltip has `data-education` property corresponding to active area

## Data Sources

The visualization uses two datasets from FreeCodeCamp:
- **US Education Data**: https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json
- **US County Data**: https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **D3.js v7**: Data visualization library
- **TopoJSON**: Geographic data format
- **SVG**: Vector graphics for the map

## How to Use

1. Open `index.html` in a modern web browser
2. The choropleth map will automatically load and display US education data
3. Hover over any county to see detailed information in the tooltip
4. Use the legend to understand the color scale for education levels

## File Structure

```
用等值区域图可视化数据/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # D3.js visualization logic
├── test.html           # Test page with FreeCodeCamp tests
├── package.json        # Project metadata
└── README.md           # Project documentation
```

## Key Features

### Choropleth Map
- Uses D3's `d3.geoAlbersUsa()` projection for US map
- Counties are colored based on education attainment percentage
- State boundaries are overlaid for better geographic context

### Color Scheme
- Uses a quantile color scale with 8 different green shades
- Colors range from light green (low education) to dark green (high education)
- Ensures at least 4 different colors as required

### Interactive Elements
- Smooth hover effects with opacity changes
- Detailed tooltips showing county name, state, and education percentage
- Responsive tooltip positioning

### Legend
- Gradient-based legend showing education level ranges
- Clear labeling with percentage values
- Professional appearance with proper spacing

### Data Processing
- Combines TopoJSON county boundaries with education data
- Matches counties by FIPS codes
- Handles missing data gracefully

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Testing

The project is designed to pass all FreeCodeCamp D3.js choropleth map tests. To run the tests:

1. Include the FreeCodeCamp test bundle:
   ```html
   <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
   ```

2. All tests should pass automatically when the page loads.

## Customization

You can easily customize the visualization by:

- Changing the color scheme in the `colorScale` definition
- Modifying the projection or map size
- Adjusting the tooltip content and styling
- Adding additional interactive features like zoom/pan

## Data Interpretation

The map shows the percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014) for each US county. Darker green indicates higher education levels, while lighter green indicates lower education levels.

## License

This project is created for educational purposes as part of the FreeCodeCamp Data Visualization certification.
