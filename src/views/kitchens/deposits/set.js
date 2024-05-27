import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Modal,
  Card,
} from "antd";

import KitchenCategoryForm from "../categories/form";
import DisplayDeposit from "./displayDeposits";

import http from "src/config";
import { setInitGrid } from "src/redux/actions";

const DepositCreate = (props) => {
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const initGrid = useSelector((state) => state.grid.init);

  const [loading, setLoading] = useState(false);
  const [kitchenCategories, setKitchenCategories] = useState([]);
  const [validationError, setValidationError] = useState("closed");
  const [errors, setErrors] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    initData();
  }, [initGrid]);

  const initData = async () => {
    try {
      setLoading(true);
      const categoryRes = await http.get("/kitchen-categories");
      setKitchenCategories(categoryRes.data.data);
      setLoading(false);
    } catch (error) {
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
      await http.post(`/set-deposits`, values);
      formRef.current.resetFields();
      // props.handleClose();
      // dispatch(setInitGrid(true));
    } catch (err) {
      // let error;
      // if (typeof err.response.data.message === "string") {
      //   error = err.response.data.message;
      // }
      // let ers = [];
      // if (err.response.data.errors) {
      //   let errs = err.response.data.errors;
      //   for (let p in errs) {
      //     let obj = {};
      //     obj.error = errs[p][0];
      //     ers.push(obj);
      //   }
      //   setErrors(ers);
      //   setValidationError(error);
      // }
      // message.error({ content: error, duration: 10 });
      console.log(err);
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    if (e === "create-new") {
      formRef.current.setFieldsValue({ kitchenCategory: "" });
      setFormVisible(true);
    }
  };

  const handleCategoryForm = () => setFormVisible(false);

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title="Set Deposits"
            width="60%"
            closable={true}
            onClose={onClose}
            visible={props.visible}
          >
            <DisplayDeposit />

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

            <Card title="Set a New Deposit" size="small">
              <Form
                ref={formRef}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Kitchen Category"
                  name="kitchenCategory"
                  rules={[
                    {
                      required: true,
                      message: "Please select a kitchen category!",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Select
                    showSearch
                    placeholder="Select Category"
                    optionFilterProp="children"
                    style={{ width: "80%" }}
                    onChange={(e) => handleCategoryChange(e)}
                  >
                    <Select.Option value="create-new">
                      Create New Category
                    </Select.Option>
                    {kitchenCategories.map((category) => {
                      return (
                        <Select.Option key={category._id} value={category._id}>
                          {category.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[
                    {
                      pattern: /^(?:\d*)$/,
                      message: "Enter only number",
                    },
                    {
                      required: true,
                      message: "Enter amount for deposit!",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Input placeholder="Amount" style={{ width: "50%" }} />
                </Form.Item>

                <Form.Item
                  label="Commission"
                  name="commission_percent"
                  rules={[
                    {
                      pattern: /^[0-9]+(\.[0-9]*)?$/,
                      message: "Enter only number",
                    },
                    {
                      required: true,
                      message: "Enter amount for deposit!",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Input placeholder="Commission" style={{ width: "50%" }} />
                </Form.Item>

                <Form.Item label=" " colon={false}>
                  <Button type="primary" htmlType="submit" ghost>
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Modal
              title="Create New Kitchen Category"
              width={600}
              centered
              onCancel={handleCategoryForm}
              visible={formVisible}
              footer={null}
            >
              <KitchenCategoryForm handleClose={handleCategoryForm} />
            </Modal>
          </Drawer>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default DepositCreate;
