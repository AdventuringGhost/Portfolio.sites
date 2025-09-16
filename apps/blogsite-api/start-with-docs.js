#!/usr/bin/env node

/**
 * Start script that shows Swagger documentation info
 */

const path = require('path');
const YAML = require('yamljs');

console.log('🚀 Starting Blogsite API with Swagger Documentation...\n');

// Load and display OpenAPI info
const openapiPath = path.join(__dirname, 'openapi.yaml');
try {
  const swaggerDoc = YAML.load(openapiPath);
  
  console.log('📚 API Documentation:');
  console.log(`   Title: ${swaggerDoc.info.title}`);
  console.log(`   Version: ${swaggerDoc.info.version}`);
  console.log(`   Description: ${swaggerDoc.info.description}`);
  console.log(`   Server: ${swaggerDoc.servers[0].url}`);
  console.log('');
  console.log('🔗 Available Endpoints:');
  console.log('   • Health Check: GET /api/health');
  console.log('   • User Registration: POST /api/auth/register');
  console.log('   • User Login: POST /api/auth/login');
  console.log('   • List Posts: GET /api/posts');
  console.log('   • Create Post: POST /api/posts');
  console.log('   • Get Post: GET /api/posts/{slug}');
  console.log('');
  console.log('📖 Interactive Documentation:');
  console.log('   🌐 Swagger UI: http://localhost:4001/api/docs');
  console.log('   📄 OpenAPI Spec: openapi.yaml');
  console.log('');
  console.log('✨ Features:');
  console.log('   • Interactive API testing');
  console.log('   • Request/response examples');
  console.log('   • Schema validation');
  console.log('   • Authentication testing');
  console.log('');
  
} catch (error) {
  console.log('⚠️  Could not load OpenAPI specification');
  console.log('   Make sure openapi.yaml exists and is valid');
}

console.log('🎯 Starting server...\n');

// Start the actual server
require('./src/server.js');


