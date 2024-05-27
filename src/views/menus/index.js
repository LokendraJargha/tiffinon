import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "../../components/grid/index";

import MenuCreate from "./create";
import { Tag } from "antd";

const Menus = () => {
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState({});

  const handleCreate = (e) => {
    e.preventDefault();
    setVisible(true);
    setIsEdit(false);
  };

  const handeEditAction = (e, row) => {
    e.preventDefault();
    setVisible(true);
    setIsEdit(true);
    setEdit(row);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      editable: true,
    },
    {
      title: "Min Price",
      dataIndex: "minimum_price",
      sorter: true,
      editable: true,
    },
    {
      title: "Max Price",
      dataIndex: "maximum_price",
      sorter: true,
      editable: true,
    },
    {
      title: "Active",
      dataIndex: "is_active",
      order: 5,
      render: (value) => {
        return (
          <Tag color={value ? "green" : "red"}>
            {value ? "Active" : "Not Active"}
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: "menus",
    content_type: "menus",
    title: "Menus",
    reduxKey: "menus",
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
        type: "popup", //it should only two type: popup/url if type is url its redirect to path like {modules/id/edit},
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
          <MenuCreate
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

export default Menus;
