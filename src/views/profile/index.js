import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Alert,
  message,
  Col,
  Row,
  Switch,
  Spin,
} from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { CCard, CCol, CRow, CCardHeader, CCardBody } from "@coreui/react";

import http from "src/config";

const Profile = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [admin, setAdmin] = useState({});
  const [state, setState] = useState({
    loading: false,
    validationerror: "closed",
    errors: [],
    adminId: null,
    updatePassword: false,
  });

  useEffect(() => {
    profileInfo();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: admin.name,
      email: admin.email,
      phone_number: admin.phone_number,
    });
  }, [admin]);

  const profileInfo = async () => {
    try {
      setState({ ...state, loading: true });
      const res = await http.get("/admins/profile");
      setAdmin(res.data.admin);
      setState({ ...state, loading: false });
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };

  const handlePasswordToggle = (e) => {
    setState({ ...state, updatePassword: e });
  };

  const handleSubmit = async (values) => {
    try {
      setState({ ...state, loading: true });
      let url = `auth/admins/${admin._id}`;
      const res = await http.put(url, values);

      if (state.updatePassword && res.status === 200) {
        await http.post("auth/log-out");
        history.push("/login");
      }

      setState({ ...state, loading: false });
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
      }
      message.error({ content: error, duration: 10 });
      setState({
        ...state,
        loading: false,
        errors: ers,
        validationerror: error,
      });
    }
  };
  const { updatePassword } = state;
  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <CCardHeader>
            <h5 style={{ marginBottom: 0 }}>
              Manage your personal information and preferences
            </h5>
          </CCardHeader>
          <CCardBody>
            <Row>
              <Col sapn={24} offset={2} style={{ marginBottom: "40px" }}>
                {state.validationerror !== "closed" && (
                  <Alert
                    message="Validation errors"
                    description={state.validationerror}
                    type="error"
                    showIcon
                    closable
                    style={{ marginBottom: "10px" }}
                  />
                )}
                {state.errors &&
                  state.errors.length > 0 &&
                  state.errors.map((item, index) => {
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

            <Spin spinning={state.loading}>
              <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      icon={<AntDesignOutlined />}
                      rules={[
                        { required: true, message: "Please enter name!" },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter valid phone number!",
                        },
                        {
                          pattern:
                            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                          message:
                            "Please enter valid phone no. eg:(XXX-XXX-XXXX) (XXX.XXX.XXXX) (XXX XXX XXXX).",
                        },
                      ]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Email" name="email">
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Update Password" name="updatePassword">
                      <Switch
                        size="small"
                        checked={updatePassword}
                        onChange={handlePasswordToggle}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  {updatePassword && (
                    <>
                      <Col span={12}>
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                            {
                              min: 8,
                              message:
                                "The password must be at least 8 characters.",
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Confirm Password"
                          name="password_confirmation"
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  "The two passwords that you entered do not match!"
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
                <Form.Item label=" " colon={false}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={state.loading}
                  >
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Profile;
