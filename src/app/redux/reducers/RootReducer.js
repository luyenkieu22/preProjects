import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import EmployeesReducer from "./EmployeesReducer";
import CertificateReducer from "./CertificateReducer";
import FamilyReducer from "./FamilyReducer";
import ExperienceReducer from "./ExperienceReducer";
import SalaryIncreaseReducer from "./SalaryIncreaseReducer";
import ProcessReducer from "./ProcessReducer";
import ProposalReducer from "./ProposalReducer";
import LeaderReducer from "./LeaderReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  employees: EmployeesReducer,
  certificates: CertificateReducer,
  family: FamilyReducer,
  experiences: ExperienceReducer,
  salaryIncrease: SalaryIncreaseReducer,
  process: ProcessReducer,
  proposal: ProposalReducer,
  leader: LeaderReducer,
});

export default RootReducer;
