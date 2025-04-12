import  { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table } from 'antd'
import type { InputRef, TableColumnType } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast, Toaster } from 'react-hot-toast'
import { BACKEND_URL } from '@/utils/backend'

interface CategoryType {
  id: string
  vehicleCat: string
  creationDate: string
}

type DataIndex = keyof CategoryType

const ManageCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchInput = useRef<InputRef>(null)

  const fetchCategories = async () => {
    const token = Cookies.get('adminToken')
    if (!token) {
      toast.error('Admin token not found!')
      return
    }

    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`${BACKEND_URL}/api/admin/category/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories(response.data)
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to fetch categories'
      setError(msg)
      toast.error(msg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const token = Cookies.get('adminToken')
    if (!token) {
      toast.error('Admin token not found!')
      return
    }

    try {
      setLoading(true)
      setError('')
      await axios.delete(`${BACKEND_URL}/api/admin/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Category deleted successfully!')
      fetchCategories()
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to delete category'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (_id: string) => {
    toast('Edit functionality coming soon...')
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<CategoryType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => close()}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100)
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns: TableColumnType<CategoryType>[] = [
    {
      title: 'S.NO',
      dataIndex: 'index',
      key: 'index',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Category',
      dataIndex: 'vehicleCat',
      key: 'vehicleCat',
      ...getColumnSearchProps('vehicleCat'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => (
        <Space>
              <button
                onClick={() => handleEdit(record.id)}
                className={`py-1 px-3 cursor-pointer text-white rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(record.id)}
                className={`py-1 px-3 cursor-pointer text-white rounded-lg font-medium transition-all bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600`}
              >
                Delete
              </button>
        </Space>
      ),
    },
  ]

  return (
    <div className="p-4">
      <Toaster />
      <h2 className="text-xl font-semibold mb-4">Manage Vehicle Categories</h2>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        bordered
      
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default ManageCategory
