import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "src/components/grid/index";

import DepositCreate from "./set";

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
      title: "Created At",
      dataIndex: "created_at",
      sorter: true,
      order: 2,
    },
  ];

  const acolumns = {
    apiurl: "deposits",
    content_type: "deposits",
    title: "Deposits",
    reduxKey: "deposits",
    settings: {
      show: true,
      create: {
        show: true,
        name: "Set Deposit",
        value: "create",
        type: "popup",
        url: "",
        callFunction: "handleSet",
      },
      delete: {
        show: false,
        value: "delete",
        name: "Delete",
        type: "popup",
      },
    },
    pivotRelation: {
      items: [
        {
          column: "Kitchen",
          show: true,
          order: "0",
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
          <GridTable
            columns={columns}
            acolumns={acolumns}
            handleSet={(e) => handleSet(e)}
            // handleEdit={(e, row) => handeEditAction(e, row)}
          />
        </CCard>
        {visible && (
          <DepositCreate
            visible={visible}
            handleClose={() => setVisible(false)}
          />
        )}
      </CCol>
    </CRow>
  );
};

export default Deposits;
