const fs = require('fs');
const path = require('path');

const apiKey = process.env.TMDB_API_KEY || '';

const content = `const TMDB_CONFIG = {
  API_KEY: '${apiKey}',
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'config.js'), content, 'utf8');

if (!apiKey) {
  console.warn('Warning: TMDB_API_KEY is not set. config.js was created with an empty key.');
} else {
  console.log('config.js generated successfully.');
}
