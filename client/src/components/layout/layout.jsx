import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from "../header/header";
import {useSelector} from "react-redux";

const Layout = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  console.log('layout', useSelector(state => state.user))

  return (
    <>
      <Header/>
      {!isAuth &&
        <Outlet/>
      }
    </>
  );
};

export default Layout;