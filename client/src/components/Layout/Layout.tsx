import React from "react";
import Header from "../Header/Header";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
