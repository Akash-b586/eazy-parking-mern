import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Spin, Typography, Space, Input } from "antd";
import { BACKEND_URL } from "@/utils/backend";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import Cookies from "js-cookie";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: { finalY: number };
  }
}
const { Title, Text } = Typography;

const UserData = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/admin/userData`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openDetails = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      users.map((u) => ({
        Name: `${u.firstName} ${u.lastName}`,
        Email: u.email,
        Phone: u.mobileNumber,
        "Reg Date": new Date(u.regDate).toLocaleDateString(),
        "Total Spent": `₹${u.totalSpent || 0}`,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "UserData.csv";
    link.click();
  };

  const exportPDF = () => {
    if (!selectedUser) return;

    const doc = new jsPDF();
    doc.text("User Details", 14, 16);

    const basicInfo = [
      ["Name", `${selectedUser.firstName} ${selectedUser.lastName}`],
      ["Email", selectedUser.email],
      ["Phone", selectedUser.mobileNumber],
      ["Total Spent", `₹${selectedUser.totalSpent || 0}`],
    ];

    autoTable(doc, {
      startY: 20,
      head: [["Field", "Value"]],
      body: basicInfo,
    });

    if (selectedUser.bookings?.length) {
      doc.text("Bookings", 14, doc.lastAutoTable.finalY + 10);
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 14,
        head: [["Location", "Vehicle No", "Status", "In Time", "Out Time"]],
        body: selectedUser.bookings.map((b: any) => [
          b.parkingLot?.location || "N/A",
          b.vehicle?.registrationNumber || "N/A",
          b.vehicle?.status || "N/A",
          b.vehicle?.inTime ? new Date(b.vehicle.inTime).toLocaleString() : "-",
          b.vehicle?.outTime
            ? new Date(b.vehicle.outTime).toLocaleString()
            : "-",
        ]),
      });
    }

    doc.save(`User_${selectedUser.firstName}_${selectedUser.lastName}.pdf`);
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
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
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      `${record[dataIndex]}`.toLowerCase().includes(value.toLowerCase()),
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

  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
      ...getColumnSearchProps("mobileNumber"),
    },
    {
      title: "Reg Date",
      dataIndex: "regDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      render: (val: number) => `₹${val || 0}`,
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => openDetails(record)}>
          More Details
        </Button>
      ),
    },
  ];

  const bookingColumns = [
    {
      title: "Parking Lot",
      dataIndex: ["parkingLot", "location"],
    },
    {
      title: "Vehicle",
      dataIndex: ["vehicle", "registrationNumber"],
      render: (val: string) => val || "N/A",
    },
    {
      title: "Status",
      dataIndex: ["vehicle", "status"],
      render: (val: string) => val || "N/A",
    },
    {
      title: "In Time",
      dataIndex: ["vehicle", "inTime"],
      render: (val: string) => (val ? new Date(val).toLocaleString() : "-"),
    },
    {
      title: "Out Time",
      dataIndex: ["vehicle", "outTime"],
      render: (val: string) => (val ? new Date(val).toLocaleString() : "-"),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={2}>User Insights</Title>
        <Button type="primary" onClick={exportCSV}>
          Export CSV
        </Button>
      </Space>

      {loading ? (
        <Spin size="large" tip="Loading..." />
      ) : (
        <Table
          columns={userColumns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          bordered
        />
      )}

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="export" onClick={exportPDF}>
            Export PDF
          </Button>,
          <Button key="close" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={1000}
        title="User Details"
      >
        {selectedUser && (
          <>
            <p>
              <Text strong>Name:</Text> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p>
              <Text strong>Email:</Text> {selectedUser.email}
            </p>
            <p>
              <Text strong>Phone:</Text> {selectedUser.mobileNumber}
            </p>

            <Title level={4}>Bookings</Title>
            <Table
              columns={bookingColumns}
              dataSource={selectedUser.bookings}
              rowKey="bookId"
              pagination={false}
              size="small"
            />

            <Title level={4} style={{ marginTop: 20 }}>
              Spending Per Booking
            </Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={selectedUser.bookings.map((b: any, idx: number) => ({
                  name: `Booking ${idx + 1}`,
                  price: b.parkingLot?.price || 0,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#1677ff" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserData;
