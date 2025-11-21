# Echoes of History

An Interactive Exploration of Human Development (1960-2020)

## Project Overview

**Echoes of History** is a stunning, interactive data visualization that chronicles 60 years of global development through World Bank indicators. This prototype features cutting-edge animations, modern design aesthetics, and advanced visualization techniques to tell the story of human progress across 250+ countries from 1960 to 2020.

## ✨ Features

### Advanced Visualizations
1. **Animated Particle Background** - Dynamic particle network with connected nodes creating an immersive atmosphere
2. **Stream Graph** - Flowing area chart showing regional GDP evolution over 7 decades with smooth animations
3. **Racing Bar Chart** - Play/pause animated bar chart racing through time, showing top 10 countries
4. **Interactive Scrollytelling Timeline** - Narrative journey through 7 decades (1960-2020) with animated line charts
5. **Choropleth World Map** - Geographic visualization with color encoding (ready for Mapbox integration)
6. **Bubble Chart** - Multi-dimensional scatter plot with animated transitions
7. **Radar Chart** - Multi-indicator comparison across countries
8. **Trajectory Visualization** - Connected scatter plot showing development paths

### Visual Design
- **Glitch Effect Hero** - Eye-catching animated title with digital glitch aesthetics
- **Gradient Design System** - Modern purple/violet gradients throughout (custom CSS variables)
- **Animated Statistics** - Counter animation showing key metrics (250+ countries, 60 years, 20 indicators)
- **Smooth Transitions** - Pulse, bounce, scroll, and shimmer animations
- **Modern Card Design** - Timeline steps with gradient borders and shadow effects
- **Dark Mode Toggle** - Persistent theme switching with localStorage

### Technologies
- **HTML5** - Semantic structure with canvas elements
- **CSS3** - Custom properties, gradients, keyframe animations, responsive design
- **JavaScript ES6+** - Modules, async/await, D3.js v7.9.0, Scrollama.js
- **D3.js** - Advanced visualizations with smooth transitions
- **Mapbox GL JS** - Interactive geospatial mapping
- **Scrollama.js** - Scroll-driven storytelling

## Project Structure

```
dsc209_final_project/
├── index.html           # Main HTML with particle canvas and hero sections
├── style.css            # Modern CSS with gradients and animations
├── main.js              # Particle animation, counters, visualizations
├── data-loader.js       # Complete 1960-2020 time series data
├── gdp-viz.js           # GDP visualization module
├── health-viz.js        # Health vs wealth visualization
├── map-viz.js           # Mapbox choropleth integration
└── README.md            # This file
```

## 🚀 Quick Start

### View Live Demo
Visit: `https://rvasappa-ucsd.github.io/dsc209_final_project/`

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rvasappa-ucsd/dsc209_final_project.git
   cd dsc209_final_project
   ```

2. **Serve locally**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use VS Code Live Server extension
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

4. **Optional: Add Mapbox Token for Map**
   - Sign up at [mapbox.com](https://mapbox.com)
   - Get your access token
   - Open `map-viz.js` and add your token

## 🎨 Implementation Highlights

### Particle Animation System
- Canvas-based particle network with physics simulation
- Dynamic connections between nearby particles
- Responsive to window resizing
- Subtle opacity for atmospheric effect

### Animated Statistics Counter
- Smooth easing function (cubic ease-out)
- Counts from 0 to target over 2 seconds
- Applied to hero section metrics

### Stream Graph
- D3.js stack layout with wiggle offset
- Smooth catmull-rom curves
- Interactive hover effects with stroke highlighting
- Color-coded by region with legend

### Racing Bar Chart
- Play/pause functionality for time animation
- Smooth bar transitions over 800ms
- Top 10 countries racing through decades
- Year label with prominent display

### Scrollytelling Timeline
- 7 decades of historical context (1960-2020)
- Animated multi-line chart showing regional GDP
- Scroll-triggered transitions
- Detailed statistics for each decade

### Modern CSS Design
- CSS custom properties for consistent theming
- Gradient system (--gradient-1 through --gradient-4)
- Keyframe animations: glitch, pulse, bounce, scroll, shimmer
- Responsive typography with clamp()
- Modern card design with gradient borders

## 📊 Data Source

**World Bank Development Indicators (1960-2020)**

The visualization uses comprehensive time-series data covering:
- **250+ countries** across 7 regions
- **20+ indicators** including GDP, life expectancy, population
- **7 decades** of data (1960, 1970, 1980, 1990, 2000, 2010, 2020)
- Regional aggregations for North America, Europe, East Asia, South Asia, Africa, Latin America, Middle East

Full dataset: [World Bank Data by Indicators](https://github.com/light-and-salt/World-Bank-Data-by-Indicators)

## 🎯 Key Metrics

- **250+ Countries**: Comprehensive global coverage
- **60 Years**: Complete timeline from 1960 to 2020
- **20 Indicators**: Multi-dimensional development metrics
- **7 Regions**: Regional aggregations and comparisons

## 👥 Team Members

- Camila Paik - capaik@ucsd.edu
- Gabrielle Despaigne - gdespaigne@ucsd.edu
- Harsh Arya - harya@ucsd.edu
- Raghav Vasappanavara - rvasappanavara@ucsd.edu

**Course**: DSC 209R - Data Visualization, Fall 2025, UC San Diego

## 📝 License

This project is for educational purposes as part of DSC 209R coursework.

## 🙏 Acknowledgments

- D3.js community for powerful visualization library
- Mapbox for geospatial mapping platform
- World Bank for comprehensive development data
- Scrollama.js for scroll-driven storytelling framework
