import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Switch,
  Tooltip,
  Dropdown,
  Menu,
  Modal,
  Tag,
} from "antd";
import { CCardBody, CCardHeader } from "@coreui/react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { DownOutlined, SettingOutlined, MoreOutlined } from "@ant-design/icons";

import {
  setInitGrid,
  setSelectedGridIds,
  setGridData,
} from "../../redux/actions";

import http from "../../config";
import styles from "./index.module.css";
import {
  EditableRow,
  EditableCell,
} from "../../components/commons/edit-table-column/row";

const Grid = (props) => {
  const { initGrid, selectedGridIds } = props;
  const { columns, acolumns } = props;

  const ids =
    selectedGridIds && selectedGridIds[acolumns.reduxKey]
      ? selectedGridIds[acolumns.reduxKey]
      : [];
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState(ids);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    search: "",
    sortField: null,
    sortOrder: null,
    total: null,
  });
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (initGrid) {
      fetch(pagination);
    }
  }, [initGrid]);

  useEffect(() => {
    if (!init) {
      fetch(pagination);
    }
  }, []);

  if (acolumns.statusColumn) {
    const { statusColumn } = acolumns;
    for (let prop in statusColumn) {
      let item = statusColumn[prop];
      if (item.show) {
        let index = columns.findIndex((item) => item.title === "created_at");
        let status = {
          title: item.column,
          key: item.column,
          order: item.order,
          sorter: item.sorter,
          render: (row) => handleSwitchRow(row, item),
        };
        columns.splice(index, 0, status);
      }
    }
  }

  const handleSwitchRow = (row, item) => {
    return (
      <div className="status-wrapper">
        <Tooltip
          title={
            row[item.dataIndex] === 1 ? `${item.column}` : `Not ${item.column}`
          }
        >
          <Switch
            size="small"
            defaultChecked={row[item.dataIndex] === 1}
            onChange={(e) =>
              item.primaryIndex
                ? handleChangeStatus(e, row)
                : props[item.callFunction](e, row)
            }
          />
        </Tooltip>
      </div>
    );
  };
  if (acolumns.pivotRelation && acolumns.pivotRelation.items.length > 0) {
    const { items } = acolumns.pivotRelation;
    for (let i = 0; i < items.length; i++) {
      if (items[i]["show"]) {
        let index = columns.findIndex((item) => item.title === "created_at");
        let status = {
          title: items[i]["column"],
          key: items[i]["column"],
          order: items[i]["order"],
          render: (row) => handelePivotRelation(row, items[i]),
        };
        columns.splice(index, 0, status);
      }
    }
  }
  const actions = (row) => {
    const { actions } = acolumns;
    const Menus = (
      <>
        {Object.values(actions).map((item, key) => {
          let menu;
          if (item.type === "popup") {
            menu = (
              <a
                href="#"
                onClick={(e) =>
                  item.name === "Delete"
                    ? handleDelete(e, row)
                    : props[item.callFunction](e, row)
                }
              >
                {item.name}
              </a>
            );
          } else {
            menu = (
              <Tooltip title={item.name}>
                <Link to={`/${props.acolumns.apiurl}/${row._id}`}>
                  {item.name}
                </Link>
              </Tooltip>
            );
          }
          return item.show && <Menu.Item key={key}>{menu}</Menu.Item>;
        })}
      </>
    );
    return <Menu>{Menus}</Menu>;
  };

  if (acolumns.actions.show) {
    let action = {
      title: "Actions",
      key: "operation",
      width: 90,
      order: 10000, //by default should in last row
      render: (row) => (
        <div className="action-wrapper">
          <Dropdown overlay={actions(row)} placement="bottomRight">
            <Button
              shape="circle"
              className={styles["action-settings"]}
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </div>
      ),
    };
    columns.push(action);
  }
  //prevent duplicate cols
  let obj = {},
    cols = [];
  for (let i = 0; i < columns.length; i++) {
    obj[columns[i].title] = columns[i];
  }
  for (let prop in obj) {
    cols.push(obj[prop]);
  }

  cols.sort(function (a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });

  const handelePivotRelation = (row, item) => {
    let { relationName, dType, relationColName } = item;
    let d,
      array = [];
    let rel = relationName.split(".");
    let arel = row;
    for (let p in rel) {
      if (Array.isArray(arel)) {
        for (let c in arel) {
          array.push(arel[c][rel[p]]);
        }
      } else {
        arel = arel[rel[p]];
      }
    }

    const r = arel;
    /*
     * this is logic when content relationColName is multiple like
     * original_name or name or something else eg:{relationColName='original_name|name'}
     */

    const relcolName = relationColName.split("|");
    if (relcolName.length && r) {
      const cols = Object.keys(r);
      for (let col in relcolName) {
        if (cols.indexOf(relcolName[col]) > -1) {
          relationColName = relcolName[col];
        }
      }
    }

    if (dType === "obj") {
      const obj =
        r && r[relationColName]
          ? r[relationColName].length > 20
            ? `${r[relationColName].substring(0, 20)} ...`
            : r[relationColName]
          : "";
      d = (
        <div
          className="pivot-relation"
          style={{ width: "90%", overflow: "auto" }}
        >
          <div className="table-col">{obj}</div>
        </div>
      );
    } else if (dType === "array") {
      d = (
        <div className="pivot-relation">
          {r.map((item, index) => {
            return (
              <Tag color="cyan" key={index}>
                {item[relationColName]}
              </Tag>
            );
          })}
        </div>
      );
    }
    return d;
  };

  const handleTableChange = (pag, filters, sorter) => {
    let params = {
      ...pagination,
      sortField: sorter.field,
      sortOrder: sorter.order == "ascend" ? "asc" : "desc",
      current: pag.current,
      pageSize: pag.pageSize,
      total: pag.total,
    };
    //params = Object.assign({},pagination,params);
    setPagination(params);
    fetch(params);
  };

  const fetch = async (params) => {
    try {
      setLoading(true);
      setInit(true);
      let url = `/${acolumns.apiurl}?page=${params.current}`;
      let d = await http(url, { params: params });
      let dT = d.data.data;
      dT.forEach((item) => {
        item.created_at = dateFormat(item.created_at);
        item.updated_at = dateFormat(item.updated_at);
      });
      setData(dT);
      if (acolumns.reduxKey)
        props.setGridData({ [acolumns["reduxKey"]]: d.data.data });

      setLoading(false);
      setInit(false);
      console.log(d.data.count);
      setPagination({
        ...params,
        pageSize: d.data.pageSize,
        total: d.data.count,
      });

      props.setInitGrid(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const dateFormat = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(date));
  };

  const handleMultipleCheck = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    props.setSelectedGridIds(selectedRowKeys);
    // props.setSelectedGridIds({
    //   [acolumns["reduxKey"]]: selectedRowKeys,
    // });
  };

  const handleChangeStatus = async (e, row) => {
    try {
      await http.put(`/${acolumns.apiurl}/status/${row.id}`, {
        status: e,
        id: row.id,
      });
      fetch(pagination);
    } catch (err) {}
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleMultipleCheck,
  };

  const type =
    acolumns.selection && acolumns.selection.type
      ? acolumns.selection.type
      : "checkbox";
  let selectionRow = {
    type: type,
    ...rowSelection,
  };
  const isHideRowSelection = acolumns.selection && !acolumns.selection.show;
  if (isHideRowSelection) {
    selectionRow = null;
  }

  const handleDelete = (e, item) => {
    e.preventDefault();
    let items = item === "null" ? selectedRowKeys : [item._id];
    if (items.length <= 0) {
      Modal.error({
        title: `Items are not selected yet.`,
        content: `You need to confirm, atleast one item is selected.`,
        okText: "Cancel",
        okType: "info",
      });
      return 0;
    }
    Modal.confirm({
      title: `Want to delet ${items.length} ${
        items.length === 1 ? "item" : "items"
      }?`,
      content: `No longer selected items are store in database.`,
      cancelText: "Cancel",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        confirmDelete(items);
      },
    });
  };
  const confirmDelete = async (items) => {
    try {
      setLoading(true);
      let ids = items;
      await http.delete(`/${props.acolumns.apiurl}`, {
        data: { ids },
      });
      fetch(pagination);
      setSelectedRowKeys([]);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    const params = { ...pagination, search: e.value };
    setPagination(params);
    fetch(params);
  };

  const handleSave = async (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
    try {
      let r = await http.put(`/${acolumns.apiurl}/${row._id}`, row);
      props.setInitGrid(true);
    } catch (err) {}
  };

  let { settings } = props.acolumns;
  const menu = (
    <Menu>
      {Object.values(settings).map((item, index) => {
        if (typeof item === "object") {
          let mnu;
          if (item.type === "popup") {
            mnu = (
              <a
                href="#"
                onClick={(e) =>
                  item.value === "delete"
                    ? handleDelete(e, "null")
                    : props[item.callFunction](e)
                }
              >
                {item.name}
              </a>
            );
          } else {
            mnu = <Link to={`/${item.url}`}>{item.name}</Link>;
          }
          return item.show && <Menu.Item key={index}>{mnu}</Menu.Item>;
        }
      })}
    </Menu>
  );

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  cols = cols.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable.toString(),
        dataindex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <>
      <CCardHeader className={styles["card-header-wrapper"]}>
        <div className="card-title">
          {props.acolumns.title} | {data.length} of total: {pagination.total}{" "}
          items are listed
          {selectedRowKeys.length > 0 && (
            <span
              style={{
                background: "#1890ff",
                padding: "5px 10px",
                color: "#fff",
              }}
            >{`${selectedRowKeys.length} items are checked`}</span>
          )}
        </div>
        <div className="card-search-input">
          <DebounceInput
            minLength={0}
            debounceTimeout={400}
            onChange={(e) => handleFilter({ value: e.target.value })}
            placeholder="Search..."
            className={styles["debounce-input"]}
          />
        </div>
        <div className="card-header-actions">
          {acolumns.settings.show && (
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="primary" className={styles["action-settings"]}>
                <SettingOutlined /> Settings <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
      </CCardHeader>
      <CCardBody>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          className="table-wrapper"
          columns={cols}
          rowSelection={selectionRow}
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          fixed={false}
          size="small"
          scroll={{ y: 460 }}
        />
      </CCardBody>
    </>
  );
};
const mapStateToProps = (state) => ({
  initGrid: state.grid.init,
  selectedGridIds: state.grid.selectedGridIds,
});

export default connect(mapStateToProps, {
  setInitGrid,
  setSelectedGridIds,
  setGridData,
})(Grid);
