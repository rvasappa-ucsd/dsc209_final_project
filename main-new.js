// Main JavaScript - Fixed version with working buttons and clean storytelling
// All data comes from data-loader.js loaded via script tag

// ===================================
// Animated Background Particles
// ===================================
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(102, 126, 234, 0.5)';
    ctx.strokeStyle = 'rgba(102, 126, 234, 0.2)';
    
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connections
      particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.globalAlpha = 1 - dist / 100;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===================================
// Animated Statistics Counter
// ===================================
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    const duration = 2000;
    const start = Date.now();
    
    function update() {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      
      stat.textContent = current + (target > 100 ? '+' : '');
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    update();
  });
}

// ===================================
// Theme Toggle (Default: Dark)
// ===================================
function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.icon');

  // Default to dark mode, allow switching to light
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
  } else {
    // Dark mode by default
    themeIcon.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ===================================
// Smooth Scrolling
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===================================
// Scrollytelling with Scrollama
// ===================================
function initScrollytelling() {
  if (typeof scrollama === 'undefined') {
    console.warn('Scrollama not loaded yet');
    return;
  }

  const scroller = scrollama();
  const steps = document.querySelectorAll('.step');
  
  if (steps.length === 0) {
    console.warn('No steps found for scrollytelling');
    return;
  }

  scroller
    .setup({
      step: '.step',
      offset: 0.6,
      debug: false
    })
    .onStepEnter(response => {
      const { element, index } = response;
      
      // Remove active from all steps
      document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('is-active');
      });
      
      // Add active to current step
      element.classList.add('is-active');
      
      // Update year display
      const year = element.dataset.step;
      const yearDisplay = document.getElementById('timeline-year-display');
      if (yearDisplay) {
        yearDisplay.textContent = year;
      }
      
      // Update visualization
      updateTimelineViz(year);
    });
  
  window.addEventListener('resize', () => {
    scroller.resize();
  });
}

function updateTimelineViz(year) {
  // Access data from global scope (loaded by data-loader.js)
  if (typeof regionalGDPData === 'undefined') {
    console.warn('regionalGDPData not loaded');
    return;
  }

  const svg = d3.select('#timeline-viz');
  svg.selectAll('*').remove(); // Clear previous
  
  const margin = { top: 50, right: 100, bottom: 50, left: 70 };
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const years = Object.keys(regionalGDPData).map(Number);
  const currentYearIndex = years.indexOf(parseInt(year));
  const dataUpToYear = years.slice(0, currentYearIndex + 1);
  
  const regions = regionalGDPData[years[0]].map(d => d.region);
  
  // Prepare line data
  const lineData = regions.map(region => ({
    region: region,
    values: dataUpToYear.map(y => ({
      year: y,
      gdp: regionalGDPData[y].find(d => d.region === region).gdp
    })),
    color: regionalGDPData[years[0]].find(d => d.region === region).color
  }));
  
  // Scales
  const xScale = d3.scaleLinear()
    .domain([years[0], years[years.length - 1]])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(lineData, d => d3.max(d.values, v => v.gdp)) * 1.1])
    .range([height, 0]);
  
  // Line generator
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.gdp))
    .curve(d3.curveMonotoneX);
  
  // Draw lines
  lineData.forEach(d => {
    g.append('path')
      .datum(d.values)
      .attr('fill', 'none')
      .attr('stroke', d.color)
      .attr('stroke-width', 3)
      .attr('opacity', 0.8)
      .attr('d', line);
      
    // Add region label at end
    const lastPoint = d.values[d.values.length - 1];
    g.append('text')
      .attr('x', xScale(lastPoint.year) + 5)
      .attr('y', yScale(lastPoint.gdp))
      .attr('dy', '0.35em')
      .attr('fill', d.color)
      .style('font-size', '12px')
      .style('font-weight', '600')
      .text(d.region);
  });
  
  // Axes
  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
    .style('color', '#999');
  
  g.append('g')
    .call(d3.axisLeft(yScale).ticks(5))
    .style('color', '#999');
    
  // Y-axis label
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -50)
    .attr('x', -height / 2)
    .attr('text-anchor', 'middle')
    .style('fill', '#999')
    .style('font-size', '14px')
    .text('GDP (Trillions USD)');
}

// ===================================
// Stream Graph
// ===================================
function createStreamGraph() {
  if (typeof regionalGDPData === 'undefined') return;
  
  const svg = d3.select('#stream-graph');
  svg.selectAll('*').remove();
  
  const margin = { top: 40, right: 100, bottom: 40, left: 100 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const years = Object.keys(regionalGDPData).map(Number);
  const regions = regionalGDPData[years[0]].map(d => d.region);
  
  const stackData = years.map(year => {
    const obj = { year: year };
    regionalGDPData[year].forEach(d => {
      obj[d.region] = d.gdp;
    });
    return obj;
  });
  
  const stack = d3.stack()
    .keys(regions)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);
  
  const series = stack(stackData);
  
  const xScale = d3.scaleLinear()
    .domain(d3.extent(years))
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([
      d3.min(series, s => d3.min(s, d => d[0])),
      d3.max(series, s => d3.max(s, d => d[1]))
    ])
    .range([height, 0]);
  
  const colorScale = d3.scaleOrdinal()
    .domain(regions)
    .range(d3.schemeTableau10);
  
  const area = d3.area()
    .x(d => xScale(d.data.year))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveCatmullRom);
  
  g.selectAll('path')
    .data(series)
    .join('path')
    .attr('fill', d => colorScale(d.key))
    .attr('d', area)
    .attr('opacity', 0.8)
    .on('mouseenter', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 1)
        .attr('stroke', '#000')
        .attr('stroke-width', 2);
    })
    .on('mouseleave', function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('opacity', 0.8)
        .attr('stroke', 'none');
    });
  
  // Axes
  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
    .style('color', '#999');
  
  // Legend
  const legend = d3.select('#stream-legend');
  legend.selectAll('*').remove();
  regions.forEach(region => {
    const item = legend.append('div').attr('class', 'legend-item');
    item.append('div')
      .attr('class', 'legend-color')
      .style('background', colorScale(region));
    item.append('span').text(region);
  });
}

// ===================================
// Racing Bar Chart
// ===================================
let raceInterval = null;

function createRacingBars() {
  const playBtn = document.getElementById('race-play-btn');
  
  if (!playBtn) {
    console.warn('Race play button not found');
    return;
  }
  
  playBtn.addEventListener('click', () => {
    if (raceInterval) {
      clearInterval(raceInterval);
      raceInterval = null;
      playBtn.textContent = '▶ Start Race';
    } else {
      startRace();
      playBtn.textContent = '⏸ Pause';
    }
  });
}

function startRace() {
  if (typeof healthData === 'undefined') {
    console.warn('healthData not loaded');
    return;
  }

  const svg = d3.select('#racing-bars');
  svg.selectAll('*').remove();
  
  const margin = { top: 80, right: 100, bottom: 40, left: 200 };
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const years = Object.keys(healthData).map(Number);
  let yearIndex = 0;
  
  const barHeight = height / 10 - 10;
  
  function updateRace() {
    if (yearIndex >= years.length) {
      clearInterval(raceInterval);
      raceInterval = null;
      const btn = document.getElementById('race-play-btn');
      if (btn) btn.textContent = '▶ Start Race';
      return;
    }
    
    const year = years[yearIndex];
    const data = healthData[year]
      .slice()
      .sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)
      .slice(0, 10);
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.gdpPerCapita)])
      .range([0, width]);
    
    // Update year display
    svg.selectAll('.year-label').remove();
    svg.append('text')
      .attr('class', 'year-label')
      .attr('x', width / 2 + margin.left)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '3rem')
      .style('font-weight', '800')
      .style('fill', '#667eea')
      .text(year);
    
    // Update bars
    const bars = g.selectAll('.race-bar')
      .data(data, d => d.country);
    
    bars.enter()
      .append('rect')
      .attr('class', 'race-bar')
      .attr('x', 0)
      .attr('y', (d, i) => i * (barHeight + 10))
      .attr('height', barHeight)
      .attr('fill', '#667eea')
      .attr('rx', 5)
      .merge(bars)
      .transition()
      .duration(800)
      .attr('y', (d, i) => i * (barHeight + 10))
      .attr('width', d => xScale(d.gdpPerCapita));
    
    bars.exit().remove();
    
    // Update labels
    const labels = g.selectAll('.race-label')
      .data(data, d => d.country);
    
    labels.enter()
      .append('text')
      .attr('class', 'race-label')
      .attr('x', -10)
      .attr('y', (d, i) => i * (barHeight + 10) + barHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('font-weight', '600')
      .style('font-size', '14px')
      .merge(labels)
      .transition()
      .duration(800)
      .attr('y', (d, i) => i * (barHeight + 10) + barHeight / 2)
      .text(d => d.country);
    
    labels.exit().remove();
    
    // Update values
    const values = g.selectAll('.race-value')
      .data(data, d => d.country);
    
    values.enter()
      .append('text')
      .attr('class', 'race-value')
      .attr('x', d => xScale(d.gdpPerCapita) + 5)
      .attr('y', (d, i) => i * (barHeight + 10) + barHeight / 2)
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('fill', '#667eea')
      .merge(values)
      .transition()
      .duration(800)
      .attr('x', d => xScale(d.gdpPerCapita) + 5)
      .attr('y', (d, i) => i * (barHeight + 10) + barHeight / 2)
      .text(d => '$' + d.gdpPerCapita.toLocaleString());
    
    values.exit().remove();
    
    yearIndex++;
  }
  
  updateRace();
  raceInterval = setInterval(updateRace, 1500);
}

// ===================================
// Bubble Chart with Animation
// ===================================
let bubbleInterval = null;

function createBubbleChart() {
  if (typeof healthData === 'undefined') return;
  
  const svg = d3.select('#bubble-chart');
  const margin = { top: 60, right: 100, bottom: 60, left: 80 };
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const years = Object.keys(healthData).map(Number);
  let currentYearIndex = years.length - 1;
  
  // Scales
  const xScale = d3.scaleLog()
    .domain([80, 80000])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([35, 85])
    .range([height, 0]);
  
  const sizeScale = d3.scaleSqrt()
    .domain([0, 1500000000])
    .range([5, 50]);
  
  const colorScale = d3.scaleOrdinal()
    .domain(['North America', 'Europe', 'East Asia', 'South Asia', 'Africa', 'Latin America'])
    .range(['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949']);
  
  // Axes
  const xAxis = g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5, '$,.0f'))
    .style('color', '#999');
  
  const yAxis = g.append('g')
    .call(d3.axisLeft(yScale))
    .style('color', '#999');
  
  // Axis labels
  g.append('text')
    .attr('x', width / 2)
    .attr('y', height + 45)
    .attr('text-anchor', 'middle')
    .style('fill', '#999')
    .style('font-size', '14px')
    .text('GDP per Capita ($)');
  
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -60)
    .attr('x', -height / 2)
    .attr('text-anchor', 'middle')
    .style('fill', '#999')
    .style('font-size', '14px')
    .text('Life Expectancy (years)');
  
  // Year display
  const yearLabel = svg.append('text')
    .attr('x', width / 2 + margin.left)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .style('font-size', '2.5rem')
    .style('font-weight', '800')
    .style('fill', '#667eea')
    .style('opacity', 0.3);
  
  function updateBubbles(yearIndex) {
    const year = years[yearIndex];
    const data = healthData[year];
    
    yearLabel.text(year);
    
    const bubbles = g.selectAll('.bubble')
      .data(data, d => d.country);
    
    bubbles.enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => xScale(d.gdpPerCapita))
      .attr('cy', d => yScale(d.lifeExpectancy))
      .attr('r', 0)
      .attr('fill', d => colorScale(d.region || 'Other'))
      .attr('opacity', 0.7)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .merge(bubbles)
      .transition()
      .duration(800)
      .attr('cx', d => xScale(d.gdpPerCapita))
      .attr('cy', d => yScale(d.lifeExpectancy))
      .attr('r', d => sizeScale(d.population));
    
    bubbles.exit().transition().duration(300).attr('r', 0).remove();
  }
  
  // Slider control
  const slider = document.getElementById('bubble-year-slider');
  const yearDisplay = document.getElementById('bubble-year-display');
  
  slider.addEventListener('input', (e) => {
    const yearIndex = Math.round((e.target.value - 1960) / 10);
    currentYearIndex = Math.max(0, Math.min(yearIndex, years.length - 1));
    yearDisplay.textContent = years[currentYearIndex];
    updateBubbles(currentYearIndex);
  });
  
  // Play button
  const playBtn = document.getElementById('bubble-play-btn');
  playBtn.addEventListener('click', () => {
    if (bubbleInterval) {
      clearInterval(bubbleInterval);
      bubbleInterval = null;
      playBtn.textContent = '▶ Animate';
    } else {
      currentYearIndex = 0;
      playBtn.textContent = '⏸ Pause';
      
      bubbleInterval = setInterval(() => {
        if (currentYearIndex >= years.length - 1) {
          clearInterval(bubbleInterval);
          bubbleInterval = null;
          playBtn.textContent = '▶ Animate';
          return;
        }
        currentYearIndex++;
        slider.value = years[currentYearIndex];
        yearDisplay.textContent = years[currentYearIndex];
        updateBubbles(currentYearIndex);
      }, 1000);
    }
  });
  
  // Initial render
  updateBubbles(currentYearIndex);
  
  // Legend
  const legend = d3.select('#bubble-legend');
  legend.selectAll('*').remove();
  ['North America', 'Europe', 'East Asia', 'South Asia', 'Africa', 'Latin America'].forEach(region => {
    const item = legend.append('div').attr('class', 'legend-item');
    item.append('div')
      .attr('class', 'legend-color')
      .style('background', colorScale(region));
    item.append('span').text(region);
  });
}

// ===================================
// Simple World Map Visualization
// ===================================
function createWorldMap() {
  const mapContainer = document.getElementById('world-map');
  if (!mapContainer) return;
  
  mapContainer.innerHTML = '<p style="text-align:center; padding: 100px 20px; color: #999;">World map visualization requires Mapbox token configuration. See README for setup instructions.</p>';
  
  // Map controls
  const playBtn = document.getElementById('play-pause-btn');
  const yearSlider = document.getElementById('map-year-slider');
  const yearDisplay = document.getElementById('map-year-display');
  
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      alert('Map animation requires Mapbox configuration. This is a placeholder.');
    });
  }
  
  if (yearSlider) {
    yearSlider.addEventListener('input', (e) => {
      if (yearDisplay) {
        yearDisplay.textContent = e.target.value;
      }
    });
  }
}

// ===================================
// Radar Chart
// ===================================
function createRadarChart() {
  if (typeof healthData === 'undefined') return;
  
  const svg = d3.select('#radar-chart');
  const size = 700;
  const margin = 100;
  const radius = (size - margin * 2) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  
  svg.selectAll('*').remove();
  
  const g = svg.append('g')
    .attr('transform', `translate(${centerX}, ${centerY})`);
  
  // Sample data for 2020
  const data2020 = healthData[2020] || [];
  const selectedCountries = data2020.slice(0, 5);
  
  // Indicators (normalized 0-1)
  const indicators = ['GDP', 'Life Exp', 'Population'];
  const numIndicators = indicators.length;
  
  // Create radar grid
  const levels = 5;
  for (let i = 1; i <= levels; i++) {
    const levelRadius = (radius / levels) * i;
    g.append('circle')
      .attr('r', levelRadius)
      .attr('fill', 'none')
      .attr('stroke', '#444')
      .attr('stroke-width', 1);
  }
  
  // Create axes
  indicators.forEach((indicator, i) => {
    const angle = (Math.PI * 2 * i) / numIndicators - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', y)
      .attr('stroke', '#666')
      .attr('stroke-width', 1);
    
    g.append('text')
      .attr('x', Math.cos(angle) * (radius + 20))
      .attr('y', Math.sin(angle) * (radius + 20))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('fill', '#999')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .text(indicator);
  });
  
  // Placeholder message
  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .style('fill', '#999')
    .style('font-size', '16px')
    .text('Radar chart data processing...');
}

// ===================================
// Trajectory Chart
// ===================================
function createTrajectoryChart() {
  if (typeof healthData === 'undefined') return;
  
  const svg = d3.select('#trajectory-chart');
  svg.selectAll('*').remove();
  
  const margin = { top: 60, right: 100, bottom: 60, left: 80 };
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const years = Object.keys(healthData).map(Number);
  
  // Get trajectory data for selected countries
  const selectedCountries = ['United States', 'China', 'India', 'Germany', 'Brazil', 'Nigeria'];
  const trajectories = selectedCountries.map(country => ({
    country: country,
    values: years.map(year => {
      const d = healthData[year].find(c => c.country === country);
      return d ? { year, gdp: d.gdpPerCapita, life: d.lifeExpectancy } : null;
    }).filter(d => d !== null)
  }));
  
  // Scales
  const xScale = d3.scaleLog()
    .domain([80, 80000])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([35, 85])
    .range([height, 0]);
  
  const colorScale = d3.scaleOrdinal()
    .domain(selectedCountries)
    .range(d3.schemeTableau10);
  
  // Line generator
  const line = d3.line()
    .x(d => xScale(d.gdp))
    .y(d => yScale(d.life))
    .curve(d3.curveMonotoneX);
  
  // Draw trajectories
  trajectories.forEach(traj => {
    g.append('path')
      .datum(traj.values)
      .attr('fill', 'none')
      .attr('stroke', colorScale(traj.country))
      .attr('stroke-width', 3)
      .attr('opacity', 0.7)
      .attr('d', line);
    
    // Add start and end points
    const start = traj.values[0];
    const end = traj.values[traj.values.length - 1];
    
    g.append('circle')
      .attr('cx', xScale(start.gdp))
      .attr('cy', yScale(start.life))
      .attr('r', 5)
      .attr('fill', colorScale(traj.country));
    
    g.append('circle')
      .attr('cx', xScale(end.gdp))
      .attr('cy', yScale(end.life))
      .attr('r', 7)
      .attr('fill', colorScale(traj.country))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);
  });
  
  // Axes
  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5, '$,.0f'))
    .style('color', '#999');
  
  g.append('g')
    .call(d3.axisLeft(yScale))
    .style('color', '#999');
  
  // Axis labels
  g.append('text')
    .attr('x', width / 2)
    .attr('y', height + 45)
    .attr('text-anchor', 'middle')
    .style('fill', '#999')
    .text('GDP per Capita ($)');
  
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -60)
    .attr('x', -height / 2)
    .attr('text-anchor', 'middle')
    .style('fill', '#999')
    .text('Life Expectancy (years)');
  
  // Legend
  const legend = d3.select('#trajectory-legend');
  legend.selectAll('*').remove();
  selectedCountries.forEach(country => {
    const item = legend.append('div').attr('class', 'legend-item');
    item.append('div')
      .attr('class', 'legend-color')
      .style('background', colorScale(country));
    item.append('span').text(country);
  });
}

// ===================================
// Initialize Everything
// ===================================
function init() {
  console.log('🌍 Initializing Echoes of History...');
  
  // Wait a bit for all scripts to load
  setTimeout(() => {
    initParticles();
    animateStats();
    initDarkMode();
    initSmoothScroll();
    initScrollytelling();
    createWorldMap();
    createStreamGraph();
    createRacingBars();
    createBubbleChart();
    createRadarChart();
    createTrajectoryChart();
    
    console.log('✅ All visualizations loaded!');
  }, 100);
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
