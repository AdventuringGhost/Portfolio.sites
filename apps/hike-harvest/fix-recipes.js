const fs = require('fs');

// Read the file
const content = fs.readFileSync('src/data/mockRecipes.ts', 'utf8');

// Replace all nutrition objects that are followed by closing brace
const updated = content.replace(
  /(\s+nutrition:\s*\{[^}]*\})\s*\}/g, 
  '$1,\n    createdAt: "2025-01-15T08:00:00Z",\n    updatedAt: "2025-01-15T08:00:00Z"\n  }'
);

// Write back to file
fs.writeFileSync('src/data/mockRecipes.ts', updated);

console.log('Updated all recipes with createdAt and updatedAt properties');

