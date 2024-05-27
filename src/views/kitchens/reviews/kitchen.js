import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "src/components/grid";

const KitchenReviews = () => {
  const columns = [
    {
      title: "Review",
      dataIndex: "review",
      order: 3,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      order: 4,
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      order: 5,
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: "reviews/kitchen",
    content_type: "reviews/kitchen",
    title: "Kitchen Reviews",
    reduxKey: "reviews/kitchen",
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
          column: "Kitchen",
          show: true,
          order: 1,
          relationName: "kitchen",
          relationColName: "name",
          dType: "obj",
        },
      ],
    },
    actions: {
      show: false,
      edit: {
        show: true,
        name: "Edit",
        type: "popup",
        callFunction: "handleEdit",
      },
      delete: {
        show: true,
        name: "Delete",
        type: "popup",
      },
    },
  };

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <GridTable columns={columns} acolumns={acolumns} />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default KitchenReviews;
