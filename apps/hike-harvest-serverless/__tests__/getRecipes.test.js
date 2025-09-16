const { handler } = require('../functions/getRecipes');

describe('getRecipes Lambda Function', () => {
  test('should return 200 with empty recipes array when no data', async () => {
    const event = {
      httpMethod: 'GET',
      path: '/recipes',
      headers: {},
      queryStringParameters: null
    };

    const result = await handler(event, {});

    expect(result.statusCode).toBe(200);
    expect(result.headers['Content-Type']).toBe('application/json');
    
    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
  });
});


