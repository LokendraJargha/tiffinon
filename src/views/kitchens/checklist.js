import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CCard, CCol, CRow } from "@coreui/react";
import { Drawer, Switch, Descriptions } from "antd";

import ImageDisplay from "./imageDisplay";

import http from "../../config";

import { setInitGrid } from "src/redux/actions";

const Checklist = (props) => {
  const { data, visible, handleClose } = props;
  const { _id, is_verified, is_active } = data;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [verified, setVerified] = useState(is_verified);
  const [active, setActive] = useState(is_active);

  useEffect(() => {
    getUploads();
  }, []);

  const getUploads = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/check-lists/${_id}`);
      setUploads(res.data.checklists);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onClose = () => handleClose();

  const handleSwitch = async (change) => {
    try {
      setLoading(true);
      const value =
        change === "verified"
          ? { is_verified: verified }
          : { is_active: active };
      const res = await http.post(`kitchens/verifications/${_id}`, value);
      const { is_active, is_verified } = res.data.kitchen;
      setActive(is_active);
      setVerified(is_verified);
      dispatch(setInitGrid(true));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <CRow>
      <CCol xl={12} md={12}>
        <CCard>
          <Drawer
            title={`Kitchen Checklist`}
            width="50%"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <ImageDisplay uploads={uploads} loading={loading} column={2} />

            <div>
              <h6>Verifications</h6>
              <Descriptions title="" size="small" bordered>
                <Descriptions.Item label="Verified" span={3}>
                  <Switch
                    checked={verified}
                    onChange={() => handleSwitch("verified")}
                    size="small"
                    loading={loading}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Active" span={3}>
                  <Switch
                    checked={active}
                    onChange={() => handleSwitch("active")}
                    size="small"
                    loading={loading}
                  />
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Drawer>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Checklist;
