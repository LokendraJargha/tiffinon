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

import http from "src/config";
import { setInitGrid } from "src/redux/actions";

const UserCreate = (props) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const [state, setState] = useState({
    visible: false,
    loading: false,
    validationerror: "closed",
    errors: [],
    pass_update: false,
  });

  const { isEdit, admin } = props;

  useEffect(() => {
    if (isEdit) {
      initEdit();
    }
  }, [isEdit]);

  const initEdit = () => {
    admin.password = "";
    form.setFieldsValue(admin);
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
      setState({ ...state, loading: true });
      if (isEdit) {
        const { _id } = admin;
        await http.put(`/admins/${_id}`, values);
      } else {
        await http.post("/admins", values);
      }
      form.resetFields();
      props.handleClose();
      setState({ ...state, loading: false });
      props.setInitGrid({ init: true });
    } catch (err) {
      console.log(err);
      setState({ ...state, loading: false });
    }
  };

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
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter Name!" }]}
                >
                  <Input placeholder="Name" />
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
                  <Form.Item label="Update the password" name="pass_update">
                    <Tooltip
                      placement="top"
                      title="Admin's password can be updated on toggling the button."
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
                      <Input.Password placeholder="Password" />
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
                      <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                  </>
                )}

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

                {/* <Form.Item
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
                </Form.Item> */}

                <Form.Item label=" " colon={false}>
                  <Button type="primary" htmlType="submit">
                    {isEdit ? "Update Admin" : "Save Admin"}
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
export default connect(mapStateToProps, { setInitGrid })(UserCreate);
