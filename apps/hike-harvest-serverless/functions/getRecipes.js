const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    // Parse query parameters
    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit) || 20;
    const difficulty = queryParams.difficulty;
    const category = queryParams.category;

    // Build scan parameters
    const params = {
      TableName: process.env.TABLE_NAME,
      Limit: Math.min(limit, 100) // Cap at 100 items
    };

    // Add filters if provided
    if (difficulty || category) {
      params.FilterExpression = [];
      params.ExpressionAttributeValues = {};
      params.ExpressionAttributeNames = {};

      if (difficulty) {
        params.FilterExpression.push('#difficulty = :difficulty');
        params.ExpressionAttributeNames['#difficulty'] = 'difficulty';
        params.ExpressionAttributeValues[':difficulty'] = difficulty;
      }

      if (category) {
        params.FilterExpression.push('#category = :category');
        params.ExpressionAttributeNames['#category'] = 'category';
        params.ExpressionAttributeValues[':category'] = category;
      }

      params.FilterExpression = params.FilterExpression.join(' AND ');
    }

    const result = await dynamodb.scan(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        data: result.Items || [],
        count: result.Count || 0,
        scannedCount: result.ScannedCount || 0,
        filters: {
          difficulty,
          category,
          limit
        }
      })
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    
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
