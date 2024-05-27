import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { Link, useHistory } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Alert, Spin, message } from "antd";
import { local } from "brownies";
import { connect } from "react-redux";

import http from "../../../config";
import { setUser, setRoles } from "../../../redux/actions";

const Login = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    errors: [],
    validationError: "closed",
    loading: false,
  });

  const handleLogin = async (values) => {
    try {
      setState({ ...state, loading: true });
      let result = await http.post("/auth/admin/login", values);
      let auth = result.data;
      local.access_token = auth.access_token;
      props.setUser(auth.user);
      props.setRoles(auth.roles);
      setState({ ...state, loading: false });
      history.push("/dashboard");
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
      setState({
        ...state,
        loading: false,
        errors: ers,
        validationError: error,
      });

      message.error({ content: error, duration: 2 });
    }
  };

  const { errors, validationError, loading } = state;

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <h1>Login</h1>
                <p className="text-muted" style={{ marginBottom: "30px" }}>
                  Sign In to your account
                </p>
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
                        style={{ marginBottom: "20px" }}
                        type="error"
                        showIcon
                        key={index}
                        closable
                      />
                    );
                  })}
                <Spin spinning={loading}>
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                    layout="vertical"
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                      ]}
                      label="Email"
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Input Your Email"
                        className="form-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                      label="Password"
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        type="password"
                        placeholder="Input Password"
                        className="form-input"
                      />
                    </Form.Item>
                    <div className="form-footer">
                      <Form.Item>
                        <Form.Item
                          name="remember"
                          valuePropName="checked"
                          noStyle
                        >
                          <Checkbox>
                            <span className="text-muted">Remember me</span>
                          </Checkbox>
                        </Form.Item>
                        <Link
                          to="/forgot-password"
                          className="login-form-forgot"
                          style={{ float: "right", color: "#3c3c3c" }}
                        >
                          Forgot Password?
                        </Link>
                      </Form.Item>
                    </div>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </Spin>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none">
                <CCardBody className="text-center">
                  <div>
                    <h2>Bizmyad</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setUser, setRoles })(Login);
