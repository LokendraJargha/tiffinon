import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { Tabs } from "antd";

import FoodReviews from "./food";
import KitchenReviews from "./kitchen";

const Reviews = () => {
  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Tabs defaultActiveKey="1" style={{ padding: "1rem 2rem" }}>
            <Tabs.TabPane tab="Food Reviews" key="1">
              <FoodReviews />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kitchen Reviews" key="2">
              <KitchenReviews />
            </Tabs.TabPane>
          </Tabs>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Reviews;
