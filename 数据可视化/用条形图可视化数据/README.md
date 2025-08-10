# Bar Chart - US GDP Data Visualization

A responsive and interactive bar chart built with D3.js that visualizes US GDP data over time.

## Features

- **Interactive Bar Chart**: Visualizes US GDP data with time-based x-axis
- **Responsive Bars**: Bar heights accurately represent GDP values
- **Interactive Tooltip**: Hover over bars to see detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, modern design with smooth animations

## Requirements Implemented

✅ **Requirement #1**: Chart has a title with `id="title"`
✅ **Requirement #2**: Chart has an x-axis with `id="x-axis"`
✅ **Requirement #3**: Chart has a y-axis with `id="y-axis"`
✅ **Requirement #4**: Both axes contain multiple tick labels with `class="tick"`
✅ **Requirement #5**: Each data point has a rect element with `class="bar"`
✅ **Requirement #6**: Each .bar has `data-date` and `data-gdp` properties
✅ **Requirement #7**: .bar data-date attributes match data order
✅ **Requirement #8**: .bar data-gdp attributes match data order
✅ **Requirement #9**: .bar heights accurately represent GDP values
✅ **Requirement #10**: data-date aligns with x-axis values
✅ **Requirement #11**: data-gdp aligns with y-axis values
✅ **Requirement #12**: Mouse hover shows tooltip with `id="tooltip"`
✅ **Requirement #13**: Tooltip has `data-date` property corresponding to active area

## Data Source

The visualization uses the US GDP dataset from FreeCodeCamp:
- **Dataset**: US GDP Data
- **Source**: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json
- **Content**: Quarterly US GDP data over time

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **D3.js v7**: Data visualization library
- **SVG**: Vector graphics for the bar chart

## How to Use

1. Open `index.html` in a modern web browser
2. The bar chart will automatically load and display US GDP data
3. Hover over any bar to see detailed information in the tooltip
4. Observe the GDP trends over time

## File Structure

```
用条形图可视化数据/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # D3.js visualization logic
├── test.html           # Test page with FreeCodeCamp tests
├── package.json        # Project metadata
└── README.md           # Project documentation
```

## Key Features

### Bar Chart Layout
- Uses D3's scaleTime for proper time-based x-axis scaling
- Uses D3's scaleLinear for GDP value scaling on y-axis
- Bars are positioned based on date (x-axis) and GDP value (y-axis)
- Bar heights accurately represent GDP values

### Data Processing
- Converts date strings to Date objects for proper scaling
- Converts GDP values to numbers for accurate calculations
- Proper data validation and range checking

### Interactive Elements
- Smooth hover effects with opacity changes
- Detailed tooltips showing date and GDP value
- Responsive tooltip positioning

### Axes
- X-axis shows years with proper tick formatting
- Y-axis shows GDP values in dollar format
- Proper axis labels and formatting

### Bar Styling
- Professional blue color scheme
- Smooth transitions and hover effects
- Proper stroke and fill styling

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Testing

The project is designed to pass all FreeCodeCamp D3.js bar chart tests. To run the tests:

1. Include the FreeCodeCamp test bundle:
   ```html
   <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
   ```

2. All tests should pass automatically when the page loads.

## Customization

You can easily customize the visualization by:

- Changing the color scheme in the bar fill colors
- Modifying the dimensions in the margin and size variables
- Adjusting the tooltip content and styling
- Adding additional interactive features like zoom/pan

## Data Interpretation

The bar chart shows US GDP trends over time, with each bar representing a quarterly GDP measurement. The x-axis shows the time period, while the y-axis shows the GDP value in billions of dollars. This visualization makes it easy to identify economic trends, growth periods, and recessions.

## License

This project is created for educational purposes as part of the FreeCodeCamp Data Visualization certification.
