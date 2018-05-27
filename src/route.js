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
    {
        path: '/system/user/post',
        component: asyncComponent(() => import('container/security/user/post'))
    },
    {
        path: '/system/saleuser',
        component: asyncComponent(() => import('container/security/saleuser/saleuser'))
    },
    {
        path: '/system/saleuser/role',
        component: asyncComponent(() => import('container/security/user/assign'))
    },
    {
        path: '/system/saleuser/pwd_reset',
        component: asyncComponent(() => import('container/security/user/pwdReset'))
    },
    {
        path: '/system/saleuser/post',
        component: asyncComponent(() => import('container/security/user/post'))
    },
    {
        path: '/system/saleuser/addedit',
        component: asyncComponent(() => import('container/security/user-addedit/user-addedit'))
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
    {
        path: '/system/compConstruct',
        component: asyncComponent(() => import('container/security/compConstruct/compConstruct'))
    },
    {
        path: '/system/post',
        component: asyncComponent(() => import('container/security/post/post'))
    },

    // 贷前管理
    // 预算单申请
    {
        path: '/loan/budget',
        component: asyncComponent(() => import('container/loan/budget/budget'))
    },

    // 预算单申请 详情
    {
        path: '/loan/budget/addedit',
        component: asyncComponent(() => import('container/loan/budget-addedit/budget-addedit'))
    },

    // 发起征信查询
    {
        path: '/loan/creditStart',
        component: asyncComponent(() => import('container/loan/creditStart/creditStart'))
    },

    // 发起征信查询  发起征信查询
    {
        path: '/loan/creditStart/addedit',
        component: asyncComponent(() => import('container/loan/creditStart-addedit/creditStart-addedit'))
    },

    // 征信录入
    {
        path: '/loan/creditEntering',
        component: asyncComponent(() => import('container/loan/creditEntering/creditEntering'))
    },

    // 准入审查
    {
        path: '/loan/creditCheck',
        component: asyncComponent(() => import('container/loan/creditCheck/creditCheck'))
    },

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

    //  客户作废
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
    },

    //  收回垫资款
    {
        path: '/loanstools/take',
        component: asyncComponent(() => import('container/loanstools/take/take'))
    },

    //  收回垫资款 详情
    {
        path: '/loanstools/take/addedit',
        component: asyncComponent(() => import('container/loanstools/take/take-addedit'))
    },

    //  收回垫资款 申请
    {
        path: '/loanstools/take/enter',
        component: asyncComponent(() => import('container/loanstools/take/take-enter'))
    },

    //  收回预算款
    {
        path: '/loanstools/takeEstimate',
        component: asyncComponent(() => import('container/loanstools/takeEstimate/takeEstimate'))
    },

    //  收回预算款 详情
    {
        path: '/loanstools/takeEstimate/addedit',
        component: asyncComponent(() => import('container/loanstools/takeEstimate/takeEstimate-addedit'))
    },

    //  收回预算款 申请
    {
        path: '/loanstools/takeEstimate/certain',
        component: asyncComponent(() => import('container/loanstools/takeEstimate/takeEstimate-certain'))
    },

    //  收回手续费
    {
        path: '/loanstools/takeFree',
        component: asyncComponent(() => import('container/loanstools/takeFree/takeFree'))
    },

    //  收回手续费 详情
    {
        path: '/loanstools/takeFree/addedit',
        component: asyncComponent(() => import('container/loanstools/takeFree/takeFree-addedit'))
    },

    //  收回手续费 申请
    {
        path: '/loanstools/takeFree/enter',
        component: asyncComponent(() => import('container/loanstools/takeFree/takeFree-enter'))
    },

    //  制卡
    {
        path: '/loanstools/card',
        component: asyncComponent(() => import('container/loanstools/card/card'))
    },

    //  制卡 详情
    {
        path: '/loanstools/card/addedit',
        component: asyncComponent(() => import('container/loanstools/card/card-addedit'))
    },

    //  制卡 申请
    {
        path: '/loanstools/card/apply',
        component: asyncComponent(() => import('container/loanstools/card/card-apply'))
    },

    //  发保和
    {
        path: '/loanstools/invoice',
        component: asyncComponent(() => import('container/loanstools/invoice/invoice'))
    },

    //  发保和 详情
    {
        path: '/loanstools/invoice/addedit',
        component: asyncComponent(() => import('container/loanstools/invoice/invoice-addedit'))
    },

    //  发保和 申请
    {
        path: '/loanstools/invoice/enter',
        component: asyncComponent(() => import('container/loanstools/invoice/invoice-enter'))
    },

    //  发票不匹配
    {
        path: '/loanstools/misInvoice',
        component: asyncComponent(() => import('container/loanstools/misInvoice/misInvoice'))
    },

    //  发票不匹配 详情
    {
        path: '/loanstools/misInvoice/addedit',
        component: asyncComponent(() => import('container/loanstools/misInvoice/misInvoice-addedit'))
    },

    //  发票不匹配 申请
    {
        path: '/loanstools/misInvoice/apply',
        component: asyncComponent(() => import('container/loanstools/misInvoice/misInvoice-apply'))
    },

    //  发票不匹配 审核
    {
        path: '/loanstools/misInvoice/check',
        component: asyncComponent(() => import('container/loanstools/misInvoice/misInvoice-check'))
    },

    //  发票不匹配 确认放款
    {
        path: '/loanstools/misInvoice/certain',
        component: asyncComponent(() => import('container/loanstools/misInvoice/misInvoice-certain'))
    },

    //  返点支付
    {
        path: '/loanstools/rebates',
        component: asyncComponent(() => import('container/loanstools/rebates/rebates'))
    },

    //  返点支付 详情
    {
        path: '/loanstools/rebates/addedit',
        component: asyncComponent(() => import('container/loanstools/rebates/rebates-addedit'))
    },

    //  返点支付 制单
    {
        path: '/loanstools/rebates/bill',
        component: asyncComponent(() => import('container/loanstools/rebates/rebates-bill'))
    },

    //  返点支付 确认放款
    {
        path: '/loanstools/rebates/certain',
        component: asyncComponent(() => import('container/loanstools/rebates/rebates-certain'))
    },

    //  银行合同导入
    {
        path: '/loanstools/contract',
        component: asyncComponent(() => import('container/loanstools/contract/contract'))
    },

    //  银行合同导入 导入
    {
        path: '/loanstools/contract/import',
        component: asyncComponent(() => import('container/loanstools/contract/contract-import'))
    },

    //  应退按揭款
    {
        path: '/loanstools/refund',
        component: asyncComponent(() => import('container/loanstools/refund/refund'))
    },

    //  应退按揭款 详情
    {
        path: '/loanstools/refund/addedit',
        component: asyncComponent(() => import('container/loanstools/refund/refund-addedit'))
    },

    //  应退按揭款 确认放款
    {
        path: '/loanstools/refund/certain',
        component: asyncComponent(() => import('container/loanstools/refund/refund-certain'))
    },

    //  汽车销售方案
    //  品牌管理
    {
        path: '/biz/brand',
        component: asyncComponent(() => import('container/biz/carSale/brand'))
    },

    //  品牌管理 详情
    {
        path: '/biz/brand/addedit',
        component: asyncComponent(() => import('container/biz/carSale/brand-addedit'))
    },

    //  车系管理
    {
        path: '/biz/carSeries',
        component: asyncComponent(() => import('container/biz/carSale/carSeries'))
    },

    //  车系管理 详情
    {
        path: '/biz/carSeries/addedit',
        component: asyncComponent(() => import('container/biz/carSale/carSeries-addedit'))
    },

    //  车型管理
    {
        path: '/biz/carShape',
        component: asyncComponent(() => import('container/biz/carSale/carShape'))
    },

    //  车型管理 详情
    {
        path: '/biz/carShape/addedit',
        component: asyncComponent(() => import('container/biz/carSale/carShape-addedit'))
    },

    //  车贷申请单
    {
        path: '/biz/handleApply',
        component: asyncComponent(() => import('container/biz/carSale/handleApply'))
    },

    //  车贷申请单 处理
    {
        path: '/biz/handleApply/check',
        component: asyncComponent(() => import('container/biz/carSale/handleApply-check'))
    },

    //  车贷申请单 详情
    {
        path: '/biz/handleApply/addedit',
        component: asyncComponent(() => import('container/biz/carSale/handleApply-addedit'))
    },

    //  历史车贷申请单
    {
        path: '/biz/historicalApply',
        component: asyncComponent(() => import('container/biz/carSale/historicalApply'))
    },

    //  历史车贷申请单  详情
    {
        path: '/biz/historicalApply/addedit',
        component: asyncComponent(() => import('container/biz/carSale/historicalApply-addedit'))
    },

    //  贷后管理
    //  还款业务 管理车贷
    {
        path: '/biz/refundBusiness',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness'))
    },

    //  还款业务 管理商品
    {
        path: '/biz/refundBusinessGoods',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusinessGoods'))
    },

    //  还款业务 详情
    {
        path: '/biz/refundBusiness/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-addedit'))
    },

    //  还款业务 还款计划
    {
        path: '/biz/refundBusiness/plan',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-plan'))
    },

    //  还款业务 还款卡变更
    {
        path: '/biz/refundBusiness/changecard',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-changeCard'))
    },

    //  还款业务 确认结清
    {
        path: '/biz/refundBusiness/certain',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundBusiness-certain'))
    },

    //  当月还款名单
    {
        path: '/biz/refundList',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundList'))
    },

    //  当月还款名单 详情
    {
        path: '/biz/refundList/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/refundList-addedit'))
    },

    //  逾期名单
    {
        path: '/biz/overdueList',
        component: asyncComponent(() => import('container/biz/carLoanRepay/overdueList'))
    },

    //  逾期名单 详情
    {
        path: '/biz/overdueList/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/overdueList-addedit'))
    },

    //  逾期处理
    {
        path: '/biz/overdueList/dispose',
        component: asyncComponent(() => import('container/biz/carLoanRepay/overdueList-dispose'))
    },

    //  绿名单
    {
        path: '/biz/greenList',
        component: asyncComponent(() => import('container/biz/carLoanRepay/greenList'))
    },

    //  绿名单 详情
    {
        path: '/biz/greenList/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/greenList-addedit'))
    },

    //  绿名单 缴纳清收成本
    {
        path: '/biz/greenList/payment',
        component: asyncComponent(() => import('container/biz/carLoanRepay/greenList-payment'))
    },

    //  黑名单
    {
        path: '/biz/blackList',
        component: asyncComponent(() => import('container/biz/carLoanRepay/blackList'))
    },

    //  黑名单详情
    {
        path: '/biz/blackList/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/blackList-addedit'))
    },

    //  黑名单处理
    {
        path: '/biz/blackList/dispose',
        component: asyncComponent(() => import('container/biz/carLoanRepay/blackList-dispose'))
    },

    //  历史业务管理
    {
        path: '/biz/historyBusinessManage',
        component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage'))
    },

    //  历史业务管理 详情1
    {
        path: '/biz/historyBusinessManage/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage-addedit'))
    },

    //  历史业务管理 详情的 详情
    {
        path: '/biz/historyBusinessManage/addedit/addedit',
        component: asyncComponent(() => import('container/biz/carLoanRepay/historyBusinessManage-addedit-addedit'))
    },

    // 基础管理管理
    //  保险公司管理
    {
        path: '/basis/insuranceCompany',
        component: asyncComponent(() => import('container/basis/insuranceCompany/insuranceCompany'))
    },

    //  保险公司管理 新增,修改
    {
        path: '/basis/insuranceCompany/addedit',
        component: asyncComponent(() => import('container/basis/insuranceCompany/insuranceCompany-addedit'))
    },

    //  收款账户管理
    {
        path: '/basis/receivables',
        component: asyncComponent(() => import('container/basis/receivables/receivables'))
    },

    //  收款账户管理 新增，修改
    {
        path: '/basis/receivables/addedit',
        component: asyncComponent(() => import('container/basis/receivables/receivables-addedit'))
    },

    //  身份证区域表
    {
        path: '/basis/idCardArea',
        component: asyncComponent(() => import('container/basis/idCardArea/idCardArea'))
    },

    //  身份证区域表 新增，修改
    {
        path: '/basis/idCardArea/addedit',
        component: asyncComponent(() => import('container/basis/idCardArea/idCardArea-addedit'))
    },

    //  全国省份编号
    {
        path: '/basis/provinceNum',
        component: asyncComponent(() => import('container/basis/provinceNum/provinceNum'))
    },

    //  全国省份编号 新增，修改
    {
        path: '/basis/provinceNum/addedit',
        component: asyncComponent(() => import('container/basis/provinceNum/provinceNum-addedit'))
    }
];

export default ROUTES;
