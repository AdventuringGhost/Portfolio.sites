const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    
    // Validate required fields
    const requiredFields = ['title', 'ingredients', 'instructions', 'difficulty'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields',
          missingFields
        })
      };
    }

    // Create recipe object
    const recipe = {
      id: uuidv4(),
      title: body.title,
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : [body.ingredients],
      instructions: body.instructions,
      difficulty: body.difficulty,
      category: body.category || 'general',
      cookTime: body.cookTime || 'Not specified',
      servings: body.servings || 1,
      nutrition: body.nutrition || {},
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to DynamoDB
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: recipe
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: recipe,
        message: 'Recipe created successfully'
      })
    };
  } catch (error) {
    console.error('Error creating recipe:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
