import asyncComponent from './component/async-component/async-component';

const ROUTES = [
  {
    path: '/system/role',
    component: asyncComponent(() => import('container/security/role/role'))
  },
  {
    path: '/system/role/addedit',
    component: asyncComponent(() => import('container/security/role-addedit/role-addedit'))
  },
  {
    path: '/system/role/menu',
    component: asyncComponent(() => import('container/security/role-menu/role-menu'))
  },
  {
    path: '/system/role/nodemenu',
    component: asyncComponent(() => import('container/security/node-menu/node-menu'))
  },
  {
    path: '/system/menu',
    component: asyncComponent(() => import('container/security/menu/menu'))
  },
  {
    path: '/system/menu/addedit',
    component: asyncComponent(() => import('container/security/menu-addedit/menu-addedit'))
  },
  {
    path: '/system/node',
    component: asyncComponent(() => import('container/security/node/node'))
  },
  {
    path: '/system/node/addedit',
    component: asyncComponent(() => import('container/security/node-addedit/node-addedit'))
  },
  {
    path: '/system/user',
    component: asyncComponent(() => import('container/security/user/user'))
  },
  {
    path: '/system/user/role',
    component: asyncComponent(() => import('container/security/user/assign'))
  },
  {
    path: '/system/user/pwd_reset',
    component: asyncComponent(() => import('container/security/user/pwdReset'))
  },

  //  系统参数
  {
    path: '/system/sysPara',
    component: asyncComponent(() => import('container/security/sysParam/sysParam'))
  },
  //  系统参数修改
  {
    path: '/system/sysPara/addedit',
    component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  {
    path: '/system/dataDict',
    component: asyncComponent(() => import('container/security/dataDict/dataDict'))
  },
  {
    path: '/system/dataDict/addedit',
    component: asyncComponent(() => import('container/security/dataDict-addedit/dataDict-addedit'))
  },
  {
    path: '/system/user/addedit',
    component: asyncComponent(() => import('container/security/user-addedit/user-addedit'))
  },
  // {
  //   path: '/system/compConstruct',
  //   component: asyncComponent(() => import('container/security/compConstruct/compConstruct'))
  // },

  //  贷前工具
  //  垫资请款预算单
  {
    path: '/loanstools/estimate',
    component: asyncComponent(() => import('container/loanstools/estimate/estimate'))
  },

  //  垫资请款预算单 详情
  {
    path: '/loanstools/estimate/addedit',
    component: asyncComponent(() => import('container/loanstools/estimate/estimate-addedit'))
  },

  //  垫资请款预算单 申请
  {
    path: '/loanstools/estimate/apply',
    component: asyncComponent(() => import('container/loanstools/estimate/estimate-apply'))
  },

  //  垫资请款预算单 审核
  {
    path: '/loanstools/estimate/check',
    component: asyncComponent(() => import('container/loanstools/estimate/estimate-check'))
  },

  //  垫资请款预算单 确认放款
  {
    path: '/loanstools/estimate/certain',
    component: asyncComponent(() => import('container/loanstools/estimate/estimate-certain'))
  },
  //  垫资请款预算单
  {
    path: '/loanstools/cancel',
    component: asyncComponent(() => import('container/loanstools/cancel/cancel'))
  },

  //  客户作废 详情
  {
    path: '/loanstools/cancel/addedit',
    component: asyncComponent(() => import('container/loanstools/cancel/cancel-addedit'))
  },

  //  客户作废 申请
  {
    path: '/loanstools/cancel/apply',
    component: asyncComponent(() => import('container/loanstools/cancel/cancel-apply'))
  },

  //  客户作废 审核
  {
    path: '/loanstools/cancel/check',
    component: asyncComponent(() => import('container/loanstools/cancel/cancel-check'))
  },

  //  客户作废 确认放款
  {
    path: '/loanstools/cancel/certain',
    component: asyncComponent(() => import('container/loanstools/cancel/cancel-certain'))
  }
];

export default ROUTES;
