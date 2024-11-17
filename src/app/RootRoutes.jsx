import React from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import ConstantList from "./appConfig";
import manageEmployeesRoutes from "./views/manageEmployee/ManageEmployeesRouter";
import homePageRoutes from "./views/HomePage/HomepageService";
import addEmployeeRoutes from "./views/addEmployee/AddEmployeeRouter";
import endEmployeeRoutes from "./views/endEmployee/EndEmployeeRouter";
import WaitingApprovalRouters from "./views/Leader/WaitingApprovalRouter";
import leaderApprovalRouters from "./views/LeaderApproval/LeaderApprovalRouter";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} /> //Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  // {
  //   component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  // }
];

const routes = [
  ...sessionRoutes,
  ...errorRoute,
  ...redirectRoute,
  ...homePageRoutes,
  ...manageEmployeesRoutes,
  ...addEmployeeRoutes,
  ...endEmployeeRoutes,
  ...WaitingApprovalRouters,
  ...leaderApprovalRouters
];

export default routes;
