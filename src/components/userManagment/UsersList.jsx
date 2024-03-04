import React, { Fragment, useEffect, useState } from "react";
import { Input, Space, Table, ConfigProvider, Empty, Modal } from "antd";
import { SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import faIR from "antd/lib/locale/fa_IR";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import UserManagementEditModal from "./modal/UserManagementEditModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddModal from "./modal/addUsermodal";
import { getUserList } from "../../services/authServices";
import { deleteUser } from "../../services/authServices";

// -------------------
// import { ExclamationCircleFilled } from "@ant-design/icons";
// import { Button, Modal, Space } from "antd";
// const { confirm } = Modal;

//slices
import { selectLoading, RsetLoading } from "../../slices/mainSlices";
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
  fetchUserList,
  deleteuserlist,
} from "../../slices/userManagmentSlices";
import { Popconfirm } from "antd/lib";

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

const UsersList = () => {
  const dispatch = useDispatch();
  //table state
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  //select
  const loading = useSelector(selectLoading);
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);

  const userManagmentAddmodal = useSelector(selectuserManagmentAddmodal);
  const UserManagmentList = useSelector(selectUserManagmentList);
  console.log(UserManagmentList);

  // console.log(userManagmentDeleteModal, userManagmentEditModal);

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
    dispatch(RsetuserManagmentAddmodal(true));
  };

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

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
      key: "first_name",
      title: "نام",
      dataIndex: "first_name",
      sorter: (a, b) => {
        if (!a.first_name && !b.first_name) {
          return 0;
        }

        if (!a.first_name) {
          return 1;
        }

        if (!b.first_name) {
          return -1;
        }

        return a.first_name.localeCompare(b.first_name);
      },
      ...getColumnSearchProps("first_name", "جستجو..."),
      width: 50,
    },
    {
      key: "last_name",
      title: "نام خانوادگی",
      dataIndex: "last_name",
      sorter: (a, b) => {
        if (!a.last_name && !b.last_name) {
          return 0;
        }

        if (!a.last_name) {
          return 1;
        }

        if (!b.last_name) {
          return -1;
        }

        return a.last_name.localeCompare(b.last_name);
      },
      ...getColumnSearchProps("last_name", "جستجو..."),
      width: 50,
    },
    {
      key: "user_access",
      title: "دسترسي ها ",
      dataIndex: "user_access",
      sorter: (a, b) => {
        if (!a.user_access && !b.user_access) {
          return 0;
        }

        if (!a.user_access) {
          return 1;
        }

        if (!b.user_access) {
          return -1;
        }

        return a.user_access.localeCompare(b.user_access);
      },
      ...getColumnSearchProps("user_access", "جستجو..."),
      render: (_, record) => <span>{handleaccess(record)}</span>,
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

  // ---------------------handle delete
  const handleDelete = (value) => {
    dispatch(deleteuserlist(value));
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
            dispatch(RsetUserManagmentEditModal(true));
            dispatch(RsetUserManagmentCurrentUser(request));
          }}
        >
          ويرايش
          <EditIcon />
        </Button>
        <Popconfirm
          title="آيا از حذف اين سطر مطمعن هستيد"
          className="btn btn-danger d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          okText={<span>تایید</span>}
          cancelText={<span>انصراف</span>}
          active
          onConfirm={() => handleDelete(request._id)}
        >
          <span>حذف</span>
          <DeleteForeverIcon />
        </Popconfirm>
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
              مدیریت کاریران{" "}
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
                      dataSource={UserManagmentList}
                      columns={columns}
                      pagination={paginationConfig}
                      scroll={{ x: "max-content" }}
                      size="middle"
                    />
                  </ConfigProvider>
                </Fragment>
              ) : (
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: "200px" }}
                >
                  {/* <Loading height={"60px"} width={"60px"} /> */}
                </div>
              )}
            </div>
          </div>
        </section>
        {userManagmentEditModal && <UserManagementEditModal />}
        {userManagmentAddmodal && <AddModal />}
      </Fragment>
    </Container>
  );
};

export default UsersList;
