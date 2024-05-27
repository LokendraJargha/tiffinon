import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { Tag } from "antd";
import GridTable from "../../components/grid";
import User from "./update";

const Users = () => {
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
      order: 0,
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      order: 1,
      editable: false,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      order: 3,
      editable: false,
    },
    {
      title: "Address",
      dataIndex: "address",
      order: 3,
      editable: false,
    },
    {
      title: "Active",
      dataIndex: "is_active",
      order: 4,
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
      order: 5,
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: "users",
    content_type: "users",
    title: "Users",
    reduxKey: "users",
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
        // callFunction: "handleDelete",
      },
    },
    // pivotRelation: {
    //   items: [
    //     {
    //       column: "Role",
    //       show: true,
    //       order: "2",
    //       relationName: "role",
    //       relationColName: "name",
    //       dType: "obj",
    //     },
    //   ],
    // },
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
        // callFunction: "handleDelete",
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
          <User
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

export default Users;
