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
  Select,
} from "antd";

import http from "src/config";

import { setInitGrid } from "src/redux/actions";

const OrderCreate = (props) => {
  const formRef = useRef(null);
  const { isEdit, edit } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("closed");
  const [errors, setErrors] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [menus, setMenus] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [menuDisable, setMenuDisable] = useState(true);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    isEdit && handleEdit();
  }, [orderStatus]);

  const initData = async () => {
    try {
      setLoading(true);
      const kitchenRes = await http.get("commons/kitchens");
      const userRes = await http.get("commons/users");
      setKitchens(kitchenRes.data.kitchens);
      setUsers(userRes.data.users);

      if (isEdit) {
        const statusRes = await http.get("commons/status");
        const orderStatusRes = await http.get(`order-status/${edit._id}`);
        setOrderStatus(orderStatusRes.data.status);
        setStatus(statusRes.data.status);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setLoading(true);
    const { kitchen, food_menu, user, phone_number, latitude, longitude } =
      edit;
    fetchFoodMenus(kitchen._id);

    setTimeout(() => {
      formRef.current.setFieldsValue({
        kitchen: kitchen._id,
        food_menu: food_menu._id,
        user: user._id,
        phone_number,
        latitude,
        longitude,
        status: orderStatus?.status?._id,
      });
      setLoading(false);
    }, 1000);
  };

  const fetchFoodMenus = async (kitchenID) => {
    try {
      setLoading(true);
      const foodMenuRes = await http.get(`commons/food-menus/${kitchenID}`);
      setMenus(foodMenuRes.data.foodMenus);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onClose = () => {
    setValidationError("closed");
    setErrors([]);
    props.handleClose();
    formRef.current.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values.order_status = orderStatus._id;
      let url = isEdit ? `/orders/${edit._id}` : "/orders";
      if (!isEdit) {
        await http.post(url, values);
      } else {
        await http.put(url, values);
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

  const handleKitchenChange = async (value) => {
    try {
      setLoading(true);
      const foodMenuRes = await http.get(`commons/food-menus/${value}`);
      setMenus(foodMenuRes.data.foodMenus);
      setMenuDisable(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title={`${isEdit ? "Edit Order" : "Add New Order"}`}
            width="70%"
            closable={true}
            onClose={onClose}
            visible={props.visible}
            destroyOnClose={true}
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
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 22 }}
                layout="horizontal"
                onFinish={onFinish}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Kitchen Name"
                      name="kitchen"
                      rules={[
                        {
                          required: true,
                          message: "Please select a kitchen!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select Kitchen"
                        optionFilterProp="children"
                        style={{ width: "80%" }}
                        onChange={(e) => handleKitchenChange(e)}
                      >
                        {kitchens.map((item) => {
                          return (
                            <Select.Option key={item._id} value={item._id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    {!isEdit ? (
                      <Form.Item
                        label="Food Menu"
                        name="food_menus"
                        rules={[
                          {
                            required: true,
                            message: "Please select a menu!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          mode="multiple"
                          placeholder="Select Menu"
                          optionFilterProp="children"
                          disabled={menuDisable}
                          style={{ width: "80%" }}
                        >
                          {menus.map((item) => {
                            return (
                              <Select.Option key={item._id} value={item._id}>
                                {item.menu.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item
                        label="Food Menu"
                        name="food_menu"
                        rules={[
                          {
                            required: true,
                            message: "Please select a menu!",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select Menu"
                          optionFilterProp="children"
                          style={{ width: "80%" }}
                        >
                          {menus.map((item) => {
                            return (
                              <Select.Option key={item._id} value={item._id}>
                                {item.menu.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    )}
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="User"
                      name="user"
                      rules={[
                        {
                          required: true,
                          message: "Please select a user!",
                        },
                      ]}
                      // style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        showSearch
                        placeholder="Select User"
                        optionFilterProp="children"
                        style={{ width: "80%" }}
                      >
                        {users.map((item) => {
                          return (
                            <Select.Option key={item._id} value={item._id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the phone number!",
                        },
                      ]}
                    >
                      <Input style={{ width: "80%" }} placeholder="Phone" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Longitude"
                      name="longitude"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the longitude of the user!",
                        },
                      ]}
                    >
                      <Input style={{ width: "50%" }} placeholder="Longitude" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Latitude"
                      name="latitude"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the latitude of the user!",
                        },
                      ]}
                    >
                      <Input style={{ width: "50%" }} placeholder="Latitude" />
                    </Form.Item>
                  </Col>

                  {isEdit && (
                    <>
                      <Col span={12}>
                        <Form.Item
                          label="Order Status"
                          name="status"
                          rules={[
                            {
                              required: true,
                              message: "Please select a status of the order!",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select Status"
                            optionFilterProp="children"
                            style={{ width: "80%" }}
                          >
                            {status.map((item) => {
                              return (
                                <Select.Option key={item._id} value={item._id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}></Col>
                    </>
                  )}

                  <Col span={12}>
                    <Form.Item label=" " colon={false}>
                      <Button type="primary" htmlType="submit" ghost>
                        Save
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Drawer>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default OrderCreate;
