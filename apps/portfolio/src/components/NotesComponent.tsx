import { useState, useEffect } from 'react'
import { Card, Button, Input } from '@adventuringghost/ui'
import { getItems, createItem, HttpError, type Item } from '../lib/http'

interface NotesComponentProps {
  projectSlug: string
  title?: string
  description?: string
}

export const NotesComponent = ({ 
  projectSlug, 
  title = "Notes", 
  description = "Share your thoughts and feedback" 
}: NotesComponentProps) => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ title: '', note: '' })

  // Load items on component mount
  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getItems()
      // Filter items for this specific project
      const projectItems = data.filter(item => item.project === projectSlug)
      setItems(projectItems)
    } catch (err) {
      console.error('Failed to load items:', err)
      setError(err instanceof HttpError ? err.message : 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.note.trim()) return

    try {
      setSubmitting(true)
      setError(null)
      
      const newItem = await createItem({
        project: projectSlug,
        title: formData.title.trim(),
        note: formData.note.trim()
      })
      
      setItems(prev => [newItem, ...prev])
      setFormData({ title: '', note: '' })
    } catch (err) {
      console.error('Failed to create item:', err)
      setError(err instanceof HttpError ? err.message : 'Failed to create item')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunrise-cyan"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {error && (
        <Card>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={loadItems}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Note Form */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6">Add New {title.slice(0, -1)}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              placeholder={`Enter ${title.slice(0, -1).toLowerCase()} title`}
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              disabled={submitting}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunrise-cyan focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                rows={4}
                placeholder={`Enter ${title.slice(0, -1).toLowerCase()} content`}
                value={formData.note}
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                required
                disabled={submitting}
              />
            </div>
            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full"
            >
              {submitting ? 'Adding...' : `Add ${title.slice(0, -1)}`}
            </Button>
          </form>
        </Card>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your {title}</h2>
          {items.length === 0 ? (
            <Card>
              <p className="text-gray-500 text-center py-8">
                No {title.toLowerCase()} yet. Create your first one!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{item.note}</p>
                    <p className="text-sm text-gray-400">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


