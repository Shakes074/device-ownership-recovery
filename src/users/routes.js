import DeviceOwnerHome from './device-owner/Home.jsx';
import StoreAdminHome from './store/store-admin/Home.jsx';
import StoreStaffHome from './store/store-staff/Home.jsx';
import RepairShopHome from './repair-shop/Home.jsx';
import LawEnforcementHome from './lawenforcement/Home.jsx';
import SystemAdminHome from './system-admin/Home.jsx';
import { roleConfigs } from './config.js';

export const userRoutes = [
  {
    ...roleConfigs['device-owner'],
    Component: DeviceOwnerHome
  },
  {
    ...roleConfigs['store-admin'],
    Component: StoreAdminHome
  },
  {
    ...roleConfigs['store-staff'],
    Component: StoreStaffHome
  },
  {
    ...roleConfigs['repair-shop'],
    Component: RepairShopHome
  },
  {
    ...roleConfigs.lawenforcement,
    Component: LawEnforcementHome
  },
  {
    ...roleConfigs['system-admin'],
    Component: SystemAdminHome
  }
];
