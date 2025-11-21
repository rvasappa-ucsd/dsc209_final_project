// Main JavaScript - Enhanced Visualizations
import { regionalGDPData, healthData, getAllHealthYears, top10Countries } from './data-loader.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
import scrollama from 'https://cdn.jsdelivr.net/npm/scrollama@3.2.0/+esm';

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
// Dark Mode Toggle
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================================
// Scrollytelling with Scrollama
// ===================================
function initScrollytelling() {
  const scroller = scrollama();
  const timelineViz = d3.select('#timeline-viz');
  const yearDisplay = document.getElementById('timeline-year-display');
  
  const width = 800;
  const height = 600;
  
  // Create animated line chart
  const margin = { top: 50, right: 50, bottom: 50, left: 70 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const svg = timelineViz
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  scroller
    .setup({
      step: '.step',
      offset: 0.5,
      debug: false
    })
    .onStepEnter(response => {
      const { element, index } = response;
      
      document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('is-active');
      });
      element.classList.add('is-active');
      
      const year = element.dataset.step;
      yearDisplay.textContent = year;
      updateTimelineViz(year, svg, chartWidth, chartHeight);
    });
  
  window.addEventListener('resize', () => {
    scroller.resize();
  });
}

function updateTimelineViz(year, svg, width, height) {
  const years = Object.keys(regionalGDPData).map(Number);
  const yearIndex = years.indexOf(parseInt(year));
  const dataUpToYear = years.slice(0, yearIndex + 1);
  
  // Prepare data for line chart
  const regions = regionalGDPData[years[0]].map(d => d.region);
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
    .domain([0, d3.max(lineData, d => d3.max(d.values, v => v.gdp))])
    .range([height, 0]);
  
  // Line generator
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.gdp))
    .curve(d3.curveMonotoneX);
  
  // Update lines
  const lines = svg.selectAll('.timeline-line')
    .data(lineData, d => d.region);
  
  lines.enter()
    .append('path')
    .attr('class', 'timeline-line')
    .attr('fill', 'none')
    .attr('stroke', d => d.color)
    .attr('stroke-width', 3)
    .attr('opacity', 0.7)
    .merge(lines)
    .transition()
    .duration(1000)
    .attr('d', d => line(d.values));
  
  // Axes
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
  const yAxis = d3.axisLeft(yScale).ticks(5);
  
  svg.selectAll('.x-axis').remove();
  svg.selectAll('.y-axis').remove();
  
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);
  
  svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);
}

// ===================================
// Stream Graph Visualization
// ===================================
function createStreamGraph() {
  const svg = d3.select('#stream-graph');
  const margin = { top: 40, right: 100, bottom: 40, left: 100 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // Prepare data
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
    .attr('fill', (d, i) => colorScale(d.key))
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
    .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));
  
  // Legend
  const legend = d3.select('#stream-legend');
  regions.forEach((region, i) => {
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
let raceInterval;

function createRacingBars() {
  const playBtn = document.getElementById('race-play-btn');
  
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
  const svg = d3.select('#racing-bars');
  const margin = { top: 60, right: 100, bottom: 40, left: 200 };
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
      document.getElementById('race-play-btn').textContent = '▶ Start Race';
      return;
    }
    
    const year = years[yearIndex];
    const data = healthData[year]
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
      .style('font-size', '2rem')
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
      .merge(bars)
      .transition()
      .duration(800)
      .attr('y', (d, i) => i * (barHeight + 10))
      .attr('width', d => xScale(d.gdpPerCapita));
    
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
      .merge(labels)
      .transition()
      .duration(800)
      .attr('y', (d, i) => i * (barHeight + 10) + barHeight / 2)
      .text(d => d.country);
    
    yearIndex++;
  }
  
  updateRace();
  raceInterval = setInterval(updateRace, 1500);
}

// ===================================
// Initialize Everything
// ===================================
async function init() {
  console.log('🌍 Initializing Echoes of History...');
  
  initParticles();
  animateStats();
  initScrollytelling();
  createStreamGraph();
  createRacingBars();
  
  console.log('✅ All visualizations loaded!');
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
