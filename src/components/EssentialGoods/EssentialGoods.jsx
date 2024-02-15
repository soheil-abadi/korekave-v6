import React, { Fragment, useEffect, useState } from "react";
import { Input, Space, Table, ConfigProvider, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import faIR from "antd/lib/locale/fa_IR";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListIcon from "@mui/icons-material/List";
import EssentialGoodsEditModal from "./modal/EssentialGoodsEditmodal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EssentialGoodsAddModal from "./modal/EssentialGoodsAddModal";
// -------------------------slices
import { selectLoading, RsetLoading } from "../../slices/mainSlices";
import {
  RsetessentialGoodsAddmodal,
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  selectessentialGoodsAddmodal,
  selectessentialGoodsCurrentUser,
  selectessentialGoodsEditModal,
} from "../../slices/essentialGoodsSlices";
const data = [
  {
    sort: "آجر",
    modelcode: "golestani",
    type: "منتظم",
    Weight: "0kg",
    wightperkg: "وزن در واحد كيوگرم",
    a: "aيا  (x)",
    b: 230.0,
    I: 230.0,
    h: 76.0,
    userName: "wolfi",
  },
  {
    sort: "سنگ",
    modelcode: "golestani",
    type: "منتظم",
    Weight: "0kg",
    wightperkg: "وزن در واحد كيوگرم",
    a: "aيا  (x)",
    b: 231.0,
    I: 230.0,
    h: 76.0,
    userName: "wolfi",
  },
  {
    sort: "آجر",
    modelcode: "golestani",
    type: "منتظم",
    Weight: "0kg",
    wightperkg: "وزن در واحد كيوگرم",
    a: "a يا  (x)",
    b: 230.0,
    I: 230.0,
    h: 25.0,
    userName: "wolfi",
  },
];

const EssentialGoods = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  //select
  const loading = useSelector(selectLoading);
  const essentialGoodsEditModal = useSelector(selectessentialGoodsEditModal);
  const essentialGoodsCurrentUser = useSelector(
    selectessentialGoodsCurrentUser
  );
  const essentialGoodsAddmodal = useSelector(selectessentialGoodsAddmodal);
  const handleAddUserModalOpen = () => {
    dispatch(RsetessentialGoodsAddmodal(true));
  };
  // --------------------------tabale search
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
      key: "sort",
      title: "دسته بندي",
      dataIndex: "sort",
      sorter: (a, b) => {
        if (!a.sort && !b.sort) {
          return 0;
        }
        if (!a.sort) {
          return 1;
        }
        if (!b.sort) {
          return -1;
        }
        return a.sort.localeCompare(b.sort);
      },
      ...getColumnSearchProps("sort", "جستجو..."),
      width: 50,
    },
    {
      key: "modelcode",
      title: "كد مدل",
      dataIndex: "modelcode",
      sorter: (a, b) => {
        if (!a.modelcode && !b.modelcode) {
          return 0;
        }
        if (!a.modelcode) {
          return 1;
        }
        if (!b.modelcode) {
          return -1;
        }
        return a.modelcode.localeCompare(b.modelcode);
      },
      ...getColumnSearchProps("modelcode", "جستجو..."),
      width: 200,
    },
    {
      key: "type",
      title: "نوع",
      dataIndex: "type",
      sorter: (a, b) => {
        if (!a.type && !b.type) {
          return 0;
        }
        if (!a.type) {
          return 1;
        }
        if (!b.type) {
          return -1;
        }
        return a.type.localeCompare(b.type);
      },
      ...getColumnSearchProps("type", "جستجو..."),
      width: 50,
    },
    {
      key: "Weight",
      title: "وزن",
      dataIndex: "Weight",
      sorter: (a, b) => {
        if (!a.Weight && !b.Weight) {
          return 0;
        }
        if (!a.Weight) {
          return 1;
        }
        if (!b.Weight) {
          return -1;
        }
        return a.Weight.localeCompare(b.Weight);
      },
      ...getColumnSearchProps("Weight", "جستجو..."),
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
      key: "a",
      title: "a يا  (x)",
      dataIndex: "a",
      sorter: (a, b) => a.a - b.a, // Sorts numbers from lower to higher
      ...getColumnSearchProps("a", "جستجو..."),
      width: 50,
    },
    {
      key: "b",
      title: " b",
      dataIndex: "b",
      sorter: (a, b) => a.b - b.b, // Sorts numbers from lower to higher
      ...getColumnSearchProps("b", "جستجو..."),
      width: 50,
    },
    {
      key: "I",
      title: " I",
      dataIndex: "I",
      sorter: (a, b) => a.I - b.I, // Sorts numbers from lower to higher
      ...getColumnSearchProps("b", "جستجو..."),
      width: 200,
    },
    {
      key: "h",
      title: " h",
      dataIndex: "h",
      sorter: (a, b) => a.h - b.h, // Sorts numbers from lower to higher
      ...getColumnSearchProps("b", "جستجو..."),
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
            dispatch(RsetessentialGoodsEditModal(true));
            dispatch(RsetessentialGoodsCurrentUser(request));
          }}
        >
          <EditIcon />
        </Button>
        <Button
          title="حذف"
          className="btn btn-danger d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          active
          onClick={() => {}}
        >
          <DeleteForeverIcon />
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
                  <ConfigProvider
                    locale={faIR}
                    // theme={{
                    //   token: {
                    //     // Seed Token
                    //     // colorPrimary: "#00b96b",
                    //     // Alias Token
                    //     colorBgContainer: `${!darkMode ? "#303030" : "#fff"}`,
                    //     colorText: "white",
                    //     colorTextPlaceholder: `${
                    //       !darkMode ? "white" : "black"
                    //     }`,
                    //     // borderColor: "#000",
                    //   },
                    //   components: {
                    //     Table: {
                    //       colorBgContainer: ` ${
                    //         !darkMode ? "#222a38" : "#e3e3e3"
                    //       }`,
                    //       borderColor: "#000",
                    //       rowHoverBg: `${!darkMode ? "black" : "#ccc"}`,
                    //       colorText: `${!darkMode ? "white" : "black"}`,
                    //       headerBg: `${!darkMode ? "#1c283d" : "gray"}`,
                    //       headerSortHoverBg: `${
                    //         !darkMode ? "#000" : "#888a89"
                    //       }`,
                    //       headerSortActiveBg: `${
                    //         !darkMode ? "#000" : "#888a89"
                    //       }`,
                    //       // headerFilterHoverIcon: "#fff",
                    //       // headerFilterIcon: "#fff",
                    //     },
                    //   },
                    // }}
                  >
                    <Table
                      locale={{
                        emptyText: <Empty description="اطلاعات موجود نیست!" />,
                      }}
                      className="list"
                      bordered
                      dataSource={data}
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
        {EssentialGoodsAddModal && <EssentialGoodsAddModal />}
        {EssentialGoodsEditModal && <EssentialGoodsEditModal />}
      </Fragment>
    </Container>
  );
};

export default EssentialGoods;
