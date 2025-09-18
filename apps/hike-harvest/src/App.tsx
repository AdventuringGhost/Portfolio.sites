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
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1">
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
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
