import React, { Fragment, useEffect, useState } from "react";
import {
  Input,
  Space,
  Table,
  ConfigProvider,
  Empty,
  Popconfirm,
  Spin,
} from "antd";
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
import { getessentialgoods } from "../../services/authServices";
// -------------------------slices
import {
  RsetessentialGoodsAddmodal,
  RsetessentialGoodsCurrentUser,
  RsetessentialGoodsEditModal,
  RsetessentialGoodsList,
  deleteessentialgood,
  fetchessentialgoodlist,
  selectessentialGoodsAddmodal,
  selectessentialGoodsCurrentUser,
  selectessentialGoodsEditModal,
  selectessentialGoodsList,
  selectloading,
} from "../../slices/essentialGoodsSlices";
const data = [
  {
    category: "آجر",
    manufacturing_country: "ايران	",

    type_name: "مگنسايت",

    manufacturer: "آمل کربوراندوم",

    userName: "wolfi",
  },
  {
    category: "سنگ",
    manufacturing_country: "ايتاليا",
    type_name: "مگنسايت",
    manufacturer: "ديرگداز ايران ",

    userName: "wolfi",
  },
  {
    category: "آجر",
    countryoforigin: "ايران	",
    type_name: "مگنسايت",
    manufacturer: "رفل",

    userName: "wolfi",
  },
];

const EssentialGoods = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  //select
  const loading = useSelector(selectloading);
  const essentialGoodsEditModal = useSelector(selectessentialGoodsEditModal);
  const essentialGoodsCurrentUser = useSelector(
    selectessentialGoodsCurrentUser
  );
  const essentialGoodsList = useSelector(selectessentialGoodsList);

  const essentialGoodsAddmodal = useSelector(selectessentialGoodsAddmodal);
  const handleAddUserModalOpen = () => {
    dispatch(RsetessentialGoodsAddmodal(true));
  };

  // ---------------------fetching data
  useEffect(() => {
    dispatch(fetchessentialgoodlist());
  }, [dispatch]);
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
      filters: [
        { text: "نسوز - ملات", value: "نسوز - ملات" },
        { text: "نسوز - آجر", value: "نسوز - آجر" },
        { text: "نسوز - فیبر", value: "نسوز - فیبر" },
      ],

      onFilter: (value, record) => record.category === value,

      width: 100,
    },
    {
      key: "type_name",
      title: "نوع (متریال)",
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
      width: 100,
    },
    {
      key: "manufacturing_country",
      title: "كشور سازنده",
      dataIndex: "manufacturing_country",
      sorter: (a, b) => {
        if (!a.manufacturing_country && !b.manufacturing_country) {
          return 0;
        }
        if (!a.manufacturing_country) {
          return 1;
        }
        if (!b.manufacturing_country) {
          return -1;
        }
        return a.manufacturing_country.localeCompare(b.manufacturing_country);
      },
      ...getColumnSearchProps("manufacturing_country", "جستجو..."),
      width: 100,
    },

    {
      key: "manufacturer",
      title: "شركت سازنده",
      dataIndex: "manufacturer",
      sorter: (a, b) => {
        if (!a.manufacturer && !b.manufacturer) {
          return 0;
        }
        if (!a.manufacturer) {
          return 1;
        }
        if (!b.manufacturer) {
          return -1;
        }
        return a.manufacturer.localeCompare(b.manufacturer);
      },
      ...getColumnSearchProps("manufacturer", "جستجو..."),
      width: 100,
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
    showTotal: (total) => <span className="font12">مجموع : {total}</span>,
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
          onConfirm={() => dispatch(deleteessentialgood(request._id))}
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
                لیست ملزومات
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
                      dataSource={essentialGoodsList}
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
        {essentialGoodsAddmodal && <EssentialGoodsAddModal />}
        {essentialGoodsEditModal && <EssentialGoodsEditModal />}
      </Fragment>
    </Container>
  );
};

export default EssentialGoods;
