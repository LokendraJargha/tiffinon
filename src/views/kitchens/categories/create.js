import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import { Drawer } from "antd";
import CategoryForm from "./form";

const CategoryCreate = (props) => {
  const { isEdit, edit, handleClose } = props;
  console.log(props);

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title={`${isEdit ? "Edit Category" : "Add New Category"}`}
            width="50%"
            closable={true}
            onClose={handleClose}
            visible={props.visible}
          >
            <CategoryForm
              handleClose={handleClose}
              isEdit={isEdit}
              edit={edit}
            />
          </Drawer>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CategoryCreate;
