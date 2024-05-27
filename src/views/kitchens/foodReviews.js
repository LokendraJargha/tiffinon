import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { Modal, Descriptions } from "antd";

import GridTable from "src/components/grid";

const FoodReviews = ({ id }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const handleView = (e, row) => {
    e.preventDefault();
    setData(row);
    setVisible(true);
  };

  const columns = [
    {
      title: "Review",
      dataIndex: "review",
      order: 3,
      render: (value) => {
        return `${value.substring(0, 30)}${value.length > 30 ? "..." : ""}`;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      order: 4,
      sorter: true,
    },
    {
      title: "Posted At",
      dataIndex: "created_at",
      order: 5,
      sorter: true,
    },
  ];

  const acolumns = {
    apiurl: `reviews/food/${id}`,
    content_type: "reviews/food",
    title: "Food Reviews",
    reduxKey: "reviews/food",
    settings: {
      show: false,
      create: {
        show: false,
        name: "Create",
        value: "create",
        type: "popup", //popup or link if type is link must be define url
        url: "",
        callFunction: "handleCreate",
      },
    },
    pivotRelation: {
      items: [
        {
          column: "User",
          show: true,
          order: 0,
          relationName: "user",
          relationColName: "name",
          dType: "obj",
        },
        {
          column: "Menu",
          show: true,
          order: 2,
          relationName: "food_menu.menu",
          relationColName: "name",
          dType: "obj",
        },
      ],
    },
    actions: {
      show: true,
      edit: {
        show: false,
        name: "Edit",
        type: "popup",
        callFunction: "handleEdit",
      },
      view: {
        show: true,
        name: "View",
        type: "popup",
        callFunction: "handleView",
      },
      delete: {
        show: false,
        name: "Delete",
        type: "popup",
      },
    },
  };

  const { food_menu, rating, review, user, createdAt } = data;

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <GridTable
            columns={columns}
            acolumns={acolumns}
            handleView={(e, row) => handleView(e, row)}
          />
        </CCard>

        {visible && (
          <Modal
            title="View Review"
            width={700}
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            destroyOnClose={true}
          >
            <Descriptions title="" size="small" bordered>
              <Descriptions.Item label="Menu" span={3}>
                <strong style={{ textTransform: "uppercase" }}>
                  {food_menu.menu.name}
                </strong>
              </Descriptions.Item>
              <Descriptions.Item label="User" span={3}>
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Review" span={3}>
                {review}
              </Descriptions.Item>
              <Descriptions.Item label="Rating" span={3}>
                {rating}
              </Descriptions.Item>
              <Descriptions.Item label="Posted At" span={3}>
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(createdAt))}
              </Descriptions.Item>
            </Descriptions>
          </Modal>
        )}
      </CCol>
    </CRow>
  );
};

export default FoodReviews;
