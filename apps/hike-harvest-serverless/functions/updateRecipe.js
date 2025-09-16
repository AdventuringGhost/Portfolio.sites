const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const recipeId = event.pathParameters?.id;
    const body = JSON.parse(event.body || '{}');
    
    if (!recipeId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Recipe ID is required'
        })
      };
    }

    // Check if recipe exists
    const getParams = {
      TableName: process.env.TABLE_NAME,
      Key: { id: recipeId }
    };

    const existingRecipe = await dynamodb.get(getParams).promise();
    
    if (!existingRecipe.Item) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Recipe not found'
        })
      };
    }

    // Build update expression
    const updateExpression = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    // Allow updating specific fields
    const allowedFields = ['title', 'ingredients', 'instructions', 'difficulty', 'category', 'cookTime', 'servings', 'nutrition', 'tags'];
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateExpression.push(`#${field} = :${field}`);
        expressionAttributeNames[`#${field}`] = field;
        expressionAttributeValues[`:${field}`] = body[field];
      }
    });

    if (updateExpression.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'No valid fields to update'
        })
      };
    }

    // Add updatedAt timestamp
    updateExpression.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const updateParams = {
      TableName: process.env.TABLE_NAME,
      Key: { id: recipeId },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamodb.update(updateParams).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: result.Attributes,
        message: 'Recipe updated successfully'
      })
    };
  } catch (error) {
    console.error('Error updating recipe:', error);
    
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
