import React, { useState, useEffect } from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { Drawer, Descriptions, Card, Tag, Tabs } from "antd";

import http from "../../config";

import KitchenReviews from "./kitchenReviews";
import FoodReviews from "./foodReviews";
import FoodMenus from "./foodMenu";
import ImageDisplay from "./imageDisplay";

const View = (props) => {
  const { data, visible, handleClose } = props;
  const {
    _id,
    name,
    email,
    pan_number,
    phone_number,
    is_verified,
    is_active,
    deliver_radius,
  } = data;

  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      setLoading(true);
      const uploadRes = await http.get(`/check-lists/${_id}`);
      setUploads(uploadRes.data.checklists);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onClose = () => handleClose();

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title={`View Kitchen`}
            width="70%"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <Descriptions
              title=""
              size="small"
              bordered
              style={{ marginBottom: "2rem" }}
            >
              <Descriptions.Item label="Name" span={3}>
                <strong style={{ textTransform: "uppercase" }}>{name}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={1.5}>
                {email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={1.5}>
                {phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Pan Number" span={1.5}>
                {pan_number}
              </Descriptions.Item>
              <Descriptions.Item label="Delivery Radius" span={1.5}>
                {deliver_radius}
              </Descriptions.Item>
              <Descriptions.Item label="Verification" span={1.5}>
                <Tag color={is_verified ? "green" : "red"}>
                  {is_verified ? "Verified" : "Not Verified"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Active" span={1.5}>
                <Tag color={is_active ? "green" : "red"}>
                  {is_active ? "Active" : "Not Active"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <ImageDisplay uploads={uploads} loading={loading} column={3} />

            <Card
              title="Menus"
              size="small"
              loading={loading}
              style={{ margin: "2rem 0" }}
            >
              <FoodMenus id={_id} />
            </Card>

            <Card
              title="Reviews"
              size="small"
              loading={loading}
              style={{ margin: "2rem 0" }}
            >
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Food Reviews" key="1">
                  <FoodReviews id={_id} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Kitchen Reviews" key="2">
                  <KitchenReviews id={_id} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Drawer>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default View;
