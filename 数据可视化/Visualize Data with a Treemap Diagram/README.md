# Treemap Diagram - Video Game Sales Visualization

A responsive and interactive treemap diagram built with D3.js that visualizes video game sales data across different platforms.

## Features

- **Interactive Treemap**: Visualizes video game sales data with tiles sized according to sales volume
- **Color-coded Categories**: Different colors for each gaming platform
- **Interactive Tooltip**: Hover over tiles to see detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Legend**: Color-coded legend showing all platforms
- **Modern UI**: Clean, modern design with smooth animations

## User Stories Implemented

✅ **User Story #1**: Tree map has a title with `id="title"`
✅ **User Story #2**: Tree map has a description with `id="description"`
✅ **User Story #3**: Tree map has rect elements with `class="tile"` representing data
✅ **User Story #4**: At least 2 different fill colors used for tiles
✅ **User Story #5**: Each tile has `data-name`, `data-category`, and `data-value` properties
✅ **User Story #6**: Tile area corresponds to data-value amount
✅ **User Story #7**: Tree map has a legend with `id="legend"`
✅ **User Story #8**: Legend has rect elements with `class="legend-item"`
✅ **User Story #9**: Legend rect elements use at least 2 different fill colors
✅ **User Story #10**: Mouse hover shows tooltip with `id="tooltip"`
✅ **User Story #11**: Tooltip has `data-value` property corresponding to active area

## Data Source

The visualization uses the Video Game Sales dataset from FreeCodeCamp:
- **Dataset**: Video Game Sales Data
- **Source**: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json
- **Content**: Top 100 video games by global sales across different platforms

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **D3.js v7**: Data visualization library
- **SVG**: Vector graphics for the treemap

## How to Use

1. Open `index.html` in a modern web browser
2. The treemap will automatically load and display the video game sales data
3. Hover over any tile to see detailed information in the tooltip
4. Use the legend to identify different gaming platforms by color

## File Structure

```
Visualize Data with a Treemap Diagram/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # D3.js visualization logic
└── README.md           # Project documentation
```

## Key Features

### Treemap Layout
- Uses D3's `d3.treemap()` layout algorithm
- Tiles are sized proportionally to sales data
- Automatic padding and spacing for visual clarity

### Color Scheme
- Each gaming platform has a unique color
- Color scale uses D3's `scaleOrdinal()` for consistent mapping
- Colors are visually distinct and accessible

### Interactive Elements
- Smooth hover effects with opacity changes
- Detailed tooltips showing game name, platform, and sales
- Responsive tooltip positioning

### Responsive Design
- Mobile-friendly layout
- Flexible container sizing
- Optimized text display for different screen sizes

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Testing

The project is designed to pass all FreeCodeCamp D3.js treemap tests. To run the tests:

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
- Adding additional interactive features

## License

This project is created for educational purposes as part of the FreeCodeCamp Data Visualization certification.
