import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, Spin, Input, Button, Space, Tag, Modal, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { BACKEND_URL } from "@/utils/backend";
import toast from "react-hot-toast";

type ParkingLot = {
  id: string;
  location: string;
  imgUrl: string;
  totalSlot: number;
  bookedSlot: number;
  price: number;
};

type DataIndex = keyof ParkingLot;

const ManageParkingLot = () => {
  const token = Cookies.get("adminToken");
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editingParkingLot, setEditingParkingLot] = useState<ParkingLot | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    const fetchParkingLots = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/api/user/getParkings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setParkingLots(response.data);
      } catch (error) {
        console.error("Error fetching parking lots:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParkingLots();
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<ParkingLot> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<ParkingLot> = [
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url: string) => (
        <div className="flex justify-center items-center">
          <img
            src={url}
            alt="parking"
            style={{ width: 100, height: 100, borderRadius: 8 }}
          />
        </div>
      ),
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
    },
    {
      title: "Total Slots",
      dataIndex: "totalSlot",
      key: "totalSlot",
      sorter: (a, b) => a.totalSlot - b.totalSlot,
    },
    {
      title: "Booked Slot",
      dataIndex: "bookedSlot",
      key: "bookedSlot",
      render: (booked, record) => (
        <Tag
          color={
            booked >= 0.9 * record.totalSlot
              ? "red"
              : booked >= 0.6 * record.totalSlot
              ? "gold"
              : "green"
          }
        >
          {booked}/{record.totalSlot}
        </Tag>
      ),
      sorter: (a, b) => a.bookedSlot - b.bookedSlot,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <a onClick={() => editParkingLot(record)} style={{ color: "#1677ff" }}>
          Edit
        </a>
      ),
    },
  ];

  const editParkingLot = (record: ParkingLot) => {
    setEditingParkingLot(record);
    setIsModalVisible(true);
  };
  const [updating, setUpdating] = useState(false);
  const handleOk = async () => {
    if (editingParkingLot) {
      try {
        setUpdating(true);
        const response = await axios.patch(
          `${BACKEND_URL}/api/admin/addParkingLot/${editingParkingLot.id}`,
          editingParkingLot,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setParkingLots((prev) =>
            prev.map((lot) =>
              lot.id === editingParkingLot.id ? response.data : lot
            )
          );
          setIsModalVisible(false);
          toast.success("Parking lot updated successfully!");
        }
      } catch (error) {
        console.error("Error updating parking lot:", error);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingParkingLot) {
      setEditingParkingLot({
        ...editingParkingLot,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" tip="Loading Parking Lots" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={parkingLots}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}

      <Modal
        title="Edit Parking Lot"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={updating}
            disabled={updating}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {editingParkingLot && (
          <Form layout="vertical">
            <Form.Item label="Location">
              <Input
                name="location"
                value={editingParkingLot.location}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Image URL">
              <Input
                name="imgUrl"
                value={editingParkingLot.imgUrl}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Total Slots">
              <Input
                type="number"
                name="totalSlot"
                value={editingParkingLot.totalSlot}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                type="number"
                name="price"
                value={editingParkingLot.price}
                onChange={handleChange}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ManageParkingLot;
