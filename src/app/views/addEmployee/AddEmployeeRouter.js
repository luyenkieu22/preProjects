import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const AddEmployees = EgretLoadable({
  loader: () => import("./AddEmployee")
});

const ViewComponent = withTranslation()(AddEmployees);
const addEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "add-employee",
    component: ViewComponent,
    exact: true,
  }
];

export default addEmployeeRoutes;
