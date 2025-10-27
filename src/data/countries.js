// src/data/countries.js
export const countriesData = {
  vietnam: {
    name: 'Việt Nam', population: 98800000, birthRate: 14.8, deathRate: 7.2, netMigration: -0.3, stage: 3, medianAge: 32.5, growthRate: 0.76, urbanization: 38.2, lifeExpectancy: 75.4, gdpPerCapita: 4164, educationIndex: 0.707, healthcareSpending: 5.3, fertilityRate: 2.0,
    pyramid: [
      { age: '0-14', male: -11.2, female: 10.8, maleCount: 11200000, femaleCount: 10800000 },
      { age: '15-29', male: -12.8, female: 12.4, maleCount: 12800000, femaleCount: 12400000 },
      { age: '30-44', male: -13.5, female: 13.2, maleCount: 13500000, femaleCount: 13200000 },
      { age: '45-59', male: -11.8, female: 11.6, maleCount: 11800000, femaleCount: 11600000 },
      { age: '60-74', male: -5.4, female: 5.8, maleCount: 5400000, femaleCount: 5800000 },
      { age: '75+', male: -1.8, female: 2.4, maleCount: 1800000, femaleCount: 2400000 }
    ],
    historicalData: [
      {year: 2000, pop: 77635, birth: 17.8, death: 5.4, gdp: 402},
      {year: 2005, pop: 83312, birth: 16.5, death: 5.5, gdp: 638},
      {year: 2010, pop: 87411, birth: 15.8, death: 6.2, gdp: 1334},
      {year: 2015, pop: 92677, birth: 15.2, death: 6.8, gdp: 2088},
      {year: 2020, pop: 97339, birth: 15.0, death: 7.0, gdp: 2786},
      {year: 2025, pop: 98800, birth: 14.8, death: 7.2, gdp: 4164}
    ]
  },
  japan: {
    name: 'Nhật Bản', population: 123300000, birthRate: 6.9, deathRate: 12.1, netMigration: 0.6, stage: 5, medianAge: 49.1, growthRate: -0.53, urbanization: 91.8, lifeExpectancy: 84.8, gdpPerCapita: 33815, educationIndex: 0.844, healthcareSpending: 11.1, fertilityRate: 1.3,
    pyramid: [
      { age: '0-14', male: -6.2, female: 5.9, maleCount: 7600000, femaleCount: 7300000 },
      { age: '15-29', male: -7.8, female: 7.5, maleCount: 9600000, femaleCount: 9200000 },
      { age: '30-44', male: -9.2, female: 8.9, maleCount: 11300000, femaleCount: 11000000 },
      { age: '45-59', male: -11.5, female: 11.2, maleCount: 14200000, femaleCount: 13800000 },
      { age: '60-74', male: -10.8, female: 11.4, maleCount: 13300000, femaleCount: 14000000 },
      { age: '75+', male: -6.8, female: 9.2, maleCount: 8400000, femaleCount: 11300000 }
    ],
    historicalData: [
      {year: 2000, pop: 126843, birth: 9.6, death: 7.7, gdp: 38532},
      {year: 2005, pop: 127773, birth: 8.4, death: 8.6, gdp: 37217},
      {year: 2010, pop: 128070, birth: 8.5, death: 9.5, gdp: 44508},
      {year: 2015, pop: 127141, birth: 7.8, death: 10.3, gdp: 34524},
      {year: 2020, pop: 125502, birth: 7.0, death: 11.1, gdp: 40113},
      {year: 2025, pop: 123300, birth: 6.9, death: 12.1, gdp: 33815}
    ]
  },
  nigeria: {
    name: 'Nigeria', population: 223800000, birthRate: 35.2, deathRate: 8.5, netMigration: -0.2, stage: 2, medianAge: 18.6, growthRate: 2.53, urbanization: 52.7, lifeExpectancy: 55.2, gdpPerCapita: 2184, educationIndex: 0.468, healthcareSpending: 3.4, fertilityRate: 5.3,
    pyramid: [
      { age: '0-14', male: -20.5, female: 20.2, maleCount: 45900000, femaleCount: 45200000 },
      { age: '15-29', male: -16.8, female: 16.5, maleCount: 37600000, femaleCount: 36900000 },
      { age: '30-44', male: -11.2, female: 11.0, maleCount: 25100000, femaleCount: 24600000 },
      { age: '45-59', male: -6.8, female: 6.6, maleCount: 15200000, femaleCount: 14800000 },
      { age: '60-74', male: -3.2, female: 3.1, maleCount: 7200000, femaleCount: 6900000 },
      { age: '75+', male: -0.8, female: 0.9, maleCount: 1800000, femaleCount: 2000000 }
    ],
    historicalData: [
      {year: 2000, pop: 122877, birth: 41.8, death: 13.9, gdp: 360},
      {year: 2005, pop: 142950, birth: 40.5, death: 12.5, gdp: 1118},
      {year: 2010, pop: 165463, birth: 39.2, death: 11.2, gdp: 2315},
      {year: 2015, pop: 190633, birth: 37.5, death: 9.8, gdp: 2640},
      {year: 2020, pop: 208327, birth: 36.2, death: 9.0, gdp: 2097},
      {year: 2025, pop: 223800, birth: 35.2, death: 8.5, gdp: 2184}
    ]
  },
  usa: {
    name: 'Hoa Kỳ', population: 341800000, birthRate: 11.0, deathRate: 9.5, netMigration: 2.8, stage: 4, medianAge: 38.9, growthRate: 0.43, urbanization: 83.0, lifeExpectancy: 79.3, gdpPerCapita: 76399, educationIndex: 0.900, healthcareSpending: 16.8, fertilityRate: 1.7,
    pyramid: [
      { age: '0-14', male: -9.2, female: 8.8, maleCount: 31500000, femaleCount: 30100000 },
      { age: '15-29', male: -10.8, female: 10.5, maleCount: 36900000, femaleCount: 35900000 },
      { age: '30-44', male: -10.5, female: 10.3, maleCount: 35900000, femaleCount: 35200000 },
      { age: '45-59', male: -10.2, female: 10.4, maleCount: 34900000, femaleCount: 35600000 },
      { age: '60-74', male: -8.5, female: 9.2, maleCount: 29100000, femaleCount: 31500000 },
      { age: '75+', male: -4.8, female: 6.8, maleCount: 16400000, femaleCount: 23200000 }
    ],
    historicalData: [
      {year: 2000, pop: 282162, birth: 14.4, death: 8.7, gdp: 36450},
      {year: 2005, pop: 295734, birth: 14.0, death: 8.3, gdp: 44307},
      {year: 2010, pop: 309327, birth: 13.0, death: 8.0, gdp: 48374},
      {year: 2015, pop: 320878, birth: 12.4, death: 8.4, gdp: 56863},
      {year: 2020, pop: 331003, birth: 11.4, death: 8.9, gdp: 63416},
      {year: 2025, pop: 341800, birth: 11.0, death: 9.5, gdp: 76399}
    ]
  },
  germany: {
    name: 'Đức', population: 84500000, birthRate: 8.9, deathRate: 12.0, netMigration: 4.8, stage: 5, medianAge: 47.8, growthRate: 0.17, urbanization: 77.5, lifeExpectancy: 81.7, gdpPerCapita: 48756, educationIndex: 0.946, healthcareSpending: 12.8, fertilityRate: 1.5,
    pyramid: [
      { age: '0-14', male: -6.5, female: 6.2, maleCount: 5500000, femaleCount: 5200000 },
      { age: '15-29', male: -8.2, female: 7.9, maleCount: 6900000, femaleCount: 6700000 },
      { age: '30-44', male: -9.8, female: 9.5, maleCount: 8300000, femaleCount: 8000000 },
      { age: '45-59', male: -12.5, female: 12.2, maleCount: 10600000, femaleCount: 10300000 },
      { age: '60-74', male: -10.8, female: 11.2, maleCount: 9100000, femaleCount: 9500000 },
      { age: '75+', male: -5.2, female: 8.5, maleCount: 4400000, femaleCount: 7200000 }
    ],
    historicalData: [
      {year: 2000, pop: 82212, birth: 9.3, death: 10.2, gdp: 23755},
      {year: 2005, pop: 82469, birth: 8.3, death: 10.1, gdp: 33697},
      {year: 2010, pop: 81752, birth: 8.3, death: 10.5, gdp: 41732},
      {year: 2015, pop: 81687, birth: 9.0, death: 11.3, gdp: 41103},
      {year: 2020, pop: 83784, birth: 9.4, death: 11.8, gdp: 46208},
      {year: 2025, pop: 84500, birth: 8.9, death: 12.0, gdp: 48756}
    ]
  }
};