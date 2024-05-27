import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "../../../components/grid/index";

import ChecklistCreate from "./create";

const Products = () => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState({});

  const handeEditAction = (e, row) => {
    e.preventDefault();
    setVisible(true);
    setIsEdit(true);
    setEdit(row);
    console.log(edit);
  };

  const handleCreate = (e) => {
    e.preventDefault(e);
    setVisible(true);
    setIsEdit(false);
  };

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      order: 0,
      sorter: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      order: 1,
      sorter: true,
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      order: 3,
      sorter: false,
      editable: true,
    },
    {
      title: "Paid Amount",
      order: 4,
      dataIndex: "paid_amount",
      sorter: false,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      order: 7,
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: "kitchens",
    content_type: "kitchens",
    title: "Kitchens",
    reduxKey: "kitchens",
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
          <ChecklistCreate
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
