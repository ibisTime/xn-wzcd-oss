import { combineReducers } from 'redux';
import { user } from './redux/user';
import { menu } from './redux/menu';
import { modalDetail } from './redux/modal/build-modal-detail';
import { securityRole } from './redux/security/role';
import { securityRoleAddEdit } from './redux/security/role-addedit';
import { securityMenu } from './redux/security/menu';
import { securityMenuAddEdit } from './redux/security/menu-addedit';
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
import { securityNode } from './redux/security/node';
import { securityNodeAddEdit } from './redux/security/node-addedit';
import { securityNodeSetMateriallist } from './redux/security/node-setMateriallist';
import { publicBanner } from './redux/public/banner';
import { publicBannerAddEdit } from './redux/public/banner-addedit';
import { publicAboutusAddEdit } from './redux/public/aboutus-addedit';
import { publicHotLineAddEdit } from './redux/public/hotLine-addedit';
import { publicTimeAddEdit } from './redux/public/time-addedit';
import { publicNotice } from './redux/public/notice';
import { publicNoticeAddEdit } from './redux/public/notice-addedit';
import { bizBrand } from './redux/biz/brand';
import { bizBrandAddEdit } from './redux/biz/brand-addedit';
import { bizCarSeries } from './redux/biz/carSeries';
import { bizCarSeriesAddEdit } from './redux/biz/carSeries-addedit';
import { bizCarShape } from './redux/biz/carShape';
import { bizCarShapeAddEdit } from './redux/biz/carShape-addedit';
import { generalTextParam } from './redux/general/text-param';
import { generalTextParamAddEdit } from './redux/general/text-param-addedit';
/** ***** 财务管理start ***** **/
// 会员账户--账户查询
import { financeUserAccount } from './redux/finance/user-account';
// 会员账户--账户查询--流水
import { financeUserFlows } from './redux/finance/user-flows';
// 会员账户--流水查询
import { financeAllUserFlows } from './redux/finance/all-user-flows';
import { financeAccount } from './redux/finance/account';
import { financeLedgerAddEdit } from '@redux/finance/ledger-addedit';
import { financePlatformLedger } from '@redux/finance/platform-ledger';
import { financeEnchashmentRule } from '@redux/finance/enchashmentRule';
import { financeEnchashmentRuleAddEdit } from '@redux/finance/enchashmentRule-addedit';
import { financeUnderEnchashment } from '@redux/finance/underEnchashment';
import { financeUnderEnchashmentAddEdit } from '@redux/finance/underEnchashment-addedit';
import { financeUnderEnchashmentCheck } from '@redux/finance/underEnchashment-check';
import { financeEnchashments } from '@redux/finance/enchashments';
import { financeEnchashmentsAddEdit } from '@redux/finance/enchashments-addedit';
import { creditAddEdit } from '@redux/demo/credit-addedit';

//  返点支付
import { carloanfinancePointreturn } from './redux/carloanfinance/pointreturn';
import { carloanfinancePointreturnAddedit } from './redux/carloanfinance/pointreturn-addedit';
import { carloanfinancePointreturnReturn } from './redux/carloanfinance/pointreturn-return';

//  车贷申请单 + 处理
import { bizHandleApply } from './redux/biz/handleApply';
import { bizHandleApplyCheck } from './redux/biz/handleApply-check';

//  历史车贷申请单 + 处理
import { bizHistoricalApply } from './redux/biz/historicalApply';
import { bizHistoricalApplyAddedit } from './redux/biz/historicalApply-addedit';

//  会员查询 + 详情
import { bizMemberInquiries } from './redux/biz/memberInquiries';
import { bizMemberInquiriesAddedit } from './redux/biz/memberInquiries-addedit';

//  还款卡查询 + 详情
import { bizRefundCard } from './redux/biz/refundCard';
import { bizRefundCardAddedit } from './redux/biz/refundCard-addedit';

/** ***** 财务管理end ***** **/
//  车贷业务管理 + 详情
import { bizCarLoanBusiness } from './redux/biz/carLoanBusiness';
import { bizCarLoanBusinessAddedit } from '@redux/biz/carLoanBusiness-addedit';
import { bizCarLoanBusinessCheck } from '@redux/biz/carLoanBusiness-check';

//  银行放款 + 详情 + 录入抵押信息 + 确认提交银行 + 低压完成
import { bizBankMoney } from './redux/biz/bankMoney';
import { bizBankMoneyAddEdit } from './redux/biz/bankMoney-addedit';
import { bizBankMoneySettle } from './redux/biz/bankMoney-settle';
import { bizBankMoneySub } from './redux/biz/bankMoney-sub';
import { bizBankMoneyCertain } from './redux/biz/bankMoney-certain';
import { bizBankMoneyEnter } from './redux/biz/bankMoney-enter';

//  车辆抵押 + 详情 + 车辆落户 + 确认提交银行 + 确认收款
import { bizMortgage } from './redux/biz/mortgage';
import { bizMortgageAddEdit } from './redux/biz/mortgage-addedit';
import { bizMortgageEnter } from './redux/biz/mortgage-enter';
import { bizMortgageSub } from './redux/biz/mortgage-sub';
import { bizMortgageCertain } from './redux/biz/mortgage-certain';

//  档案入党 + 详情 + 确认入党
import { bizArchives } from './redux/biz/archives';
import { bizArchivesAddEdit } from './redux/biz/archives-addedit';
import { bizArchivesCertain } from './redux/biz/archives-certain';

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

//  黄名单 + 详情 + 缴纳清收成本 + 缴纳代偿款
import { bizYellowList } from './redux/biz/yellowList';
import { bizYellowListAddEdit } from './redux/biz/yellowList-addedit';
import { bizYellowListPayCost } from './redux/biz/yellowList-payCost';
import { bizYellowListPayCompensate } from './redux/biz/yellowList-payCompensate';

//  用户赎回 + 详情 + 申请赎回 + 风控主管审核 + 财务经理审核
import { bizUserRedemption } from './redux/biz/userRedemption';
import { bizUserRedemptionAddEdit } from './redux/biz/userRedemption-addedit';
import { bizUserRedemptionApplyRedeem } from './redux/biz/userRedemption-applyRedeem';
import { bizUserRedemptionCheckDirector } from './redux/biz/userRedemption-checkDirector';
import { bizUserRedemptionCheckFinance } from './redux/biz/userRedemption-checkFinance';

//  黑名单 + 详情
import { bizBlackList } from './redux/biz/blackList';
import { bizBlackListAddedit } from './redux/biz/blackList-addedit';
import { bizBlackListDispose } from './redux/biz/blackList-dispose';

//  红名单 + 详情 + 申请拖车 + 总经理审批 + 财务打款 + 录入拖车结果
import { bizredList } from './redux/biz/redList';
import { bizredListAddEdit } from './redux/biz/redList-addedit';
import { bizredListApply } from './redux/biz/redList-apply';
import { bizredListCheck } from './redux/biz/redList-check';
import { bizredListPay } from './redux/biz/redList-pay';
import { bizredListEnter } from './redux/biz/redList-enter';

//  拖车管理 + 详情 + 处理结果
import { bizTrailer } from './redux/biz/trailer';
import { bizTrailerAddEdit } from './redux/biz/trailer-addedit';
import { bizTrailerDispose } from './redux/biz/trailer-dispose';

//  司法诉讼 + 详情 + 处理结果
import { bizLitigation } from './redux/biz/litigation';
import { bizLitigationAddEdit } from './redux/biz/litigation-addedit';
import { bizLitigationDispose } from './redux/biz/litigation-dispose';

//  结清审核 + 详情 + 清欠催收部审核 + 驻行人员审核 + 总经理审核 + 财务审核
import { bizSettlement } from './redux/biz/settlement';
import { bizSettlementAddEdit } from './redux/biz/settlement-addedit';
import { bizSettlementCollection } from './redux/biz/settlement-collection';
import { bizSettlementFinance } from './redux/biz/settlement-finance';
import { bizSettlementManager } from './redux/biz/settlement-manager';
import { bizSettlementStationed } from './redux/biz/settlement-stationed';

//  解除抵押 + 详情 + 解除抵押
import { mortgages } from './redux/biz/mortgages/mortgages';
import { mortgagesAddEdit } from './redux/biz/mortgages/mortgages-addedit';
import { mortgagesRelieve } from './redux/biz/mortgages/mortgages-relieve';

//  历史业务管理 + 详情
import { bizHistoryBusinessManage } from './redux/biz/historyBusinessManage';
import { bizHistoryBusinessManageAddedit } from './redux/biz/historyBusinessManage-addedit';
import { bizHistoryBusinessManageAddeditAddedit } from './redux/biz/historyBusinessManage-addedit-addedit';

/**
 * 基础管理
 */
//  保险公司管理 + 新增 + 修改 + 删除
import { basisInsuranceCompany } from './redux/basis/insuranceCompany';
import { basisInsuranceCompanyAddedit } from './redux/basis/insuranceCompany-addedit';

//  收款账户管理 + 新增 + 修改 + 删除
import { basisReceivables } from './redux/basis/receivables';
import { basisReceivablesAddedit } from './redux/basis/receivables-addedit';

//  身份证区域表 + 新增 + 修改 + 删除
import { basisIdCardArea } from './redux/basis/idCardArea';
import { basisIdCardAreaAddedit } from './redux/basis/idCardArea-addedit';

//  全国省份编号 + 新增 + 修改 + 删除
import { basisProvinceNum } from './redux/basis/provinceNum';
import { basisProvinceNumAddedit } from './redux/basis/provinceNum-addedit';

//  经销商管理 + 详情 + 删除
import { basisDealer } from './redux/basis/dealer';
import { basisDealerAddedit } from './redux/basis/dealer-addedit';
import { basisDealerCheck } from './redux/basis/dealer-check';

/**
 * 贷前管理
 */
// 发起征信查询
import { loanCredit } from './redux/loan/credit';
import { loanCreditAddedit } from './redux/loan/credit-addedit';

/**
 * 贷前工具
 */
//  收回手续费 + 详情 + 收款回录
import { loanstoolstakeFree } from './redux/loanstools/takeFree';
import { loanstoolsTakeFreeAddedit } from './redux/loanstools/takeFree-addedit';
import { loanstoolsTakeFreeEnter } from './redux/loanstools/takeFree-enter';

//  客户作废 + 详情 + 申请 + 审核 + 确认
import { loanstoolsCancel } from './redux/loanstools/cancel';
import { loanstoolsCancelAddedit } from './redux/loanstools/cancel-addedit';
import { loanstoolsCancelApply } from './redux/loanstools/cancel-apply';
import { loanstoolsCancelCheck } from './redux/loanstools/cancel-check';
import { loanstoolsCancelCertain } from './redux/loanstools/cancel-certain';

//  退客户垫资款 + 详情 + 财务确认退款
import { loanstoolsRefund } from './redux/loanstools/refund';
import { loanstoolsRefundAddedit } from './redux/loanstools/refund-addedit';
import { loanstoolsRefundCertain } from './redux/loanstools/refund-certain';

/**
 * 资料传递
 */
//  资料传递 + 详情 + 发件 + 收件并审核
import { transmit } from './redux/transmit/transmit';
import { transmitAddedit } from './redux/transmit/transmit-addedit';
import { transmitSend } from './redux/transmit/transmit-send';
import { transmitCheck } from './redux/transmit/transmit-check';

/**
 * 贷后工具
 */
//  GPS申领 + 详情 + 申领 + 审核
import { postloantoolsApplyGps } from './redux/postloantools/applyGps';
import { postloantoolsApplyGpsAddedit } from './redux/postloantools/applyGps-addedit';
import { postloantoolsApplyGpsApply } from './redux/postloantools/applyGps-apply';
import { postloantoolsApplyGpsCheck } from './redux/postloantools/applyGps-check';

//  Gps管理 + 详情
import { postloantoolsManageGps } from './redux/postloantools/manageGps';
import { postloantoolsManageGpsAddedit } from './redux/postloantools/manageGps-addedit';

//  导入逾期名单 + 详情 + 导入 + 处理
import { postloantoolsImport } from './redux/postloantools/import';
import { postloantoolsImportAddedit } from './redux/postloantools/import-addedit';
import { postloantoolsImportImport } from './redux/postloantools/import-import';
import { postloantoolsImportDispose } from './redux/postloantools/import-dispose';

/**
 * 统计分析
 */
import { bizBalancedetail } from './redux/analysis/balancedetail';
import { analysisProtect } from './redux/analysis/protect';

/**
 * 人事
 */
// 人事档案 + 详情
import { personalarchivesParchives } from './redux/personalarchives/parchives';
import { personalarchivesParchivesAddedit } from './redux/personalarchives/parchives-addedit';

// 车贷档案
import { loanarchivesLocationcode } from './redux/loanarchives/locationcode';
import { loanarchivesLocationcodeAddedit } from './redux/loanarchives/locationcode-addedit';

// 车贷档案查询
import { loanarchivesArchivesquery } from './redux/loanarchives/archivesquery';

//  离职档案 + 详情
import { personalarchivesQuitarchives } from './redux/personalarchives/quitarchives';
import { personalarchivesQuitarchivesAddedit } from './redux/personalarchives/quitarchives-addedit';

//  合同管理
import { contractManage } from './redux/contract/manage';
import { contractManageAddedit } from './redux/contract/manage-addedit';
import { contractManageContinue } from './redux/contract/manage-continue';

//  用人申请 + 详情 + 申请 + 审核
import { recruitApply } from './redux/recruit/apply';
import { recruitApplyAddedit } from './redux/recruit/apply-addedit';
import { recruitApplyApply } from './redux/recruit/apply-apply';
import { recruitApplyCheck } from './redux/recruit/apply-check';

//  应聘登记 + 详情 + 面试结果录入 + 发起入职申请
import { recruitRegister } from './redux/recruit/register';
import { recruitRegisterAddedit } from './redux/recruit/register-addedit';
import { recruitRegisterEnter } from './redux/recruit/register-enter';
import { recruitRegisterApply } from './redux/recruit/register-apply';

//  入职申请 + 详情 + 申请 + 审核
import { recruitEntry } from './redux/recruit/entry';
import { recruitEntryAddedit } from './redux/recruit/entry-addedit';
import { recruitEntryApply } from './redux/recruit/entry-apply';
import { recruitEntryCheck } from './redux/recruit/entry-check';

//  转正申请 + 详情 + 申请 + 审核
import { recruitFormal } from './redux/recruit/formal';
import { recruitFormalAddedit } from './redux/recruit/formal-addedit';
import { recruitFormalApply } from './redux/recruit/formal-apply';
import { recruitFormalCheck } from './redux/recruit/formal-check';

//  调岗申请 + 详情 + 申请 + 审核
import { recruitPost } from './redux/recruit/post';
import { recruitPostAddedit } from './redux/recruit/post-addedit';
import { recruitPostApply } from './redux/recruit/post-apply';
import { recruitPostCheck } from './redux/recruit/post-check';

//  请假申请 + 详情 + 申请 + 审核
import { attendanceLeave } from './redux/attendance/leave';
import { attendanceLeaveAddedit } from './redux/attendance/leave-addedit';

//  补签申请 + 详情 + 申请 + 审核
import { attendanceSupplement } from './redux/attendance/supplement';
import { attendanceSupplementAddedit } from './redux/attendance/supplement-addedit';

//  加班申请 + 详情 + 申请 + 审核
import { attendanceOvertime } from './redux/attendance/overtime';
import { attendanceOvertimeAddedit } from './redux/attendance/overtime-addedit';

//  出差申请 + 详情 + 申请 + 审核
import { attendanceTravel } from './redux/attendance/travel';
import { attendanceTravelAddedit } from './redux/attendance/travel-addedit';

//  公出申请 + 详情 + 申请 + 审核
import { attendancePublicity } from './redux/attendance/publicity';
import { attendancePublicityAddedit } from './redux/attendance/publicity-addedit';

//  考勤汇总
import { attendanceSummary } from './redux/attendance/summary';

// 行政
// 库存管理
// 类别管理
import { stockCategory } from './redux/stock/category';
import { stockCategoryAddedit } from './redux/stock/category-addedit';

// 出库管理
import { stockOuttreasury } from './redux/stock/outtreasury';
import { stockOuttreasuryAddedit } from './redux/stock/outtreasury-addedit';

// 品名管理
import { stockProductname } from './redux/stock/productname';
import { stockProductnameAddedit } from './redux/stock/productname-addedit';

// 库存管理
import { stockStock } from './redux/stock/stock';
import { stockStockAddedit } from './redux/stock/stock-addedit';

// 通知公告
// 公告管理
import { noticeNotice } from './redux/notice/notice';
import { noticeNoticeAddedit } from './redux/notice/notice-addedit';

// 公司制度
import { noticeCompanysystem } from './redux/notice/companysystem';
import { noticeCompanysystemAddedit } from './redux/notice/companysystem-addedit';

// 车辆违章处理
import { administrativeCarHandle } from './redux/administrative/carHandle';
import { administrativeCarHandleAddedit } from './redux/administrative/carHandle-addedit';
import { administrativeCarHandleCheck } from './redux/administrative/carHandle-check';

// 福利发放申请
import { administrativeWelfare } from './redux/administrative/welfare';
import { administrativeWelfareAddedit } from './redux/administrative/welfare-addedit';
import { administrativeWelfareCheck } from './redux/administrative/welfare-check';

// 费用预支申请
import { administrativeCost } from './redux/administrative/cost';
import { administrativeCostAddedit } from './redux/administrative/cost-addedit';
import { administrativeCostDetail } from './redux/administrative/cost-detail';

// 办公用品申请
import { administrativeOfficeSupplies } from './redux/administrative/officeSupplies';
import { administrativeOfficeSuppliesAddedit } from './redux/administrative/officeSupplies-addedit';

// 固定资产申请
import { administrativeFixedAssets } from './redux/administrative/fixedAssets';
import { administrativeFixedAssetsAddedit } from './redux/administrative/fixedAssets-addedit';

// 领导请示申请
import { administrativeLeader } from './redux/administrative/leader';
import { administrativeLeaderAddedit } from './redux/administrative/leader-addedit';

export default combineReducers({
  user,
  menu,
  modalDetail,
  securityRole,
  securityRoleAddEdit,
  securityMenu,
  securityMenuAddEdit,
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
  securityNode,
  securityNodeAddEdit,
  securityNodeSetMateriallist,
  publicHotLineAddEdit,
  publicBanner,
  publicBannerAddEdit,
  publicAboutusAddEdit,
  publicTimeAddEdit,
  publicNotice,
  publicNoticeAddEdit,
  bizMemberInquiries,
  bizBrand,
  bizBrandAddEdit,
  bizCarSeries,
  bizCarSeriesAddEdit,
  bizCarShape,
  bizCarShapeAddEdit,
  bizHandleApply,
  bizMemberInquiriesAddedit,
  generalTextParam,
  generalTextParamAddEdit,
  financeUserAccount,
  financeUserFlows,
  financeAllUserFlows,
  financeAccount,
  financePlatformLedger,
  financeEnchashmentRule,
  financeEnchashmentRuleAddEdit,
  financeUnderEnchashment,
  financeUnderEnchashmentAddEdit,
  financeUnderEnchashmentCheck,
  financeEnchashments,
  financeEnchashmentsAddEdit,
  creditAddEdit,
  bizCarLoanBusiness,
  bizCarLoanBusinessAddedit,
  bizRefundBusiness,
  bizRefundBusinessAddedit,
  bizRefundList,
  bizOverdueList,
  bizGreenList,
  bizBlackList,
  bizHistoryBusinessManage,
  bizCarLoanBusinessCheck,
  bizRefundBusinessPlan,
  bizRefundBusinessChangeCard,
  bizRefundBusinessCertian,
  bizOverdueListDispose,
  bizBlackListDispose,
  bizGreenListPayment,
  bizOverdueListAddedit,
  bizRefundCard,
  bizRefundCardAddedit,
  bizHandleApplyCheck,
  bizHistoricalApply,
  bizHistoricalApplyAddedit,
  bizGreenListAddedit,
  bizRefundListAddedit,
  bizHistoryBusinessManageAddedit,
  bizBlackListAddedit,
  bizBankMoney,
  bizBankMoneyAddEdit,
  bizBankMoneySettle,
  bizBankMoneySub,
  bizBankMoneyCertain,
  bizBankMoneyEnter,
  bizMortgage,
  bizMortgageAddEdit,
  bizMortgageEnter,
  bizMortgageSub,
  bizMortgageCertain,
  bizArchives,
  bizArchivesAddEdit,
  bizArchivesCertain,
  bizredList,
  bizredListAddEdit,
  bizredListApply,
  bizredListCheck,
  bizredListPay,
  bizredListEnter,
  loanCredit,
  loanCreditAddedit,
  loanstoolstakeFree,
  loanstoolsTakeFreeAddedit,
  loanstoolsTakeFreeEnter,
  loanstoolsCancel,
  loanstoolsCancelAddedit,
  loanstoolsCancelApply,
  loanstoolsCancelCheck,
  loanstoolsCancelCertain,
  loanstoolsRefund,
  loanstoolsRefundAddedit,
  loanstoolsRefundCertain,
  bizTrailer,
  bizTrailerAddEdit,
  bizTrailerDispose,
  transmit,
  transmitAddedit,
  transmitSend,
  transmitCheck,
  postloantoolsApplyGps,
  postloantoolsApplyGpsAddedit,
  postloantoolsApplyGpsApply,
  postloantoolsApplyGpsCheck,
  postloantoolsManageGps,
  postloantoolsManageGpsAddedit,
  bizLitigation,
  bizLitigationAddEdit,
  bizLitigationDispose,
  bizBalancedetail,
  analysisProtect,
  bizHistoryBusinessManageAddeditAddedit,
  bizSettlement,
  bizSettlementAddEdit,
  bizSettlementCollection,
  bizSettlementFinance,
  bizSettlementManager,
  bizSettlementStationed,
  postloantoolsImport,
  postloantoolsImportAddedit,
  postloantoolsImportImport,
  postloantoolsImportDispose,
  mortgages,
  mortgagesAddEdit,
  mortgagesRelieve,
  personalarchivesParchives,
  personalarchivesParchivesAddedit,
  loanarchivesLocationcode,
  loanarchivesLocationcodeAddedit,
  loanarchivesArchivesquery,
  recruitRegister,
  recruitRegisterAddedit,
  recruitRegisterEnter,
  recruitRegisterApply,
  personalarchivesQuitarchives,
  personalarchivesQuitarchivesAddedit,
  recruitApply,
  recruitApplyAddedit,
  recruitApplyApply,
  recruitApplyCheck,
  recruitEntry,
  recruitEntryAddedit,
  recruitEntryApply,
  recruitEntryCheck,
  contractManage,
  contractManageAddedit,
  contractManageContinue,
  attendanceLeave,
  attendanceLeaveAddedit,
  recruitFormal,
  recruitFormalAddedit,
  recruitFormalApply,
  recruitFormalCheck,
  recruitPost,
  recruitPostAddedit,
  recruitPostApply,
  recruitPostCheck,
  attendanceSupplement,
  attendanceSupplementAddedit,
  attendanceOvertime,
  attendanceOvertimeAddedit,
  attendanceTravel,
  attendanceTravelAddedit,
  attendancePublicity,
  attendancePublicityAddedit,
  attendanceSummary,
  stockCategory,
  stockCategoryAddedit,
  stockOuttreasury,
  stockOuttreasuryAddedit,
  stockProductname,
  stockProductnameAddedit,
  stockStock,
  stockStockAddedit,
  noticeNotice,
  noticeNoticeAddedit,
  noticeCompanysystem,
  noticeCompanysystemAddedit,
  administrativeCarHandle,
  administrativeCarHandleAddedit,
  administrativeCarHandleCheck,
  administrativeWelfare,
  administrativeWelfareAddedit,
  administrativeWelfareCheck,
  administrativeCost,
  administrativeCostAddedit,
  administrativeCostDetail,
  administrativeOfficeSupplies,
  administrativeOfficeSuppliesAddedit,
  administrativeFixedAssets,
  administrativeFixedAssetsAddedit,
  administrativeLeader,
  administrativeLeaderAddedit,
  bizYellowList,
  bizYellowListAddEdit,
  bizYellowListPayCost,
  bizYellowListPayCompensate,
  bizUserRedemption,
  bizUserRedemptionAddEdit,
  bizUserRedemptionApplyRedeem,
  bizUserRedemptionCheckDirector,
  bizUserRedemptionCheckFinance,
  carloanfinancePointreturn,
  carloanfinancePointreturnAddedit,
  carloanfinancePointreturnReturn,
  basisInsuranceCompany,
  basisInsuranceCompanyAddedit,
  basisReceivables,
  basisReceivablesAddedit,
  basisIdCardArea,
  basisIdCardAreaAddedit,
  basisProvinceNum,
  basisProvinceNumAddedit,
  basisDealer,
  basisDealerAddedit,
  basisDealerCheck
});
