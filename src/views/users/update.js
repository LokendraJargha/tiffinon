import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CCard, CCol, CRow } from "@coreui/react";
import {
  AntDesignOutlined,
  HomeOutlined,
  PhoneOutlined,
  UploadOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import {
  Select,
  Button,
  Card,
  Form,
  Input,
  Alert,
  message,
  Row,
  Col,
  Spin,
  Drawer,
} from "antd";
import _ from "lodash";
import UserMap from "./usermap";
import http from "../../config";
import { setInitGrid } from "src/redux/actions";
const Users = (props) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { edit, isEdit } = props;
  const [user, setUser] = useState({
    latitude: edit.latitude,
    longitude: edit.longitude,
    address: edit.address,
  });

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("closed");
  const [errors, setErrors] = useState([]);

  const [status, setStatus] = useState([true, false]);

  useEffect(() => {
    isEdit ? handleEdit() : setUser({});
  }, [isEdit]);
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

  const onFinish = async (values) => {
    const newValues = _.extend(values, user);

    try {
      setLoading(true);
      let url = isEdit ? `/users/${edit._id}` : "/users";
      if (!isEdit) {
        await http.post(url, newValues);
      } else {
        await http.put(url, newValues);
      }
      formRef.current.resetFields();
      props.handleClose();
      dispatch(setInitGrid(true));
      setLoading(false);
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

  const onClose = () => {
    setErrors([]);
    setValidationError("closed");
    formRef.current.resetFields();
    props.handleClose();
  };
  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title={`${isEdit ? "Edit User" : "Create New User"}`}
            width="55%"
            closable={true}
            onClose={onClose}
            visible={props.visible}
            // destroyOnClose={true}
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
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                layout="horizontal"
              >
                <Form.Item
                  label=" Name"
                  name="name"
                  icon={<AntDesignOutlined />}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "-20px",
                  }}
                >
                  <Input placeholder="Email" disabled={isEdit} />
                </Form.Item>

                <Form.Item
                  label="Phone"
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
                  }}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Phone Number"
                  />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "-20px",
                  }}
                >
                  <Input placeholder="Gender" />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Address" />
                </Form.Item>

                <Form.Item
                  label="Staus"
                  name="is_active"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "-20px",
                  }}
                >
                  <Select placeholder="Please select">
                    {status.map((bill) => {
                      return (
                        <Select.Option key={bill} value={bill}>
                          {bill == true ? "Active" : "Not Active"}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                {/* <Form.Item
                  label=" Longitude "
                  name="longitude"
                  icon={<AntDesignOutlined />}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <Input placeholder="Longitude" />
                </Form.Item> */}

                {/* <Form.Item
                  label="Latitude"
                  name="latitude"
                  icon={<AntDesignOutlined />}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: "-20px",
                  }}
                >
                  <Input placeholder="Latitude" />
                </Form.Item> */}

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
                    prefix={<LockOutlined />}
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
                    marginLeft: "-20px",
                  }}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>

                <UserMap isEdit={isEdit} user={user} setUser={setUser} />
                <Form.Item
                  label=" "
                  colon={false}
                  style={{ display: "block", marginTop: "-20px" }}
                >
                  <Button type="primary" htmlType="submit">
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

export default Users;
