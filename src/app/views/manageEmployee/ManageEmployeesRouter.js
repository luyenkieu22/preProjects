import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
import { authRoles } from "app/auth/authRoles";

const ManageEmployees = EgretLoadable({
  loader: () => import("./ManageEmployees")
});

const ViewEmployees = withTranslation()(ManageEmployees);
const manageEmployeesRoutes = [
  {
    path: ConstantList.ROOT_PATH + "manage-employees",
    component: ViewEmployees,
    role: authRoles.user,
    exact: true,
  }
];

export default manageEmployeesRoutes;
