const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const recipeId = event.pathParameters?.id;
    
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

    // Check if recipe exists first
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

    // Delete the recipe
    const deleteParams = {
      TableName: process.env.TABLE_NAME,
      Key: { id: recipeId }
    };

    await dynamodb.delete(deleteParams).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Recipe deleted successfully',
        deletedRecipe: {
          id: recipeId,
          title: existingRecipe.Item.title
        }
      })
    };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    
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
