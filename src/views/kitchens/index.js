import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { Tag } from "antd";

import GridTable from "../../components/grid";

import View from "./view";
import KitchenCreate from "./create";
import Checklist from "./checklist";

const Kitchens = () => {
  const [visible, setVisible] = useState({
    edit: false,
    view: false,
    checklist: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});

  const handleDrawer = (e, row, type) => {
    e.preventDefault();
    if (type === "edit") setIsEdit(true);
    setData(row);
    if (type === "create") {
      setIsEdit(false);
      setVisible({ ...visible, edit: true });
      return;
    }
    setVisible({ ...visible, [type]: true });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      order: 0,
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      order: 1,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      order: 3,
    },
    {
      title: "Pan Number",
      dataIndex: "pan_number",
      order: 4,
      sorter: false,
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
      title: "Verified",
      dataIndex: "is_verified",
      order: 6,
      render: (value) => {
        return (
          <Tag color={value ? "green" : "red"}>
            {value ? "Verified" : "Not Verified"}
          </Tag>
        );
      },
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   order: 7,
    //   sorter: true,
    // },
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
        type: "popup", //popup or link if type is link must be define url
        url: "",
        callFunction: "handleCreate",
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
      checklist: {
        show: true,
        name: "Checklist",
        type: "popup",
        callFunction: "handleChecklist",
      },
      view: {
        show: true,
        name: "View",
        type: "popup",
        callFunction: "handleView",
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
            handleCreate={(e, row) => handleDrawer(e, row, "create")}
            handleEdit={(e, row) => handleDrawer(e, row, "edit")}
            handleView={(e, row) => handleDrawer(e, row, "view")}
            handleChecklist={(e, row) => handleDrawer(e, row, "checklist")}
            handleFoodMenu={(e, row) => handleDrawer(e, row, "menu")}
          />
        </CCard>
      </CCol>

      {visible.view && (
        <View
          visible={visible.view}
          handleClose={() => setVisible({ ...visible, view: false })}
          data={data}
        />
      )}

      {visible.edit && (
        <KitchenCreate
          visible={visible.edit}
          handleClose={() => setVisible({ ...visible, edit: false })}
          edit={data}
          isEdit={isEdit}
        />
      )}

      {visible.checklist && (
        <Checklist
          visible={visible.checklist}
          handleClose={() => setVisible({ ...visible, checklist: false })}
          data={data}
        />
      )}
    </CRow>
  );
};

export default Kitchens;
