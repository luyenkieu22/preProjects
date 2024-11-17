import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const EndEmployees = EgretLoadable({
  loader: () => import("./EndEmployee")
});

const ViewComponent = withTranslation()(EndEmployees);
const endEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "end-employee",
    component: ViewComponent,
    exact: true,
  }
];

export default endEmployeeRoutes;
