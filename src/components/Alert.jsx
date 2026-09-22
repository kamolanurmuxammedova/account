
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

const { Text } = Typography;

const UrlInput = (props) => {
  return (
    <Space.Compact style={{ width: "100%" }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          background: "#f5f7fa",
          border: "1px solid #d9dfe8",
          borderRight: 0,
          color: "#667085",
          fontSize: 14,
        }}
      >
        https://
      </span>

      <Input
        style={{
          height: 44,
        }}
        {...props}
      />

      <span
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          background: "#f5f7fa",
          border: "1px solid #d9dfe8",
          borderLeft: 0,
          color: "#667085",
          fontSize: 14,
        }}
      >
        .com
      </span>
    </Space.Compact>
  );
};

export default function NewAccount() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showDrawer}
        icon={<PlusOutlined />}
        style={{
          height: 44,
          padding: "0 20px",
          borderRadius: 10,
          fontWeight: 600,
          boxShadow: "0 5px 14px rgba(22,119,255,0.25)",
        }}
      >
        New account
      </Button>

      <Drawer
        title={
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#101828",
              }}
            >
              Create a new account
            </div>

            <Text
              type="secondary"
              style={{
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              Fill in the information below to create a new account
            </Text>
          </div>
        }
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          header: {
            padding: "24px 28px",
            borderBottom: "1px solid #eef1f5",
          },
          body: {
            padding: "28px",
            background: "#f8fafc",
          },
          footer: {
            padding: "16px 28px",
            borderTop: "1px solid #eef1f5",
          },
        }}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <Button
              size="large"
              onClick={onClose}
              style={{
                borderRadius: 9,
                minWidth: 100,
              }}
            >
              Cancel
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              form="account-form"
              style={{
                borderRadius: 9,
                minWidth: 120,
                fontWeight: 600,
              }}
            >
              Create Account
            </Button>
          </div>
        }
      >
        <Form
          id="account-form"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 14,
              border: "1px solid #eef1f5",
              boxShadow: "0 3px 12px rgba(16,24,40,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 650,
                marginBottom: 20,
                color: "#101828",
              }}
            >
              Account Information
            </div>

            <Row gutter={18}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter user name",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter user name"
                    style={{ borderRadius: 9 }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Website"
                  rules={[
                    {
                      required: true,
                      message: "Please enter url",
                    },
                  ]}
                >
                  <UrlInput placeholder="Enter website" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={18}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[
                    {
                      required: true,
                      message: "Please select an owner",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select an owner"
                    options={[
                      {
                        label: "Xiaoxiao Fu",
                        value: "xiao",
                      },
                      {
                        label: "Maomao Zhou",
                        value: "mao",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Account Type"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the type",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Choose account type"
                    options={[
                      {
                        label: "Private",
                        value: "private",
                      },
                      {
                        label: "Public",
                        value: "public",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={18}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the approver",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Choose approver"
                    options={[
                      {
                        label: "Jack Ma",
                        value: "jack",
                      },
                      {
                        label: "Tom Liu",
                        value: "tom",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="Date & Time"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the date",
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    size="large"
                    style={{
                      width: "100%",
                      borderRadius: 9,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Write a short description..."
                style={{
                  borderRadius: 9,
                  resize: "none",
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

