import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/auth/Login";
import UsersList from "../components/userManagment/UsersList";
import FireProof from "../components/fireProof/fireProof";
import EssentialGoods from "../components/EssentialGoods/EssentialGoods";
import FurnaceDistribute from "../components/FurnaceDistribue/FurnaceDistribute";
import FactoryManagment from "../components/FactoryManagment/FactoryManagment";
import Factory from "../components/furnaces/Factory";
import ObservingFurnaces from "../components/furnaces/Observingfurnaces/ObservingFurnaces";
import { BrowserRouter as Router, Switch } from "react-router-dom";

const AppRoutes = () => {
  const hasJWT = () => {
    let flag = false;
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  };

  return (
    <Fragment>
      <MainLayout>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Login />} />
          <Route path="/userManagment" element={<UsersList />} />
          <Route path="/FireProof" element={<FireProof />} />
          <Route path="/EssentialGoods" element={<EssentialGoods />} />
          <Route path="/FurnacePart" element={<FurnaceDistribute />} />
          <Route path="/FactoryManagment" element={<FactoryManagment />} />
          <Route path="/Dashboard/Factory/:id" element={<Factory />} />
          <Route
            path="/Dashboard/Factory/:id/Observingfurnaces/:id"
            element={<ObservingFurnaces />}
          />
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AppRoutes;
