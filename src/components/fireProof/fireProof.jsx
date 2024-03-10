import React, { Fragment, useEffect, useState } from "react";
import {
  Input,
  Space,
  Table,
  ConfigProvider,
  Empty,
  Modal,
  Popconfirm,
  Spin,
} from "antd";
import {
  SearchOutlined,
  ExclamationCircleFilled,
  WarningOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import faIR from "antd/lib/locale/fa_IR";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import EditFireProofModal from "./modal/EditFireProofModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddFireProofModal from "./modal/AddFireProofModal";
import { deletefireproof, getfireprooflist } from "../../services/authServices";

//slices
import {
  RsetfireProofAddmodal,
  RsetfireProofCurrentUser,
  RsetfireProofEditModal,
  RsetfireProofList,
  deletefireprooflist,
  fetchfireprooflistList,
  selectfireProofAddmodal,
  selectfireProofCurrentUser,
  selectfireProofEditModal,
  selectfireProofList,
  selectloading,
} from "../../slices/fireProofSlices";

// delete conformation
const { confirm } = Modal;

const FireProof = () => {
  // ----------------------------------
  const dispatch = useDispatch();
  //table state
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  ////////////////select
  const loading = useSelector(selectloading);
  const fireProofEditModal = useSelector(selectfireProofEditModal);
  const fireProofCurrentUser = useSelector(selectfireProofCurrentUser);
  const fireProofAddmodal = useSelector(selectfireProofAddmodal);
  const fireprooflistuser = useSelector(selectfireProofList);

  const handleAddUserModalOpen = () => {
    dispatch(RsetfireProofAddmodal(true));
  };
  // ---------------------------userfireprooflist fetching
  useEffect(() => {
    dispatch(fetchfireprooflistList());
  }, [dispatch]);

  // ------------------------------------------------------

  //table search
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
      key: "category",
      title: "دسته بندي",
      dataIndex: "category",
      sorter: (a, b) => {
        if (!a.category && !b.category) {
          return 0;
        }

        if (!a.category) {
          return 1;
        }

        if (!b.category) {
          return -1;
        }

        return a.category.localeCompare(b.category);
      },
      ...getColumnSearchProps("category", "جستجو..."),
      width: 50,
    },
    {
      key: "shape_code",
      title: "كد مدل",
      dataIndex: "shape_code",
      sorter: (a, b) => {
        if (!a.shape_code && !b.shape_code) {
          return 0;
        }

        if (!a.shape_code) {
          return 1;
        }

        if (!b.shape_code) {
          return -1;
        }

        return a.shape_code.localeCompare(b.shape_code);
      },
      ...getColumnSearchProps("shape_code", "جستجو..."),
      width: 200,
    },
    {
      key: "type_name",
      title: "نوع",
      dataIndex: "type_name",
      sorter: (a, b) => {
        if (!a.type_name && !b.type_name) {
          return 0;
        }

        if (!a.type_name) {
          return 1;
        }

        if (!b.type_name) {
          return -1;
        }

        return a.type_name.localeCompare(b.type_name);
      },
      ...getColumnSearchProps("type_name", "جستجو..."),

      width: 50,
    },
    {
      key: "weight",
      title: "وزن",
      dataIndex: "weight",
      sorter: (a, b) => {
        if (!a.weight && !b.weight) {
          return 0;
        }

        if (!a.weight) {
          return 1;
        }

        if (!b.weight) {
          return -1;
        }

        return a.weight.localeCompare(b.weight);
      },
      ...getColumnSearchProps("weight", "جستجو..."),
      render: (text) => (text == "NULL" ? " " : text),

      width: 100,
    },
    {
      key: "wightperkg",
      title: "وزن بر كيلوگرم",
      dataIndex: "wightperkg",
      sorter: (a, b) => {
        if (!a.wightperkg && !b.wightperkg) {
          return 0;
        }

        if (!a.wightperkg) {
          return 1;
        }

        if (!b.wightperkg) {
          return -1;
        }

        return a.wightperkg.localeCompare(b.wightperkg);
      },
      ...getColumnSearchProps("wightperkg", "جستجو..."),
      width: 50,
    },
    {
      key: "a_size",
      title: "a يا  (x)",
      dataIndex: "a_size",
      sorter: (a, b) => a.a_size - b.a_size, // Sorts numbers from lower to higher

      ...getColumnSearchProps("a_size", "جستجو..."),
      render: (text) => (text == "NULL" ? " " : text),

      width: 50,
    },
    {
      key: "b_size",
      title: " b",
      dataIndex: "b_size",
      sorter: (a, b) => a.b_size - b.b_size, // Sorts numbers from lower to higher
      ...getColumnSearchProps("b", "جستجو..."),
      render: (text) => (text == "NULL" ? " " : text),

      width: 50,
    },
    {
      key: "l_size",
      title: " I",
      dataIndex: "l_size",
      sorter: (a, b) => a.l_size - b.l_size, // Sorts numbers from lower to higher
      ...getColumnSearchProps("l_size", "جستجو..."),
      render: (text) => (text == "NULL" ? " " : text),

      width: 100,
    },
    {
      key: "h_size",
      title: " h",
      dataIndex: "h_size",
      sorter: (a, b) => a.h_size - b.h_size, // Sorts numbers from lower to higher
      ...getColumnSearchProps("b", "جستجو..."),
      render: (text) => (text == "NULL" ? " " : text),

      width: 50,
    },

    // {
    //   key: "devices",
    //   title: "تعداد وسیله نقلیه",
    //   dataIndex: "devices",
    //   sorter: (a, b) => {
    //     if (!a.driverName && !b.driverName) {
    //       return 0;
    //     }

    //     if (!a.driverName) {
    //       return 1;
    //     }

    //     if (!b.driverName) {
    //       return -1;
    //     }

    //     return a.devices?.length.localeCompare(b.devices?.length);
    //   },
    //   render: (devices) => devices?.length,
    //   ...getColumnSearchProps("devices", "جستجو..."),
    //   width: 200,
    // },
    {
      key: "operation",
      title: "عملیات",
      dataIndex: "operation",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 200,
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
  //table functions
  // --------------------------handeling delete
  const handleDelete = async (value) => {
    dispatch(deletefireprooflist(value));
  };

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center gap-1 ms-2 flex-wrap">
        <Button
          title="ویرایش"
          className="btn btn-primary d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetfireProofCurrentUser(request));
            dispatch(RsetfireProofEditModal(true));
          }}
        >
          ويرايش
          <EditIcon />
        </Button>
        <Popconfirm
          title="آيا از حذف اين سطر مطمئن هستيد"
          className="btn btn-danger d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          okText={<span>تایید</span>} // Change the color of "تایید"
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
                <ListIcon className="mx-2" />
                مدل و ابعاد نسوز ها
              </span>
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
                      dataSource={fireprooflistuser}
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
        {fireProofEditModal && <EditFireProofModal />}
        {fireProofAddmodal && <AddFireProofModal />}
      </Fragment>
    </Container>
  );
};

export default FireProof;
