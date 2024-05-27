import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { CCard, CCol, CRow } from "@coreui/react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Alert,
  message,
  Row,
  Col,
  Spin,
} from "antd";

import http from "../../config";

import { setInitGrid } from "src/redux/actions";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

const Edit = (props) => {
  const formRef = useRef(null);
  const { visible, handleClose, edit, isEdit } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("closed");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    isEdit && handleEdit();
  }, []);

  const handleEdit = () => {
    setLoading(true);
    setTimeout(() => {
      formRef.current.setFieldsValue({
        ...edit,
        password: null,
      });
      setLoading(false);
    }, 1000);
  };

  const onClose = () => {
    setValidationError("closed");
    setErrors([]);
    handleClose();
    formRef.current.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      isEdit
        ? await http.put(`/kitchens/${edit._id}`, values)
        : await http.post(`/kitchens`, values);
      formRef.current.resetFields();
      handleClose();
      dispatch(setInitGrid(true));
    } catch (err) {
      let error;
      if (typeof err.response.data.message === "string") {
        error = err.response.data.message;
      }
      let ers = [];
      if (err.response.data.errors) {
        let errs = err.response.data.errors;
        for (let p in errs) {
          let obj = {};
          obj.error = errs[p][0];
          ers.push(obj);
        }
        setErrors(ers);
        setValidationError(error);
      }
      message.error({ content: error, duration: 10 });
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title="Edit Kitchen"
            width="50%"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <Row>
              <Col span={14} offset={4}>
                {validationError !== "closed" && (
                  <Alert
                    message="Validation errors"
                    description={validationError}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: "10px" }}
                  />
                )}
                {errors.length > 0 &&
                  errors.map((item, index) => {
                    return (
                      <Alert
                        message={item.error}
                        type="error"
                        showIcon
                        key={index}
                        closable
                      />
                    );
                  })}
              </Col>
            </Row>
            <Spin spinning={loading}>
              <Form
                ref={formRef}
                labelCol={{ span: 10 }}
                layout="horizontal"
                onFinish={onFinish}
              >
                <Form.Item
                  label=" Name"
                  name="name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter kitchen name!",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "8px",
                  }}
                >
                  <Input placeholder="Phone" />
                </Form.Item>

                <Form.Item
                  label="Pan Number"
                  name="pan_number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter pan number!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input placeholder="Pan" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                    {
                      required: true,
                      message: "Please enter email address!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "8px",
                  }}
                >
                  <Input placeholder="Email" disabled={isEdit} />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: !isEdit,
                      message: "Please input password!",
                    },
                    {
                      min: 6,
                      message: "Password must be minimum 6 characters.",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password "
                  name="confirm_password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: !isEdit,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The password that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "8px",
                  }}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>

                <Form.Item
                  label=" Longitude "
                  name="longitude"
                  rules={[
                    {
                      required: true,
                      message: "Please enter longitude of address!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input placeholder="Longitude" />
                </Form.Item>

                <Form.Item
                  label="Latitude"
                  name="latitude"
                  rules={[
                    {
                      required: true,
                      message: "Please enter latitude of address!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "8px",
                  }}
                >
                  <Input placeholder="Latitude" />
                </Form.Item>

                <Form.Item
                  label="Delivery Radius"
                  name="deliver_radius"
                  rules={[
                    {
                      required: true,
                      message: "Please enter delivery radius!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input placeholder="Radius" />
                </Form.Item>

                <Form.Item label=" " colon={false}>
                  <Button type="primary" htmlType="submit" ghost>
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Drawer>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Edit;
