import React from "react";
import logo from "../img/logo/kave-logo.png";

const card = [
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
  {
    header: "کارخانه بلور کاوه",
    number: "5",
    logo: logo,
    year: 1350,
    type: "بلور",
    location: "تهران میدان انقلاب نرسیده ب آزادی",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-header d-flex justify-content-between align-items-center p-3">
        <h3>صفحه اصلی </h3>
        <button className="btn btn-primary  m-2">خروج</button>
      </div>

      <div className="parent-card d-flex justify-content-sm-center    justify-content-md-center align-items-center gap-5 flex-wrap  border-top p-2 pt-5 mb-5 w-100  ">
        {card.map((item, index) => (
          <div
            key={index}
            className="cards col-sm-4 col-md-3  p-3 baxshadow  p-5 .borderRadius-15    "
          >
            <img src={logo} alt="logo" className=" d-block img-fluid m-auto " />
            <h4 className="my-3"> {item.header}</h4>
            <p>
              سال تاسیس: <span className="fw-bold fs-6 ">{item.year}</span>
            </p>
            <p className="my-3">
              تعدادکوره: <span className="fw-bold fs-6 ">{item.number}</span>
            </p>
            <p className="my-3">
              نوع : <span className="fw-bold fs-6 ">{item.type}</span>
            </p>
            <p className="my-3">
              محل: <span className="fw-bold fs-6 ">{item.location}</span>
            </p>
            <button className="btn btn-primary w-100 text-center ">
              {" "}
              نمایش کوره
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
