import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "../../../components/grid/index";

import OrderCreate from "./create";

const Products = () => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState({});

  const handeEditAction = (e, row) => {
    e.preventDefault();
    setVisible(true);
    setIsEdit(true);
    setEdit(row);
  };

  const handleCreate = (e) => {
    e.preventDefault(e);
    setVisible(true);
    setIsEdit(false);
  };

  const columns = [
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      order: 3,
      sorter: true,
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      order: 4,
      sorter: true,
    },
  ];

  const acolumns = {
    apiurl: "orders",
    content_type: "orders",
    title: "Orders",
    reduxKey: "orders",
    settings: {
      show: true,
      create: {
        show: true,
        name: "Create",
        value: "create",
        type: "popup",
        url: "",
        callFunction: "handleCreate",
      },
      delete: {
        show: true,
        value: "delete",
        name: "Delete",
        type: "popup",
      },
    },
    pivotRelation: {
      items: [
        {
          column: "Menu",
          show: true,
          order: 0,
          relationName: "food_menu.menu",
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
        {
          column: "User",
          show: true,
          order: 2,
          relationName: "user",
          relationColName: "name",
          dType: "obj",
        },
      ],
    },
    actions: {
      show: true,
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
          <GridTable
            columns={columns}
            acolumns={acolumns}
            handleCreate={(e) => handleCreate(e)}
            handleEdit={(e, row) => handeEditAction(e, row)}
          />
        </CCard>
        {visible && (
          <OrderCreate
            visible={visible}
            handleClose={() => setVisible(false)}
            isEdit={isEdit}
            edit={edit}
          />
        )}
      </CCol>
    </CRow>
  );
};

export default Products;
