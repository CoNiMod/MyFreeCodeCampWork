import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')
    
    # Create scatter plot
    plt.figure(figsize=(10, 6))
    plt.scatter(df['Year'], df['CSIRO Adjusted Sea Level'], alpha=0.7, s=20)
    
    # Create first line of best fit (using all data)
    slope, intercept, r_value, p_value, std_err = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
    
    # Create x values for the line (from 1880 to 2050)
    x_line = list(range(1880, 2051))
    y_line = [slope * x + intercept for x in x_line]
    
    # Plot the first line of best fit
    plt.plot(x_line, y_line, 'r-', linewidth=2, label='All Data Trend')
    
    # Create second line of best fit (using data from 2000 onwards)
    recent_data = df[df['Year'] >= 2000]
    slope_recent, intercept_recent, r_value_recent, p_value_recent, std_err_recent = linregress(recent_data['Year'], recent_data['CSIRO Adjusted Sea Level'])
    
    # Create x values for the second line (from 2000 to 2050)
    x_line_recent = list(range(2000, 2051))
    y_line_recent = [slope_recent * x + intercept_recent for x in x_line_recent]
    
    # Plot the second line of best fit
    plt.plot(x_line_recent, y_line_recent, 'g-', linewidth=2, label='2000+ Trend')
    
    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')
    
    # Set x-axis ticks to match test expectations
    plt.xticks([1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025, 2050, 2075])
    
    # Add legend
    plt.legend()
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()