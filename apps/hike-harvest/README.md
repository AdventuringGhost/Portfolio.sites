# Hike Harvest Frontend

A beautiful React frontend for the Hike Harvest recipe management system. Built for outdoor enthusiasts who want to share and discover trail-ready recipes.

## 🏔️ Features

- **Recipe Management**: Browse, add, edit, and delete hiking recipes
- **Advanced Filtering**: Search by ingredients, category, and difficulty
- **Hiking-Focused**: Categories and features designed for outdoor adventures
- **Responsive Design**: Works perfectly on mobile and desktop
- **Modern UI**: Clean, intuitive interface with hiking theme

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Hike Harvest API running (see `apps/hike-harvest-serverless/`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/dev
```

## 🎨 Design System

### Colors
- **Forest**: Primary green tones for nature theme
- **Mountain**: Neutral grays for text and backgrounds  
- **Sunset**: Orange accents for highlights

### Components
- **Cards**: Clean, elevated containers for content
- **Buttons**: Primary and secondary variants
- **Forms**: Consistent input styling with validation

## 📱 Pages

- **Home**: Welcome page with features and categories
- **Recipes**: Browse all recipes with filtering
- **Recipe Detail**: Full recipe view with ingredients and instructions
- **Add Recipe**: Form to create new recipes
- **Edit Recipe**: Form to update existing recipes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API integration
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## 🌐 API Integration

The frontend connects to the Hike Harvest Serverless API:

- **Base URL**: Configurable via `VITE_API_URL`
- **Endpoints**: Full CRUD operations for recipes
- **Error Handling**: Comprehensive error states and user feedback

## 🎯 Hiking-Specific Features

- **Categories**: Breakfast, Lunch, Dinner, Snack, Dessert
- **Difficulty Levels**: Easy, Medium, Hard
- **Equipment Tracking**: List required camping/hiking gear
- **Nutrition Info**: Calories, protein, carbs, fat
- **Tags**: Custom tags for filtering (e.g., "high-protein", "vegan")
- **Timing**: Prep time and cook time for meal planning

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Configuration

For production, set the `VITE_API_URL` to your deployed API endpoint:

```env
VITE_API_URL=https://your-api-gateway-url.amazonaws.com/prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the AdventuringGhost portfolio and is available under the MIT License.
