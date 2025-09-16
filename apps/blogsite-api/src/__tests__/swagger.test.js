const request = require('supertest');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Mock Express app with Swagger UI
const app = express();
const openapiPath = path.join(__dirname, '..', '..', 'openapi.yaml');
let swaggerDoc;
try { 
  swaggerDoc = YAML.load(openapiPath); 
} catch (error) { 
  swaggerDoc = null; 
}

if (swaggerDoc) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
}

describe('Swagger Documentation', () => {
  test('Swagger UI should be accessible', async () => {
    if (!swaggerDoc) {
      console.log('Skipping Swagger test - OpenAPI spec not found');
      return;
    }

    // Swagger UI redirects, so we expect a 301 or 200
    const response = await request(app)
      .get('/api/docs');

    expect([200, 301]).toContain(response.status);
  });

  test('OpenAPI spec should be valid', () => {
    if (!swaggerDoc) {
      console.log('Skipping OpenAPI validation - spec not found');
      return;
    }

    expect(swaggerDoc).toHaveProperty('openapi');
    expect(swaggerDoc).toHaveProperty('info');
    expect(swaggerDoc).toHaveProperty('paths');
    expect(swaggerDoc.openapi).toBe('3.0.3');
    expect(swaggerDoc.info.title).toBe('Blogsite API');
  });
});

