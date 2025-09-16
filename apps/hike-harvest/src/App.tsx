import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Recipes } from './pages/Recipes'
import { RecipeDetail } from './pages/RecipeDetail'
import { AddRecipe } from './pages/AddRecipe'
import { EditRecipe } from './pages/EditRecipe'
import { TrailTips } from './pages/TrailTips'
import { Community } from './pages/Community'
import { CategoryRecipes } from './pages/CategoryRecipes'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #F0F2BD 0%, #B2CD9C 100%)' }}>
        <Header />
        <main className="flex-1 container mx-auto px-4 max-w-7xl -mt-0 mb-8">
          <div 
            className="mx-16 rounded-3xl p-8"
            style={{ 
              backgroundColor: 'rgba(240, 242, 189, 0.3)',
              border: '2px solid rgba(75, 53, 42, 0.2)',
              boxShadow: '0 8px 32px rgba(75, 53, 42, 0.1)',
              marginBottom: '2rem'
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/category/:category" element={<CategoryRecipes />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/recipes/add" element={<AddRecipe />} />
              <Route path="/recipes/:id/edit" element={<EditRecipe />} />
              <Route path="/tips" element={<TrailTips />} />
              <Route path="/community" element={<Community />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
