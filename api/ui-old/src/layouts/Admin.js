import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AddCustom from "components/Sections/Custom/AddCustom";
import EditCustomData from "components/Sections/Custom/EditCustomData";
import AddCustomData from "components/Sections/Custom/AddCustomData";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/* <Route path="/admin/maps" exact component={Maps} /> */}
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/custom/add/" exact component={AddCustom} />
            <Route path="/admin/customdata/add/:id" exact component={AddCustomData} />
            <Route path="/admin/customdata/edit/:schema_id/:id" exact component={EditCustomData} />
            {/* <Route path="/admin/custom/edit/:id" exact component={EditCustom} /> */}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
