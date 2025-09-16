# Hike Harvest Serverless API Documentation

## Endpoints

### GET /recipes
Retrieve all hiking recipes with optional filtering and pagination

**Query Parameters:**
- `limit` (optional): Number of items to return (default: 20, max: 100)
- `difficulty` (optional): Filter by difficulty level (easy, medium, hard)
- `category` (optional): Filter by recipe category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "recipe-123",
      "title": "Trail Mix Energy Bars",
      "ingredients": ["oats", "nuts", "dried fruit"],
      "instructions": "Mix ingredients...",
      "difficulty": "easy",
      "category": "snacks",
      "cookTime": "15 minutes",
      "servings": 8,
      "nutrition": {},
      "tags": ["energy", "portable"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1,
  "scannedCount": 1,
  "filters": {
    "difficulty": null,
    "category": null,
    "limit": 20
  }
}
```

### GET /recipes/{id}
Retrieve a specific recipe by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "recipe-123",
    "title": "Trail Mix Energy Bars",
    "ingredients": ["oats", "nuts", "dried fruit"],
    "instructions": "Mix ingredients...",
    "difficulty": "easy",
    "category": "snacks",
    "cookTime": "15 minutes",
    "servings": 8,
    "nutrition": {},
    "tags": ["energy", "portable"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### POST /recipes
Create a new recipe

**Request Body:**
```json
{
  "title": "Trail Mix Energy Bars",
  "ingredients": ["oats", "nuts", "dried fruit"],
  "instructions": "Mix ingredients...",
  "difficulty": "easy",
  "category": "snacks",
  "cookTime": "15 minutes",
  "servings": 8,
  "nutrition": {},
  "tags": ["energy", "portable"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "generated-uuid",
    "title": "Trail Mix Energy Bars",
    "ingredients": ["oats", "nuts", "dried fruit"],
    "instructions": "Mix ingredients...",
    "difficulty": "easy",
    "category": "snacks",
    "cookTime": "15 minutes",
    "servings": 8,
    "nutrition": {},
    "tags": ["energy", "portable"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Recipe created successfully"
}
```

### PUT /recipes/{id}
Update an existing recipe

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Trail Mix Energy Bars",
  "ingredients": ["oats", "nuts", "dried fruit", "chocolate chips"],
  "instructions": "Updated instructions...",
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "recipe-123",
    "title": "Updated Trail Mix Energy Bars",
    "ingredients": ["oats", "nuts", "dried fruit", "chocolate chips"],
    "instructions": "Updated instructions...",
    "difficulty": "medium",
    "category": "snacks",
    "cookTime": "15 minutes",
    "servings": 8,
    "nutrition": {},
    "tags": ["energy", "portable"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  },
  "message": "Recipe updated successfully"
}
```

### DELETE /recipes/{id}
Delete a recipe

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "deletedRecipe": {
    "id": "recipe-123",
    "title": "Trail Mix Energy Bars"
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `400` - Bad Request (missing required fields)
- `404` - Not Found (recipe doesn't exist)
- `500` - Internal Server Error

## Environment Variables
- `TABLE_NAME` - DynamoDB table name
- `STAGE` - Deployment stage (dev/staging/prod)
- `REGION` - AWS region

## Local Development
```bash
npm install
npm run dev
```

## Deployment
```bash
# Deploy to dev environment
npm run deploy:dev

# Deploy to production
npm run deploy:prod

# Remove deployment
npm run remove
```
