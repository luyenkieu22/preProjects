import ConstantList from "./appConfig";
import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "home",
    path: ConstantList.ROOT_PATH + "home",
    role: authRoles.admin,
    isVisible: true,
  },
  {
    name: "Dashboard.category",
    icon: "engineering",
    path: "",
    isVisible: true,
    role: authRoles.user,
    children: [
      {
        name: "manage.add_employees",
        path: ConstantList.ROOT_PATH + "add-employee",
        icon: "keyboard_arrow_right",
        isVisible: true,
        role: authRoles.user,
      },
      {
        name: "manage.employees",
        path: ConstantList.ROOT_PATH + "manage-employees",
        icon: "keyboard_arrow_right",
        isVisible: true,
        role: authRoles.user,
      },
      {
        name: "manage.end_employees",
        path: ConstantList.ROOT_PATH + "end-employee",
        icon: "keyboard_arrow_right",
        isVisible: true,
        role: authRoles.user,
      }
    ]
  },
  {
    name: "Dashboard.manage",
    isVisible: true,
    role: authRoles.manage,
    path: "",
    icon: "receipt",
    children: [
      {
        name: "leader.waiting_approval",
        isVisible: true,
        role: authRoles.manage,
        path: ConstantList.ROOT_PATH + "waiting-approval",
        icon: "keyboard_arrow_right"
      },
      {
        name: "leader.leader_approval",
        isVisible: true,
        role: authRoles.manage,
        path: ConstantList.ROOT_PATH + "leader-approval",
        icon: "keyboard_arrow_right"
      }
    ]
  }
];
