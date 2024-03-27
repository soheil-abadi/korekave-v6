import React, { Fragment, useEffect, useState } from "react";
import { Input, Space, Table, ConfigProvider, Empty, Modal, Spin } from "antd";
import { SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import faIR from "antd/lib/locale/fa_IR";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import FurnaceDistributeEditModal from "./Modal/FurnaceDistributeEditModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FurnaceDistributeAddModal from "./Modal/FurnaceDistributeAddModal";
import { getUserList } from "../../services/authServices";

// -------------------
// import { ExclamationCircleFilled } from "@ant-design/icons";
// import { Button, Modal, Space } from "antd";
// const { confirm } = Modal;

//slices
import {
  selectUserManagmentEditModal,
  RsetUserManagmentEditModal,
  RsetUserManagmentCurrentUser,
  selectUserManagmentCurrentUser,
  selectuserManagmentAddmodal,
  RsetuserManagmentAddmodal,
  RsetUserManagmentList,
  selectUserManagmentList,
  selectuserManagmentDeleteModal,
  RsetuserManagmentDeleteModal,
} from "../../slices/userManagmentSlices";
import {
  RsetFurnaceDistributeAddmodal,
  RsetFurnaceDistributeCurrentUser,
  RsetFurnaceDistributeEditModal,
  fetchfurancepart,
  selectFurnaceDistributeAddmodal,
  selectFurnaceDistributeCurrentUser,
  selectFurnaceDistributeEditModal,
  selectFurnaceDistributeList,
  selectloading,
} from "../../slices/FurnaceDistribute";

const data = [
  {
    first_name: "shayan",
    last_name: "golestani",
    userName: "wolfi",
    user_access: [
      "ادمین سیستم",
      "مدیریت کارخانه ها",
      "مدیریت کوره ها",
      "مدیریت لیست بخش کوره ها",
      "مدیریت مدل های نسوز ها",
      "مدیریت ملزومات",
      "مدیریت رویدادهای کوره",
      "مدیریت ساخت کوره",
    ],
  },
  {
    first_name: "soheil",
    last_name: "abadi",
    userName: "soli",
    user_access: [
      // "ادمین سیستم",
      "مدیریت کارخانه ها",
      "مدیریت کوره ها",
      "مدیریت لیست بخش کوره ها",
      "مدیریت مدل های نسوز ها",
      // "مدیریت ملزومات",
      // "مدیریت رویدادهای کوره",
      "مدیریت ساخت کوره",
    ],
  },
  {
    first_name: "ali",
    last_name: "hoseini",
    userName: "ali2020",
    user_access: [
      // "ادمین سیستم",
      // "مدیریت کارخانه ها",
      // "مدیریت کوره ها",
      "مدیریت لیست بخش کوره ها",
      "مدیریت مدل های نسوز ها",
      // "مدیریت ملزومات",
      // "مدیریت رویدادهای کوره",
      "مدیریت ساخت کوره",
    ],
  },
];

const FurnaceDistribute = () => {
  const dataoffurance = useSelector(selectFurnaceDistributeList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchfurancepart());
  }, [dispatch]);
  //table state
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  //select
  const loading = useSelector(selectloading);
  const furnaceDistributeEditModal = useSelector(
    selectFurnaceDistributeEditModal
  );

  const FurnaceDistributeCurrentUser = useSelector(
    selectFurnaceDistributeCurrentUser
  );
  const FurnaceDistributeAddmodal = useSelector(
    selectFurnaceDistributeAddmodal
  );
  const UserManagmentList = useSelector(selectUserManagmentList);

  // ---------------------------------------------------------------

  // ---------------------------delete handle

  const handleAddUserModalOpen = () => {
    dispatch(RsetFurnaceDistributeAddmodal(true));
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="font10"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="sm"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            variant="success "
            className="font10"
            size="sm"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch(selectedKeys, confirm, "");
              close();
            }}
            style={{ width: 80 }}
          >
            حذف فیلتر
          </Button>
          <Button
            className="font10"
            variant="secondary"
            size="sm"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const columnValue = record[dataIndex] ? record[dataIndex].toString() : "";
      return columnValue.toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          const input = document.querySelector(
            ".ant-table-filter-dropdown input"
          );
          if (input) {
            input.focus();
          }
        }, 0);
      }
    },
    //this rendering is depending on data is array or not
    render: (text, record) => {
      const columnData = record[dataIndex];
      return Array.isArray(columnData) ? columnData.join(", ") : text;
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  //table column
  const columns = [
    {
      key: "name",
      title: "نام بخش",
      dataIndex: "name",
      sorter: (a, b) => {
        if (!a.name && !b.name) {
          return 0;
        }

        if (!a.name) {
          return 1;
        }

        if (!b.name) {
          return -1;
        }

        return a.name.localeCompare(b.name);
      },
      ...getColumnSearchProps("name", "جستجو..."),
      width: 50,
    },
    {
      key: "furnace_type",
      title: " نوع کوره	",
      dataIndex: "furnace_type",
      sorter: (a, b) => {
        if (!a.furnace_type && !b.furnace_type) {
          return 0;
        }

        if (!a.furnace_type) {
          return 1;
        }

        if (!b.furnace_type) {
          return -1;
        }

        return a.furnace_type.localeCompare(b.furnace_type);
      },
      ...getColumnSearchProps("furnace_type", "جستجو..."),
      width: 50,
    },

    {
      key: "operation",
      title: "عملیات",
      dataIndex: "operation",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 100,
    },
  ];

  //table custom pagination
  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => <span className="font12">مجموع: {total}</span>,
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };

  //table functions

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center gap-1 ms-2 flex-wrap">
        <Button
          title="ویرایش"
          className="btn btn-primary d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetFurnaceDistributeEditModal(true));
            dispatch(RsetFurnaceDistributeCurrentUser(request));
          }}
        >
          ويرايش
          <EditIcon />
        </Button>
      </div>
    );
  };

  return (
    <Container fluid className="py-4">
      <Fragment>
        <section className="position-relative">
          <div
            className="d-flex justify-content-between text-white py-3  borderRadius-top"
            style={{ background: "#485550" }}
          >
            <div className="ms-4 mt-1">
              <span className="me-2">
                <ListIcon />
              </span>
              لیست بخش کوره ها
            </div>
            <Button
              title="افزودن بخش جدید"
              size="sm"
              variant="success"
              className=" me-4 shadow rounded-circle py-2"
              onClick={handleAddUserModalOpen}
            >
              <AddCircleIcon />
            </Button>
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-between"></div>
            <div dir="rtl" className="position-relative">
              {!loading ? (
                <Fragment>
                  <ConfigProvider locale={faIR}>
                    <Table
                      locale={{
                        emptyText: <Empty description="اطلاعات موجود نیست!" />,
                      }}
                      className="list"
                      bordered
                      dataSource={dataoffurance}
                      columns={columns}
                      pagination={paginationConfig}
                      scroll={{ x: "max-content" }}
                      size="middle"
                    />
                  </ConfigProvider>
                </Fragment>
              ) : (
                <div
                  className="d-flex justify-content-center w-100"
                  style={{ marginTop: "200px" }}
                >
                  <Spin size="large" />;
                </div>
              )}
            </div>
          </div>
        </section>
        {furnaceDistributeEditModal && <FurnaceDistributeEditModal />}
        {FurnaceDistributeAddmodal && <FurnaceDistributeAddModal />}
      </Fragment>
    </Container>
  );
};

export default FurnaceDistribute;
