# Scatter Plot - Doping in Professional Bicycle Racing

A responsive and interactive scatter plot built with D3.js that visualizes doping allegations in professional bicycle racing.

## Features

- **Interactive Scatter Plot**: Visualizes race times vs years with doping allegations
- **Color-coded Dots**: Different colors representing doping allegations
- **Interactive Tooltip**: Hover over dots to see detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Legend**: Color-coded legend showing doping categories
- **Modern UI**: Clean, modern design with smooth animations

## Requirements Implemented

✅ **Requirement #1**: Scatter plot has a title with `id="title"`
✅ **Requirement #2**: Scatter plot has an x-axis with `id="x-axis"`
✅ **Requirement #3**: Scatter plot has a y-axis with `id="y-axis"`
✅ **Requirement #4**: Scatter plot has dots with `class="dot"`
✅ **Requirement #5**: Each dot has `data-xvalue` and `data-yvalue` properties
✅ **Requirement #6**: Data attributes are within range and format correctly
✅ **Requirement #7**: Data-xvalue aligns with x-axis
✅ **Requirement #8**: Data-yvalue aligns with y-axis
✅ **Requirement #9**: Y-axis has multiple time format %M:%S tick labels
✅ **Requirement #10**: X-axis has multiple year tick labels
✅ **Requirement #11**: X-axis labels are within actual data range
✅ **Requirement #12**: Y-axis labels are within actual data range
✅ **Requirement #13**: Scatter plot has legend with `id="legend"`
✅ **Requirement #14**: Mouse hover shows tooltip with `id="tooltip"`
✅ **Requirement #15**: Tooltip has `data-year` property corresponding to active area

## Data Source

The visualization uses the Cyclist Data dataset from FreeCodeCamp:
- **Dataset**: Cyclist Data
- **Source**: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json
- **Content**: Professional bicycle racing data with doping allegations

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **D3.js v7**: Data visualization library
- **SVG**: Vector graphics for the scatter plot

## How to Use

1. Open `index.html` in a modern web browser
2. The scatter plot will automatically load and display cyclist data
3. Hover over any dot to see detailed information in the tooltip
4. Use the legend to understand the color coding for doping allegations

## File Structure

```
用散点图可视化数据/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # D3.js visualization logic
├── test.html           # Test page with FreeCodeCamp tests
├── package.json        # Project metadata
└── README.md           # Project documentation
```

## Key Features

### Scatter Plot Layout
- Uses D3's scaleTime for proper time-based axis scaling
- Dots are positioned based on year (x-axis) and race time (y-axis)
- Color coding indicates doping allegations

### Data Processing
- Converts time strings to Date objects for proper scaling
- Handles year data as Date objects for consistency
- Proper data validation and range checking

### Interactive Elements
- Smooth hover effects with opacity changes
- Detailed tooltips showing cyclist name, time, year, and doping status
- Responsive tooltip positioning

### Axes
- X-axis shows years with proper tick formatting
- Y-axis shows time in MM:SS format
- Proper axis labels and formatting

### Legend
- Color-coded legend showing doping categories
- Clear labeling with descriptive text
- Professional appearance with proper spacing

### Color Scheme
- Blue dots: No doping allegations
- Red dots: Doping allegations
- Clear visual distinction between categories

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Testing

The project is designed to pass all FreeCodeCamp D3.js scatter plot tests. To run the tests:

1. Include the FreeCodeCamp test bundle:
   ```html
   <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
   ```

2. All tests should pass automatically when the page loads.

## Customization

You can easily customize the visualization by:

- Changing the color scheme in the dot fill colors
- Modifying the dimensions in the margin and size variables
- Adjusting the tooltip content and styling
- Adding additional interactive features like zoom/pan

## Data Interpretation

The scatter plot shows the relationship between race times and years in professional bicycle racing. Each dot represents a cyclist, with the x-axis showing the year and the y-axis showing their race time. The color coding helps identify patterns in doping allegations over time, making it easy to spot trends and correlations.

## License

This project is created for educational purposes as part of the FreeCodeCamp Data Visualization certification.
