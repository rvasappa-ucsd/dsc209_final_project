// Enhanced World Bank Development Data with complete time series

export const regionalGDPData = {
  1960: [
    { region: 'North America', gdp: 0.58, population: 199, color: '#4e79a7' },
    { region: 'Europe', gdp: 0.52, population: 423, color: '#f28e2c' },
    { region: 'East Asia', gdp: 0.08, population: 705, color: '#e15759' },
    { region: 'South Asia', gdp: 0.04, population: 572, color: '#76b7b2' },
    { region: 'Africa', gdp: 0.05, population: 285, color: '#59a14f' },
    { region: 'Latin America', gdp: 0.11, population: 221, color: '#edc949' },
    { region: 'Middle East', gdp: 0.03, population: 52, color: '#af7aa1' }
  ],
  1970: [
    { region: 'North America', gdp: 1.18, population: 232, color: '#4e79a7' },
    { region: 'Europe', gdp: 1.36, population: 462, color: '#f28e2c' },
    { region: 'East Asia', gdp: 0.27, population: 978, color: '#e15759' },
    { region: 'South Asia', gdp: 0.08, population: 710, color: '#76b7b2' },
    { region: 'Africa', gdp: 0.10, population: 366, color: '#59a14f' },
    { region: 'Latin America', gdp: 0.23, population: 286, color: '#edc949' },
    { region: 'Middle East', gdp: 0.07, population: 72, color: '#af7aa1' }
  ],
  1980: [
    { region: 'North America', gdp: 2.95, population: 256, color: '#4e79a7' },
    { region: 'Europe', gdp: 3.98, population: 487, color: '#f28e2c' },
    { region: 'East Asia', gdp: 0.79, population: 1170, color: '#e15759' },
    { region: 'South Asia', gdp: 0.23, population: 918, color: '#76b7b2' },
    { region: 'Africa', gdp: 0.31, population: 478, color: '#59a14f' },
    { region: 'Latin America', gdp: 0.87, population: 362, color: '#edc949' },
    { region: 'Middle East', gdp: 0.41, population: 104, color: '#af7aa1' }
  ],
  1990: [
    { region: 'North America', gdp: 6.23, population: 283, color: '#4e79a7' },
    { region: 'Europe', gdp: 8.47, population: 503, color: '#f28e2c' },
    { region: 'East Asia', gdp: 1.87, population: 1373, color: '#e15759' },
    { region: 'South Asia', gdp: 0.42, population: 1166, color: '#76b7b2' },
    { region: 'Africa', gdp: 0.38, population: 632, color: '#59a14f' },
    { region: 'Latin America', gdp: 1.15, population: 443, color: '#edc949' },
    { region: 'Middle East', gdp: 0.48, population: 141, color: '#af7aa1' }
  ],
  2000: [
    { region: 'North America', gdp: 11.05, population: 316, color: '#4e79a7' },
    { region: 'Europe', gdp: 9.49, population: 536, color: '#f28e2c' },
    { region: 'East Asia', gdp: 4.16, population: 1492, color: '#e15759' },
    { region: 'South Asia', gdp: 0.76, population: 1426, color: '#76b7b2' },
    { region: 'Africa', gdp: 0.60, population: 814, color: '#59a14f' },
    { region: 'Latin America', gdp: 2.18, population: 523, color: '#edc949' },
    { region: 'Middle East', gdp: 0.82, population: 190, color: '#af7aa1' }
  ],
  2010: [
    { region: 'North America', gdp: 15.53, population: 345, color: '#4e79a7' },
    { region: 'Europe', gdp: 16.31, population: 605, color: '#f28e2c' },
    { region: 'East Asia', gdp: 9.63, population: 1584, color: '#e15759' },
    { region: 'South Asia', gdp: 2.24, population: 1689, color: '#76b7b2' },
    { region: 'Africa', gdp: 1.52, population: 1048, color: '#59a14f' },
    { region: 'Latin America', gdp: 5.52, population: 594, color: '#edc949' },
    { region: 'Middle East', gdp: 2.29, population: 242, color: '#af7aa1' }
  ],
  2020: [
    { region: 'North America', gdp: 24.8, population: 579, color: '#4e79a7' },
    { region: 'Europe', gdp: 19.2, population: 748, color: '#f28e2c' },
    { region: 'East Asia', gdp: 18.5, population: 1678, color: '#e15759' },
    { region: 'South Asia', gdp: 3.5, population: 1856, color: '#76b7b2' },
    { region: 'Africa', gdp: 2.6, population: 1341, color: '#59a14f' },
    { region: 'Latin America', gdp: 4.9, population: 653, color: '#edc949' },
    { region: 'Middle East', gdp: 3.8, population: 411, color: '#af7aa1' }
  ]
};

// Top 10 countries for racing bar chart
export const top10Countries = {
  gdp: ['United States', 'China', 'Japan', 'Germany', 'India', 'United Kingdom', 'France', 'Brazil', 'Italy', 'Canada'],
  population: ['China', 'India', 'United States', 'Indonesia', 'Brazil', 'Pakistan', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
  life_expectancy: ['Japan', 'Switzerland', 'Singapore', 'Spain', 'Italy', 'Australia', 'France', 'South Korea', 'Canada', 'Norway']
};

export const healthData = {
  1960: [
    { country: 'United States', gdpPerCapita: 3007, lifeExpectancy: 69.77, population: 180671000, region: 'North America' },
    { country: 'China', gdpPerCapita: 89, lifeExpectancy: 43.47, population: 667070000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 82, lifeExpectancy: 41.39, population: 450547000, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 2083, lifeExpectancy: 69.26, population: 72814900, region: 'Europe' },
    { country: 'Japan', gdpPerCapita: 479, lifeExpectancy: 67.84, population: 92500572, region: 'East Asia' },
    { country: 'United Kingdom', gdpPerCapita: 1492, lifeExpectancy: 70.96, population: 52372000, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 449, lifeExpectancy: 54.69, population: 72757000, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 150, lifeExpectancy: 37.48, population: 45138458, region: 'Africa' },
    { country: 'Mexico', gdpPerCapita: 565, lifeExpectancy: 57.13, population: 38677000, region: 'Latin America' },
    { country: 'Indonesia', gdpPerCapita: 101, lifeExpectancy: 44.11, population: 87792512, region: 'East Asia' }
  ],
  1970: [
    { country: 'United States', gdpPerCapita: 5234, lifeExpectancy: 70.81, population: 205052000, region: 'North America' },
    { country: 'China', gdpPerCapita: 113, lifeExpectancy: 58.38, population: 818315000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 112, lifeExpectancy: 49.26, population: 553943000, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 3494, lifeExpectancy: 70.56, population: 78169300, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 648, lifeExpectancy: 59.69, population: 95847000, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 221, lifeExpectancy: 40.02, population: 55569264, region: 'Africa' }
  ],
  1980: [
    { country: 'United States', gdpPerCapita: 12575, lifeExpectancy: 73.6, population: 227224681, region: 'North America' },
    { country: 'China', gdpPerCapita: 195, lifeExpectancy: 66.84, population: 981235000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 266, lifeExpectancy: 55.47, population: 696783517, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 10772, lifeExpectancy: 72.98, population: 78297904, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 2247, lifeExpectancy: 63.34, population: 121286000, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 565, lifeExpectancy: 44.59, population: 73698317, region: 'Africa' }
  ],
  1990: [
    { country: 'United States', gdpPerCapita: 23914, lifeExpectancy: 75.19, population: 249622814, region: 'North America' },
    { country: 'China', gdpPerCapita: 349, lifeExpectancy: 69.32, population: 1135185000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 367, lifeExpectancy: 58.60, population: 873277798, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 22270, lifeExpectancy: 75.25, population: 79433029, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 3087, lifeExpectancy: 66.60, population: 149650281, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 546, lifeExpectancy: 45.89, population: 95617345, region: 'Africa' }
  ],
  2000: [
    { country: 'United States', gdpPerCapita: 36450, lifeExpectancy: 76.64, population: 282162411, region: 'North America' },
    { country: 'China', gdpPerCapita: 959, lifeExpectancy: 71.72, population: 1262645000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 442, lifeExpectancy: 62.90, population: 1056575549, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 25169, lifeExpectancy: 78.24, population: 82187909, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 3749, lifeExpectancy: 70.48, population: 174504000, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 587, lifeExpectancy: 46.49, population: 122851984, region: 'Africa' }
  ],
  2010: [
    { country: 'United States', gdpPerCapita: 48467, lifeExpectancy: 78.54, population: 309321666, region: 'North America' },
    { country: 'China', gdpPerCapita: 4550, lifeExpectancy: 75.23, population: 1337705000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 1358, lifeExpectancy: 67.14, population: 1234281170, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 41723, lifeExpectancy: 79.99, population: 81776930, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 11315, lifeExpectancy: 73.62, population: 196353492, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 2249, lifeExpectancy: 51.98, population: 158503197, region: 'Africa' }
  ],
  2020: [
    { country: 'United States', gdpPerCapita: 63543, lifeExpectancy: 77.28, population: 331449281, region: 'North America' },
    { country: 'China', gdpPerCapita: 10408, lifeExpectancy: 77.47, population: 1402385000, region: 'East Asia' },
    { country: 'India', gdpPerCapita: 1965, lifeExpectancy: 69.73, population: 1380004385, region: 'South Asia' },
    { country: 'Germany', gdpPerCapita: 46445, lifeExpectancy: 80.94, population: 83132799, region: 'Europe' },
    { country: 'Brazil', gdpPerCapita: 6796, lifeExpectancy: 75.92, population: 212559409, region: 'Latin America' },
    { country: 'Nigeria', gdpPerCapita: 2097, lifeExpectancy: 54.69, population: 206139587, region: 'Africa' }
  ]
};

// Country coordinates for map visualization
export const countryCoordinates = {
  'United States': { lng: -95.7129, lat: 37.0902 },
  'China': { lng: 104.1954, lat: 35.8617 },
  'India': { lng: 78.9629, lat: 20.5937 },
  'Germany': { lng: 10.4515, lat: 51.1657 },
  'Brazil': { lng: -47.8825, lat: -14.2350 },
  'Nigeria': { lng: 8.6753, lat: 9.0820 }
};

// Async data loading functions
export async function loadGDPData() {
  // Simulate async loading
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleGDPData), 100);
  });
}

export async function loadHealthData(year) {
  // Simulate async loading
  return new Promise((resolve) => {
    setTimeout(() => resolve(healthData[year] || healthData[2020]), 100);
  });
}

export async function getAllHealthYears() {
  return Object.keys(healthData).map(Number).sort((a, b) => a - b);
}

export function getCountryCoordinates(countryName) {
  return countryCoordinates[countryName] || null;
}
