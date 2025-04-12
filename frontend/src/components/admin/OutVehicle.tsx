import React, { useEffect, useRef, useState } from 'react';
import { Table, Input, Space, Button, Modal } from 'antd';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { BACKEND_URL } from '@/utils/backend';

interface OutVehicleType {
  id: string;
  parkingNumber: string;
  ownerName: string;
  registrationNumber: string;
  outTime: string;
}

type DataIndex = keyof OutVehicleType;

const OutVehicle: React.FC = () => {
  const [data, setData] = useState<OutVehicleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [remarkModalVisible, setRemarkModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [remark, setRemark] = useState('');

  const fetchOutVehicles = async () => {
    const token = Cookies.get('adminToken');
    if (!token) {
      toast.error('Admin token not found!');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${BACKEND_URL}/api/admin/vehicle/out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to fetch out vehicles';
      setError(msg);
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const autoUpdateVehicles = async () => {
    const token = Cookies.get('adminToken');
    if (!token) {
      toast.error('Admin token not found!');
      return;
    }
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/vehicle/auto-update`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message || 'Vehicles updated!');
      fetchOutVehicles(); // Fetch updated data
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Auto update failed';
      toast.error(msg);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOutVehicles();
  }, []);

  const handleSettle = async (id: string) => {
    const token = Cookies.get('adminToken');
    if (!token) {
      toast.error('Admin token not found!');
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/admin/vehicle/settle`,
        { vehicleId: id, remark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Vehicle settled and moved to history!');
      setRemark('');
      setRemarkModalVisible(false);
      fetchOutVehicles();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to settle vehicle';
      toast.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (selectedKeys: string[], confirm: any, dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<OutVehicleType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] as string}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase()),
    render: (text: string) =>
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
  });

  const columns: TableColumnType<OutVehicleType>[] = [
    {
      title: 'S.NO',
      dataIndex: 'index',
      key: 'index',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Parking Number',
      dataIndex: 'parkingNumber',
      key: 'parkingNumber',
      ...getColumnSearchProps('parkingNumber'),
    },
    {
      title: 'Owner Name',
      dataIndex: 'ownerName',
      key: 'ownerName',
      ...getColumnSearchProps('ownerName'),
    },
    {
      title: 'Vehicle Reg Number',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
      ...getColumnSearchProps('registrationNumber'),
    },
    {
      title: 'In Date',
      dataIndex: 'inTime',
      key: 'inTime',
      render: (inTime) => new Date(inTime).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text, record) => (
        <Space>
          <button
            onClick={() => {
              setSelectedId(record.id);
              setRemarkModalVisible(true);
            }}
            className="py-1 px-3 cursor-pointer text-white rounded-lg font-medium transition-all bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Settle
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={autoUpdateVehicles}>
          Refresh
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} bordered />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Modal
        title="Add Remark and Settle Vehicle"
        visible={remarkModalVisible}
        onOk={() => handleSettle(selectedId)}
        onCancel={() => setRemarkModalVisible(false)}
        okText="Settle"
      >
        <Input
          placeholder="Enter remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default OutVehicle;
