import React, { useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";

import GridTable from "src/components/grid";

import CategoryCreate from "./create";

const Categories = () => {
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
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      sorter: true,
    },
  ];
  const acolumns = {
    apiurl: "kitchen-categories",
    content_type: "kitchen-categories",
    title: "Kitchen Categories",
    reduxKey: "kitchen-categories",
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
          <CategoryCreate
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

export default Categories;
