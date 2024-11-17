import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const WaitingApproval = EgretLoadable({
  loader: () => import("./LeaderApproval")
});

const ViewComponent = withTranslation()(WaitingApproval);
const leaderApprovalRouters = [
  {
    path: ConstantList.ROOT_PATH + "leader-approval",
    component: ViewComponent,
    exact: true,
  }
];

export default leaderApprovalRouters;
