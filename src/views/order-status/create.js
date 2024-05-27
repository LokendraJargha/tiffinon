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

const OrderCreate = (props) => {
  const formRef = useRef(null);
  const { isEdit, edit } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("closed");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isEdit) handleEdit();
  }, []);

  const handleEdit = () => {
    setLoading(true);
    setTimeout(() => {
      formRef.current.setFieldsValue(edit);
      setLoading(false);
    }, 1000);
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
      let url = isEdit ? `/status/${edit._id}` : "/status";
      if (!isEdit) {
        await http.post(url, values);
      } else {
        await http.put(url, values);
      }
      formRef.current.resetFields();
      props.handleClose();
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
            title={`${isEdit ? "Edit Status" : "Add New Status"}`}
            width="40%"
            closable={true}
            onClose={onClose}
            visible={props.visible}
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
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter menu name!",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
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

export default OrderCreate;
