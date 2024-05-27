import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "../../components/grid/index";

import UserCreate from "./create";
import Permissions from "../../components/auth/permissions/index";

const Users = () => {
  const [state, setState] = useState({
    visible: false,
  });
  const [permission, setPermission] = useState({
    visible: false,
  });

  const handleCreate = (e) => {
    e.preventDefault();
    setState({ visible: true, isEdit: false, user: {} });
  };

  const handeEditAction = (e, row) => {
    e.preventDefault();
    setState({ visible: true, isEdit: true, admin: row });
  };

  const handleUserPermission = (e, row) => {
    e.preventDefault();
    setPermission({ visible: true, user: row });
  };

  const handleBulkUpdateStatus = (e) => {
    e.preventDefault();
    console.log("test");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      sorter: true,
      editable: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      editable: false,
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: "admins",
    title: "Admins",
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
      delete: {
        show: true,
        value: "delete",
        name: "Delete",
        type: "popup",
      },
    },
    // pivotRelation: {
    //   items: [
    //     {
    //       column: "Role",
    //       show: true,
    //       relationName: "role",
    //       relationColName: "name",
    //       dType: "obj", //we can pass dType like array or object
    //     },
    //   ],
    // },
    // statusColumn: [
    //   {
    //     column: "Active",
    //     dataIndex: "status",
    //     show: true,
    //     order: 6,
    //     primaryIndex: true, //only one column should be true
    //     callFunction: "",
    //   },
    // ],
    actions: {
      show: true,
      edit: {
        show: true,
        name: "Edit",
        type: "popup", //it should only two type: popup/url if type is url its redirect to path like {modules/id/edit}
        callFunction: "handleEdit",
      },
      // permission: {
      //   show: true,
      //   type: "popup",
      //   name: "Change Permission",
      //   callFunction: "handleUserPermission",
      // },
      delete: {
        show: true,
        type: "popup",
        name: "Delete",
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
            handleBulkUpdateStatus={(e) => handleBulkUpdateStatus(e)}
            handleEdit={(e, row) => handeEditAction(e, row)}
            handleUserPermission={(e, row) => handleUserPermission(e, row)}
          />
        </CCard>
      </CCol>
      {state.visible && (
        <UserCreate
          {...state}
          handleClose={() => setState({ visible: false })}
        />
      )}
      {/* {permission.visible && (
        <Permissions
          {...permission}
          handleClose={() => setPermission({ visible: false })}
        />
      )} */}
    </CRow>
  );
};

export default Users;
