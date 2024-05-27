import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CCard, CCol, CRow } from "@coreui/react";
import {
  Button,
  Drawer,
  Select,
  Switch,
  Tooltip,
  Form,
  Input,
  Alert,
  message,
  Row,
  Col,
  Spin,
} from "antd";

import http from "../../../config";
import { setInitGrid } from "../../../redux/actions";

const UserForm = (props) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const [state, setState] = useState({
    visible: false,
    loading: false,
    validationerror: "closed",
    errors: [],
    pass_update: false,
  });

  const { isEdit } = props;

  useEffect(() => {
    if (props.isEdit) {
      initEdit();
    }
  }, [props.isEdit]);

  const initEdit = () => {
    const { first_name, last_name, role_id, phone, email } = props.user;
    form.setFieldsValue({
      first_name: first_name,
      last_name: last_name,
      role_id: +role_id,
      phone: phone,
      email: email,
    });
  };

  const handlePassUpdate = (e) => {
    setState({ ...state, pass_update: e });
  };

  const onClose = () => {
    setState({
      ...state,
      validationerror: "closed",
      errors: [],
    });
    props.handleClose();
  };

  const handleSubmit = async (values) => {
    try {
      const { id } = props.user;
      setState({ ...state, loading: true });
      let url = isEdit ? `/users/${id}` : "/users";
      if (isEdit) {
        // its remove, since duplication issue
        delete values.email;
        await http.put(url, values);
      } else {
        await http.post(url, values);
      }
      form.resetFields();
      props.handleClose();
      setState({ ...state, loading: false });
      props.setInitGrid({ init: true });
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
  const { roles } = props;
  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title={`${props.isEdit ? "Edit User" : "Add New User"}`}
            width="720"
            closable={true}
            maskClosable={false}
            onClose={onClose}
            visible={props.visible}
          >
            <Row>
              <Col span={14} offset={6}>
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
                {state.errors.length > 0 &&
                  state.errors.map((item, index) => {
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
              </Col>
            </Row>
            <Spin spinning={state.loading}>
              <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    { required: true, message: "Please enter First Name!" },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item label="Last Name" name="last_name">
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter the email!" },
                    { type: "email", message: "Please enter the valid email!" },
                  ]}
                >
                  <Input placeholder="Email" disabled={isEdit} />
                </Form.Item>

                {isEdit && (
                  <Form.Item label="Update the password ?" name="pass_update">
                    <Tooltip
                      placement="top"
                      title="User password can be updated by switch on this toggle button."
                    >
                      <Switch
                        size="small"
                        checked={state.pass_update}
                        onChange={handlePassUpdate}
                      />
                    </Tooltip>
                  </Form.Item>
                )}

                {(!isEdit || state.pass_update) && (
                  <>
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
                    <Form.Item
                      label="Connfirm Password"
                      name="password_confirmation"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
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
                  </>
                )}
                <Form.Item
                  label="Phone Number"
                  name="phone"
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
                <Form.Item
                  label="Role"
                  name="role_id"
                  rules={[
                    { required: true, message: "Please select the role" },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a role.."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {roles.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                  <Button type="primary" htmlType="submit">
                    {isEdit ? "Update User" : "Save User"}
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
const mapStateToProps = (state) => ({
  roles: state.auth.roles,
});
export default connect(mapStateToProps, { setInitGrid })(UserForm);
