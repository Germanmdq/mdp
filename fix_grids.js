const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update slice counts
page = page.replace('slice(0, 5)', 'slice(0, 6)');
page = page.replace('slice(0, 5)', 'slice(0, 6)');
page = page.replace('slice(0, 5)', 'slice(0, 6)');
// Note: replacing `slice(0, 5)` 3 times since there are 3 instances

page = page.replace('slice(5, 10)', 'slice(6, 12)');

// Update grid columns for products
page = page.replace(/lg:grid-cols-5/g, 'lg:grid-cols-6');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed grids for mobile symmetry');
