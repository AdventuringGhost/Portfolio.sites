# Hike Harvest Serverless

Serverless recipe management API using AWS Lambda and DynamoDB.

## Tech Stack

- **Runtime**: Node.js 18.x on AWS Lambda
- **Framework**: Serverless Framework
- **Database**: DynamoDB
- **API**: API Gateway
- **Local Development**: Serverless Offline

## Quick Start

### Prerequisites

- Node.js 18+
- AWS CLI configured
- Serverless Framework CLI

### Installation

```bash
# Install dependencies
npm install

# Install Serverless CLI globally (if not already installed)
npm install -g serverless
```

### Local Development

```bash
# Start local serverless offline
npx serverless offline start

# The API will be available at:
# http://localhost:3000/dev/recipes
```

### Deployment

```bash
# Deploy to AWS
npx serverless deploy

# Deploy to specific stage
npx serverless deploy --stage production

# Deploy to specific region
npx serverless deploy --region us-west-2
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `STAGE` | Deployment stage | `dev` |
| `REGION` | AWS region | `us-east-1` |
| `TABLE_NAME` | DynamoDB table name | `hike-harvest-{stage}` |

## API Endpoints

All endpoints are available at: `https://{api-id}.execute-api.{region}.amazonaws.com/{stage}`

### Recipes

- `GET /recipes` - Get all recipes
- `GET /recipes/{id}` - Get single recipe by ID
- `POST /recipes` - Create new recipe
- `PUT /recipes/{id}` - Update recipe by ID
- `DELETE /recipes/{id}` - Delete recipe by ID

### Request/Response Examples

#### Get All Recipes
```bash
GET /recipes
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "recipe-123",
      "title": "Trail Mix",
      "ingredients": ["nuts", "dried fruit"],
      "instructions": "Mix ingredients",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create Recipe
```bash
POST /recipes
Content-Type: application/json

{
  "title": "Energy Bars",
  "ingredients": ["oats", "honey", "nuts"],
  "instructions": "Mix and bake"
}
```

## Local Testing

```bash
# Test individual functions
npx serverless invoke local --function getRecipes
npx serverless invoke local --function createRecipe --data '{"title":"Test Recipe"}'

# Test with serverless offline
curl http://localhost:3000/dev/recipes
```

## DynamoDB Schema

### Recipes Table
- **Partition Key**: `id` (String)
- **Attributes**:
  - `title` (String)
  - `ingredients` (List of Strings)
  - `instructions` (String)
  - `createdAt` (String - ISO timestamp)
  - `updatedAt` (String - ISO timestamp)

## Security

- **CORS**: Enabled for all endpoints
- **IAM**: Least privilege access to DynamoDB
- **API Gateway**: Built-in throttling and monitoring

## Monitoring

- **CloudWatch Logs**: Automatic logging for all functions
- **CloudWatch Metrics**: API Gateway and Lambda metrics
- **X-Ray**: Distributed tracing (can be enabled)

## Cost Optimization

- **DynamoDB**: Pay-per-request billing mode
- **Lambda**: Pay per invocation and duration
- **API Gateway**: Pay per API call

## Deployment Stages

- `dev` - Development environment
- `staging` - Staging environment  
- `prod` - Production environment

Each stage creates separate resources with stage-specific naming.
