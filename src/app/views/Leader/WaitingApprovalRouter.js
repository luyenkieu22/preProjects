import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const WaitingApproval = EgretLoadable({
  loader: () => import("./WaitingApproval")
});

const ViewComponent = withTranslation()(WaitingApproval);
const WaitingApprovalRouters = [
  {
    path: ConstantList.ROOT_PATH + "waiting-approval",
    component: ViewComponent,
    exact: true,
  }
];

export default WaitingApprovalRouters;
