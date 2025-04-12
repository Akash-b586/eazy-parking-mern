import { useState } from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";
import axios from "axios";
import { BACKEND_URL } from "@/utils/backend";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AddParkingLot = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // use form instance
  const url = `${BACKEND_URL}/api/admin/addParkingLot`;

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      });
      toast.success("Parking lot added successfully!");
      form.resetFields(); // reset form after success
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to add parking lot."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Add New Parking Lot"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        marginTop: "2rem",
        borderRadius: "1rem",
      }}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter the location" }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imgUrl"
          rules={[{ required: true, message: "Please enter an image URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item
          label="Total Slots"
          name="totalSlot"
          rules={[
            { required: true, message: "Please enter total number of slots" },
          ]}
        >
          <InputNumber
            placeholder="Enter total slots"
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Price (per hour)"
          name="price"
          rules={[{ required: true, message: "Please enter the price in Rs" }]}
        >
          <InputNumber
            placeholder="Enter price"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            disabled={loading}
          >
            Add Parking Lot
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddParkingLot;
