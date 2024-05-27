import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "src/components/grid";

const FoodMenus = ({ id }) => {
  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      order: 1,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      order: 2,
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: `food-menus/${id}`,
    content_type: "",
    title: "Food Menus",
    reduxKey: `food-menus//${id}`,
    settings: {
      show: false,
      create: {
        show: false,
        name: "Create",
        value: "create",
        type: "popup",
        url: "",
        callFunction: "handleCreate",
      },
    },
    pivotRelation: {
      items: [
        {
          column: "Menu",
          show: true,
          order: 0,
          relationName: "menu",
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

export default FoodMenus;
