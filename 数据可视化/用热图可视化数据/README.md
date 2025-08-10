# Heat Map - Global Temperature Data Visualization

A responsive and interactive heat map built with D3.js that visualizes global temperature data over time.

## Features

- **Interactive Heat Map**: Visualizes temperature data with color-coded cells
- **Color-coded Cells**: Different colors representing temperature variations
- **Interactive Tooltip**: Hover over cells to see detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Legend**: Color-coded legend showing temperature variance ranges
- **Modern UI**: Clean, modern design with smooth animations

## Requirements Implemented

✅ **Requirement #1**: Heat map has a title with `id="title"`
✅ **Requirement #2**: Heat map has a description with `id="description"`
✅ **Requirement #3**: Heat map has an x-axis with `id="x-axis"`
✅ **Requirement #4**: Heat map has a y-axis with `id="y-axis"`
✅ **Requirement #5**: Heat map has rect elements with `class="cell"`
✅ **Requirement #6**: At least 4 different fill colors used for cells
✅ **Requirement #7**: Each cell has `data-month`, `data-year`, and `data-temp` properties
✅ **Requirement #8**: Data attributes are within data range
✅ **Requirement #9**: Cells align with y-axis months
✅ **Requirement #10**: Cells align with x-axis years
✅ **Requirement #11**: Y-axis has multiple tick labels with full month names
✅ **Requirement #12**: X-axis has multiple tick labels for years 1754-2015
✅ **Requirement #13**: Heat map has a legend with `id="legend"`
✅ **Requirement #14**: Legend contains rect elements
✅ **Requirement #15**: Legend uses at least 4 different fill colors
✅ **Requirement #16**: Mouse hover shows tooltip with `id="tooltip"`
✅ **Requirement #17**: Tooltip has `data-year` property corresponding to active area

## Data Source

The visualization uses the Global Temperature dataset from FreeCodeCamp:
- **Dataset**: Global Temperature Data
- **Source**: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json
- **Content**: Monthly global land-surface temperature data from 1753 to 2015

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **D3.js v7**: Data visualization library
- **SVG**: Vector graphics for the heat map

## How to Use

1. Open `index.html` in a modern web browser
2. The heat map will automatically load and display global temperature data
3. Hover over any cell to see detailed information in the tooltip
4. Use the legend to understand the color scale for temperature variations

## File Structure

```
用热图可视化数据/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # D3.js visualization logic
├── test.html           # Test page with FreeCodeCamp tests
├── package.json        # Project metadata
└── README.md           # Project documentation
```

## Key Features

### Heat Map Layout
- Uses D3's scaleLinear and scaleBand for proper axis scaling
- Cells are positioned based on year (x-axis) and month (y-axis)
- Color intensity represents temperature variance from baseline

### Color Scheme
- Uses a quantile color scale with 11 different colors
- Colors range from dark blue (cold) to dark red (hot)
- Ensures at least 4 different colors as required

### Interactive Elements
- Smooth hover effects with opacity changes
- Detailed tooltips showing month, year, temperature, and variance
- Responsive tooltip positioning

### Axes
- X-axis shows years from 1754 to 2015 with tick marks every 10 years
- Y-axis shows all 12 months with full month names
- Proper axis labels and formatting

### Legend
- Gradient-based legend showing temperature variance ranges
- Clear labeling with temperature values
- Professional appearance with proper spacing

### Data Processing
- Converts monthly variance data to absolute temperatures
- Handles data range validation
- Proper month indexing for D3 compatibility

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Testing

The project is designed to pass all FreeCodeCamp D3.js heat map tests. To run the tests:

1. Include the FreeCodeCamp test bundle:
   ```html
   <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
   ```

2. All tests should pass automatically when the page loads.

## Customization

You can easily customize the visualization by:

- Changing the color scheme in the `colorScale` definition
- Modifying the dimensions in the margin and size variables
- Adjusting the tooltip content and styling
- Adding additional interactive features like zoom/pan

## Data Interpretation

The heat map shows monthly global land-surface temperature variations from 1753 to 2015. Each cell represents a month-year combination, with colors indicating temperature variance from the baseline temperature of 8.66°C. Darker blue indicates colder temperatures, while darker red indicates warmer temperatures.

## License

This project is created for educational purposes as part of the FreeCodeCamp Data Visualization certification.
