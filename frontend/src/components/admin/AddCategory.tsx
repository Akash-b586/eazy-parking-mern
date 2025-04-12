import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast, Toaster } from 'react-hot-toast'
import { BACKEND_URL } from '@/utils/backend'

const AddCategory = () => {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    if (!category.trim()) {
      toast.error('Please enter a category name')
      return
    }

    const token = Cookies.get('adminToken')
    if (!token) {
      toast.error('No token found. Please log in.')
      return
    }

    try {
      setLoading(true)
      setError('')
      const response = await axios.post(
        `${BACKEND_URL}/api/admin/category/add`,
        { vehicleCat: category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 201) {
        toast.success('Category added successfully!')
        setCategory('')
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to add category'
      setError(msg)
      toast.error(msg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 p-4">
      <Toaster />
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Vehicle Category</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="category"
              placeholder="e.g., 2 Wheeler"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-white"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 cursor-pointer text-white rounded-lg font-medium transition-all ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
