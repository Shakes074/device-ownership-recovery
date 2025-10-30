import { roleConfigs } from './config.js';
import {
  RoleHomePage,
  RoleAboutPage,
  RoleUsersPage,
  RoleContactPage,
  RoleLoginPage,
  RoleRegisterPage,
  RoleRequestPage,
  RoleAccessPage
} from '../components/RolePages.jsx';

export const userRoutes = [
  {
    key: 'device-owner',
    config: roleConfigs['device-owner'],
    basePath: roleConfigs['device-owner'].path,
    routes: [
      { path: '', Component: RoleHomePage },
      { path: 'about', Component: RoleAboutPage },
      { path: 'users', Component: RoleUsersPage },
      { path: 'contact', Component: RoleContactPage },
      { path: 'login', Component: RoleLoginPage },
      { path: 'register', Component: RoleRegisterPage }
    ]
  },
  {
    key: 'store-admin',
    config: roleConfigs['store-admin'],
    basePath: roleConfigs['store-admin'].path,
    routes: [
      { path: '', Component: RoleHomePage },
      { path: 'about', Component: RoleAboutPage },
      { path: 'users', Component: RoleUsersPage },
      { path: 'contact', Component: RoleContactPage },
      { path: 'request', Component: RoleRequestPage }
    ]
  },
  {
    key: 'store-staff',
    config: roleConfigs['store-staff'],
    basePath: roleConfigs['store-staff'].path,
    routes: [
      { path: '', Component: RoleHomePage },
      { path: 'about', Component: RoleAboutPage },
      { path: 'users', Component: RoleUsersPage },
      { path: 'contact', Component: RoleContactPage },
      { path: 'request', Component: RoleRequestPage }
    ]
  },
  {
    key: 'repair-shop',
    config: roleConfigs['repair-shop'],
    basePath: roleConfigs['repair-shop'].path,
    routes: [
      { path: '', Component: RoleHomePage },
      { path: 'about', Component: RoleAboutPage },
      { path: 'users', Component: RoleUsersPage },
      { path: 'contact', Component: RoleContactPage },
      { path: 'request', Component: RoleRequestPage }
    ]
  },
  {
    key: 'lawenforcement',
    config: roleConfigs.lawenforcement,
    basePath: roleConfigs.lawenforcement.path,
    routes: [
      { path: '', Component: RoleHomePage },
      { path: 'about', Component: RoleAboutPage },
      { path: 'users', Component: RoleUsersPage },
      { path: 'contact', Component: RoleContactPage },
      { path: 'request', Component: RoleRequestPage }
    ]
  },
  {
    key: 'system-admin',
    config: roleConfigs['system-admin'],
    basePath: roleConfigs['system-admin'].path,
    routes: [
      { path: '', Component: RoleHomePage },
      { path: 'about', Component: RoleAboutPage },
      { path: 'users', Component: RoleUsersPage },
      { path: 'contact', Component: RoleContactPage },
      { path: 'access', Component: RoleAccessPage }
    ]
  }
];
