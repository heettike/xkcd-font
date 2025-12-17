'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Provider {
  id: string
  name: string
  website: string
  avgPrice: string | null
  bestWorkUrl: string | null
  category: string
  subcategory: string | null
  notes: string | null
}

const categories = [
  { value: 'agencies', label: 'Service Agencies' },
  { value: 'podcasters', label: 'Podcasters & Streamers' },
  { value: 'kols', label: 'Key KOLs' },
  { value: 'filmmakers', label: 'Filmmakers & Creatives' },
  { value: 'market_makers', label: 'Market Makers' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
]

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    avgPrice: '',
    bestWorkUrl: '',
    category: 'agencies',
    subcategory: '',
    notes: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    const res = await fetch('/api/providers')
    const data = await res.json()
    setProviders(data)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          avgPrice: formData.avgPrice || null,
          bestWorkUrl: formData.bestWorkUrl || null,
          subcategory: formData.subcategory || null,
          notes: formData.notes || null,
        }),
      })

      if (res.ok) {
        setFormData({
          name: '',
          website: '',
          avgPrice: '',
          bestWorkUrl: '',
          category: 'agencies',
          subcategory: '',
          notes: '',
        })
        setShowForm(false)
        fetchProviders()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to add provider')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
    setIsSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this provider?')) return

    await fetch(`/api/providers/${id}`, { method: 'DELETE' })
    fetchProviders()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/admin" className="hover:text-gray-900">
              Admin
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">Providers</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
            Manage Providers
          </h1>
          <p className="text-gray-500">Add and manage marketplace providers.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Provider'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website *
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                required
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) =>
                  setFormData({ ...formData, subcategory: e.target.value })
                }
                placeholder="e.g., Design, Development"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Price
              </label>
              <input
                type="text"
                value={formData.avgPrice}
                onChange={(e) =>
                  setFormData({ ...formData, avgPrice: e.target.value })
                }
                placeholder="e.g., $5,000 - $10,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Best Work URL
              </label>
              <input
                type="url"
                value={formData.bestWorkUrl}
                onChange={(e) =>
                  setFormData({ ...formData, bestWorkUrl: e.target.value })
                }
                placeholder="Link to portfolio or sample work"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Additional notes about this provider..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Provider'}
          </button>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : providers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No providers yet. Add your first one above.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:text-gray-700"
                    >
                      {provider.name}
                    </a>
                    {provider.subcategory && (
                      <span className="ml-2 text-xs text-gray-500">
                        ({provider.subcategory})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                      {provider.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {provider.avgPrice || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(provider.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
