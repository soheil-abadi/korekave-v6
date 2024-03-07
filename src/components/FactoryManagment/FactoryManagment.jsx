import React, { Fragment, useEffect, useState } from "react";
import { Input, Space, Table, ConfigProvider, Empty, Modal } from "antd";
import { SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import faIR from "antd/lib/locale/fa_IR";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import FactoryManagmentEditModal from "./modal/FactoryManagmentEditModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FactoryManagmentAddModal from "./modal/FactoryManagmentAddModal";
import { getUserList } from "../../services/authServices";
import { deleteUser } from "../../services/authServices";
import { Spin } from "antd";

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
import { Popconfirm } from "antd/lib";
import {
  RsetFactoryManagmentAddmodal,
  RsetFactoryManagmentCurrentUser,
  RsetFactoryManagmentEditModal,
  RsetFactoryManagmentList,
  fetchdata,
  getFactoryManagmentDatas,
  selectFactoryManagmentAddmodal,
  selectFactoryManagmentEditModal,
  selectFactoryManagmentList,
  selectloading,
} from "../../slices/FactoryManagment";

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

const FactoryManagment = () => {
  const dispatch = useDispatch();
  //table state
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  //select
  const loading = useSelector(selectloading);
  const factoryManagmentEditModal = useSelector(
    selectFactoryManagmentEditModal
  );
  const userManagmentDeleteModal = useSelector(selectuserManagmentDeleteModal);
  const userManagmentCurrentUser = useSelector(selectUserManagmentCurrentUser);
  const factoryManagmentAddmodal = useSelector(selectFactoryManagmentAddmodal);
  const UserManagmentList = useSelector(selectUserManagmentList);

  // ---------------------------------------------------------------

  // ---------------------------delete handle

  const handleaccess = (record) => {
    return (
      <div>
        {record.user_access.map((permission, index) => (
          <span key={index}>{permission.name},</span>
        ))}
      </div>
    );
  };

  const handleAddUserModalOpen = () => {
    dispatch(RsetFactoryManagmentAddmodal(true));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userlistdata = await getUserList();
        dispatch(RsetUserManagmentList(userlistdata.data));
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchData();
  }, []);

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
      title: "نام",
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
      key: "factory_type",
      title: "نوع ",
      dataIndex: "factory_type",
      sorter: (a, b) => {
        if (!a.factory_type && !b.factory_type) {
          return 0;
        }

        if (!a.factory_type) {
          return 1;
        }

        if (!b.factory_type) {
          return -1;
        }

        return a.factory_type.localeCompare(b.factory_type);
      },
      ...getColumnSearchProps("last_name", "جستجو..."),
      width: 50,
    },
    {
      key: "foundation_year",
      title: "سال تاسیس ",
      dataIndex: "foundation_year",
      sorter: (a, b) => {
        if (!a.foundation_year && !b.foundation_year) {
          return 0;
        }

        if (!a.foundation_year) {
          return 1;
        }

        if (!b.foundation_year) {
          return -1;
        }

        return a.foundation_year.localeCompare(b.foundation_year);
      },
      ...getColumnSearchProps("foundation_year", "جستجو..."),
      width: 50,
    },
    {
      key: "address",
      title: "آدرس",
      dataIndex: "address",
      sorter: (a, b) => {
        if (!a.address && !b.address) {
          return 0;
        }

        if (!a.address) {
          return 1;
        }

        if (!b.address) {
          return -1;
        }

        return a.address.localeCompare(b.address);
      },
      ...getColumnSearchProps("address", "جستجو..."),
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
    showTotal: (total) => (
      <span className="font12">مجموع وسیله ها: {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };
  const factorymanagmentData = useSelector(selectFactoryManagmentList);

  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);

  // ---------------------handle delete

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
            dispatch(RsetFactoryManagmentEditModal(true));
            dispatch(RsetFactoryManagmentCurrentUser(request));
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
              مديريت كارخانه ها
            </div>
            <Button
              title="افزودن کاربر جدید"
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
                      dataSource={factorymanagmentData}
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
                  <Spin />;
                </div>
              )}
            </div>
          </div>
        </section>
        {factoryManagmentEditModal && <FactoryManagmentEditModal />}
        {factoryManagmentAddmodal && <FactoryManagmentAddModal />}
      </Fragment>
    </Container>
  );
};

export default FactoryManagment;
