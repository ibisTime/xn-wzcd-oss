import { combineReducers } from 'redux';
import { user } from './redux/user';
import { menu } from './redux/menu';
import { modalDetail } from './redux/modal/build-modal-detail';
import { securityRole } from './redux/security/role';
import { securityRoleAddEdit } from './redux/security/role-addedit';
import { securityMenu } from './redux/security/menu';
import { securityMenuAddEdit } from './redux/security/menu-addedit';
import { securityNode } from './redux/security/node';
import { securityNodeAddEdit } from './redux/security/node-addedit';
import { securitySysParam } from './redux/security/sysParam';
import { securitySysParamAddEdit } from './redux/security/sysParam-addedit';
import { securityUser } from './redux/security/user';
import { securityAssign } from './redux/security/assign';
import { securityPwdReset } from './redux/security/pwdReset';
import { securityUserAddEdit } from './redux/security/user-addedit';
import { securityDataDict } from './redux/security/dataDict';
import { securityDataDictAddEdit } from './redux/security/dataDict-addedit';
import { securityCompConstruct } from './redux/security/compConstruct';
import { securityPost } from './redux/security/post';
import { securitySaleUser } from './redux/security/saleuser';
import { publicBanner } from './redux/public/banner';
import { publicBannerAddEdit } from './redux/public/banner-addedit';
import { publicAboutusAddEdit } from './redux/public/aboutus-addedit';
import { publicHotLineAddEdit } from './redux/public/hotLine-addedit';
import { publicTimeAddEdit } from './redux/public/time-addedit';
import { publicNotice } from './redux/public/notice';
import { publicNoticeAddEdit } from './redux/public/notice-addedit';

/**
 * 贷前管理
 */
// 预算单申请
import { loanBudget } from './redux/loan/budget';

/**
 * 贷前工具
 */
//  垫资请款预算单 + 详情 + 申请 + 审核 + 确认
import { loanstoolsEstimate } from './redux/loanstools/estimate';
import { loanstoolsEstimateAddEdit } from './redux/loanstools/estimate-addedit';
import { loanstoolsEstimateApply } from './redux/loanstools/estimate-apply';
import { loanstoolsEstimateCheck } from './redux/loanstools/estimate-check';
import { loanstoolsEstimateCertian } from './redux/loanstools/estimate-certain';

//  客户作废 + 详情 + 申请 + 审核 + 确认
import { loanstoolsCancel } from './redux/loanstools/cancel';
import { loanstoolsCancelAddedit } from './redux/loanstools/cancel-addedit';
import { loanstoolsCancelApply } from './redux/loanstools/cancel-apply';
import { loanstoolsCancelCheck } from './redux/loanstools/cancel-check';
import { loanstoolsCancelCertain } from './redux/loanstools/cancel-certain';

//  收回垫资款 + 详情 + 贷款回录
import { loanstoolsTake } from './redux/loanstools/take';
import { loanstoolsTakeAddedit } from './redux/loanstools/take-addedit';
import { loanstoolsTakeEnter } from './redux/loanstools/take-enter';

//  收回预算款 + 详情 + 申请 + 审核 + 确认
import { loanstoolsTakeEstimate } from './redux/loanstools/takeEstimate';
import { loanstoolsTakeEstimateAddedit } from './redux/loanstools/takeEstimate-addedit';
import { loanstoolsTakeEstimateCertain } from './redux/loanstools/takeEstimate-certain';

//  收回手续费 + 详情 + 收款回录
import { loanstoolstakeFree } from './redux/loanstools/takeFree';
import { loanstoolsTakeFreeAddedit } from './redux/loanstools/takeFree-addedit';
import { loanstoolsTakeFreeEnter } from './redux/loanstools/takeFree-enter';

//  客户作废 + 详情 + 申请 + 录入
import { loanstoolsCard } from './redux/loanstools/card';
import { loanstoolsCardAddedit } from './redux/loanstools/card-addedit';
import { loanstoolsCardApply } from './redux/loanstools/card-apply';
import { loanstoolsCardEnter } from './redux/loanstools/card-enter';

//  发保和 + 详情 + 录入
import { loanstoolsInvoice } from './redux/loanstools/invoice';
import { loanstoolsInvoiceAddedit } from './redux/loanstools/invoice-addedit';
import { loanstoolsInvoiceEnter } from './redux/loanstools/invoice-enter';

//  发票不匹配 + 详情 + 申请 + 审核 + 确认
import { loanstoolsMisInvoice } from './redux/loanstools/misInvoice';
import { loanstoolsMisInvoiceAddedit } from './redux/loanstools/misInvoice-addedit';
import { loanstoolsMisInvoiceApply } from './redux/loanstools/misInvoice-apply';
import { loanstoolsMisInvoiceCheck } from './redux/loanstools/misInvoice-check';
import { loanstoolsMisInvoiceCertain } from './redux/loanstools/misInvoice-certain';

//  返点支付 + 详情 + 制单 + 确认
import { loanstoolsRebates } from './redux/loanstools/rebates';
import { loanstoolsRebatesAddedit } from './redux/loanstools/rebates-addedit';
import { loanstoolsRebatesBill } from './redux/loanstools/rebates-bill';
import { loanstoolsRebatesCertain } from './redux/loanstools/rebates-certain';

//  银行合同 + 导入
import { loanstoolsContract } from './redux/loanstools/contract';
import { loanstoolsContractImport } from './redux/loanstools/contract-import';

//  应退按揭款 + 详情 + 确认
import { loanstoolsRefund } from './redux/loanstools/refund';
import { loanstoolsRefundAddedit } from './redux/loanstools/refund-addedit';
import { loanstoolsRefundCertain } from './redux/loanstools/refund-certain';

/**
* 汽车销售方案管理
*/
//  品牌管理 + 详情
import { bizBrand } from './redux/biz/brand';
import { bizBrandAddEdit } from './redux/biz/brand-addedit';

//  车系管理 + 详情
import { bizCarSeries } from './redux/biz/carSeries';
import { bizCarSeriesAddEdit } from './redux/biz/carSeries-addedit';

//  车型管理 + 详情
import { bizCarShape } from './redux/biz/carShape';
import { bizCarShapeAddEdit } from './redux/biz/carShape-addedit';

//  车贷申请单 + 详情 + 处理
import { bizHandleApply } from './redux/biz/handleApply';
import { bizHandleApplyAddedit } from './redux/biz/handleApply-addedit';
import { bizHandleApplyCheck } from './redux/biz/handleApply-check';

//  历史车贷申请单 + 详情
import { bizHistoricalApply } from './redux/biz/historicalApply';
import { bizHistoricalApplyAddedit } from './redux/biz/historicalApply-addedit';

/**
* 贷后管理
*/
//  还款业务管理 + 详情 + 修改银行卡号 + 查看还款计划 + 确定结清
import { bizRefundBusiness } from './redux/biz/refundBusiness';
import { bizRefundBusinessAddedit } from './redux/biz/refundBusiness-addedit';
import { bizRefundBusinessPlan } from './redux/biz/refundBusiness-plan';
import { bizRefundBusinessChangeCard } from './redux/biz/refundBusiness-changeCard';
import { bizRefundBusinessCertian } from './redux/biz/refundBusiness-certain';

//  当月还款账单 + 详情
import { bizRefundList } from './redux/biz/refundList';
import { bizRefundListAddedit } from './redux/biz/refundList-addedit';

//  逾期名单 + 详情 + 处理
import { bizOverdueList } from './redux/biz/overdueList';
import { bizOverdueListAddedit } from './redux/biz/overdueList-addedit';
import { bizOverdueListDispose } from './redux/biz/overdueList-dispose';

//  绿名单 + 详情 + 缴纳清收成本
import { bizGreenList } from './redux/biz/greenList';
import { bizGreenListAddedit } from './redux/biz/greenList-addedit';
import { bizGreenListPayment } from './redux/biz/greenList-payment';

//  黑名单 + 详情
import { bizBlackList } from './redux/biz/blackList';
import { bizBlackListAddedit } from './redux/biz/blackList-addedit';
import { bizBlackListDispose } from './redux/biz/blackList-dispose';

//  历史业务管理 + 详情
import { bizHistoryBusinessManage } from './redux/biz/historyBusinessManage';
import { bizHistoryBusinessManageAddedit } from './redux/biz/historyBusinessManage-addedit';

//  保险公司管理 + 新增 + 修改 + 删除
import { basisInsuranceCompany } from './redux/basis/insuranceCompany';
import { basisInsuranceCompanyAddedit } from './redux/basis/insuranceCompany-addedit';

//  收款账户管理 + 新增 + 修改 + 删除
import { basisReceivables } from './redux/basis/receivables';
import { basisReceivablesAddedit } from './redux/basis/receivables-addedit';

export default combineReducers({
  user,
  menu,
  modalDetail,
  securityRole,
  securityRoleAddEdit,
  securityMenu,
  securityMenuAddEdit,
  securityNode,
  securityNodeAddEdit,
  securityUser,
  securityAssign,
  securityPwdReset,
  securitySysParam,
  securitySysParamAddEdit,
  securityUserAddEdit,
  securityDataDict,
  securityDataDictAddEdit,
  securityCompConstruct,
  securityPost,
  securitySaleUser,
  publicHotLineAddEdit,
  publicBanner,
  publicBannerAddEdit,
  publicAboutusAddEdit,
  publicTimeAddEdit,
  publicNotice,
  publicNoticeAddEdit,
  loanBudget,
  loanstoolsEstimate,
  loanstoolsEstimateAddEdit,
  loanstoolsEstimateApply,
  loanstoolsEstimateCheck,
  loanstoolsEstimateCertian,
  loanstoolsCancel,
  loanstoolsCancelAddedit,
  loanstoolsCancelApply,
  loanstoolsCancelCheck,
  loanstoolsCancelCertain,
  loanstoolsTake,
  loanstoolsTakeAddedit,
  loanstoolsTakeEnter,
  loanstoolsTakeEstimate,
  loanstoolsTakeEstimateAddedit,
  loanstoolsTakeEstimateCertain,
  loanstoolstakeFree,
  loanstoolsTakeFreeAddedit,
  loanstoolsTakeFreeEnter,
  loanstoolsCard,
  loanstoolsCardAddedit,
  loanstoolsCardApply,
  loanstoolsCardEnter,
  loanstoolsInvoice,
  loanstoolsInvoiceAddedit,
  loanstoolsInvoiceEnter,
  loanstoolsMisInvoice,
  loanstoolsMisInvoiceAddedit,
  loanstoolsMisInvoiceApply,
  loanstoolsMisInvoiceCheck,
  loanstoolsMisInvoiceCertain,
  loanstoolsRebates,
  loanstoolsRebatesAddedit,
  loanstoolsRebatesBill,
  loanstoolsRebatesCertain,
  loanstoolsContract,
  loanstoolsContractImport,
  loanstoolsRefund,
  loanstoolsRefundAddedit,
  loanstoolsRefundCertain,
  bizBrand,
  bizBrandAddEdit,
  bizCarSeries,
  bizCarSeriesAddEdit,
  bizCarShape,
  bizCarShapeAddEdit,
  bizHandleApply,
  bizHandleApplyAddedit,
  bizHandleApplyCheck,
  bizHistoricalApply,
  bizHistoricalApplyAddedit,
  bizRefundBusiness,
  bizRefundBusinessAddedit,
  bizRefundBusinessPlan,
  bizRefundBusinessChangeCard,
  bizRefundBusinessCertian,
  bizRefundList,
  bizRefundListAddedit,
  bizOverdueList,
  bizOverdueListAddedit,
  bizOverdueListDispose,
  bizGreenList,
  bizGreenListAddedit,
  bizGreenListPayment,
  bizBlackList,
  bizBlackListAddedit,
  bizBlackListDispose,
  bizHistoryBusinessManage,
  bizHistoryBusinessManageAddedit,
  basisInsuranceCompany,
  basisInsuranceCompanyAddedit,
  basisReceivables,
  basisReceivablesAddedit
});
