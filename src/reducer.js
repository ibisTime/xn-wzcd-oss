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
import { publicBanner } from './redux/public/banner';
import { publicBannerAddEdit } from './redux/public/banner-addedit';
import { publicAboutusAddEdit } from './redux/public/aboutus-addedit';
import { publicHotLineAddEdit } from './redux/public/hotLine-addedit';
import { publicTimeAddEdit } from './redux/public/time-addedit';
import { publicNotice } from './redux/public/notice';
import { publicNoticeAddEdit } from './redux/public/notice-addedit';

/**
 * 贷前工具
 */
 //  垫资请款预算单 + 详情 + 申请 + 审核 + 确认
import { securityEstimate } from './redux/loanstools/estimate';
import { securityEstimateAddEdit } from './redux/loanstools/estimate-addedit';
import { securityEstimateApply } from './redux/loanstools/estimate-apply';
import { securityEstimateCheck } from './redux/loanstools/estimate-check';
import { securityEstimateCertian } from './redux/loanstools/estimate-certain';

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
  publicHotLineAddEdit,
  publicBanner,
  publicBannerAddEdit,
  publicAboutusAddEdit,
  publicTimeAddEdit,
  publicNotice,
  publicNoticeAddEdit,
  securityEstimate,
  securityEstimateAddEdit,
  securityEstimateApply,
  securityEstimateCheck,
  securityEstimateCertian,
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
  loanstoolsMisInvoiceCertain
});
