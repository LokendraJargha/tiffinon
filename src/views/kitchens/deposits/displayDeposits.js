import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "src/components/grid/index";

const Deposits = () => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSet = (e) => {
    e.preventDefault();
    setVisible(true);
    setIsEdit(false);
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      order: 1,
      sorter: true,
      editable: true,
    },
    {
      title: "Commission(%)",
      dataIndex: "commission_percent",
      order: 2,
      sorter: true,
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: true,
      order: 3,
    },
  ];

  const acolumns = {
    apiurl: "set-deposits",
    content_type: "set-deposits",
    title: "Set Deposits",
    reduxKey: "set-deposits",
    settings: {
      show: true,
      create: {
        show: false,
        name: "",
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
          column: "Kitchen Category",
          show: true,
          order: 0,
          relationName: "kitchenCategory",
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
            handleSet={(e) => handleSet(e)}
            // handleEdit={(e, row) => handeEditAction(e, row)}
          />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Deposits;
