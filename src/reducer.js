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

//  银行管理 + 详情 + 修改 + 删除 + 支行管理
import { basisBank } from './redux/basis/bank';
import { basisBankAddEdit } from './redux/basis/bank-addedit';
import { basisSubbranch } from './redux/basis/subbranch';
import { basisSubbranchAddEdit } from './redux/basis/subbranch-addedit';

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

//  我司贷款成数比例 + 修改
import { basisLoanPercent } from './redux/basis/loanPercent';
import { basisLoanPercentAddedit } from './redux/basis/loanPercent-addedit';

/**
 * 贷前管理
 */
// 预算单申请
import { loanBudget } from './redux/loan/budget';
import { loanBudgetAddedit } from './redux/loan/budget-addedit';

// 贷款审查
import { loanBudgetCheck } from './redux/loan/budgetCheck';

// 发起征信查询
import { loanCreditStart } from './redux/loan/creditStart';
import { loanCreditStartAddedit } from './redux/loan/creditStart-addedit';

// 征信录入
import { loanCreditEntering } from './redux/loan/creditEntering';

// 准入审查
import { loanCreditCheck } from './redux/loan/creditCheck';

//  发起垫资 + 详情 + 确认用款单 + 区域总经理审查 + 省分公司总经理审查 + 申请撤销
import { loanAdvMoney } from './redux/loan/advMoney';
import { loanAdvMoneyAddedit } from './redux/loan/advMoney-addedit';
import { loanAdvMoneyApply } from './redux/loan/advMoney-apply';
import { loanAdvMoneyAreaCheck } from './redux/loan/advMoney-areaCheck';
import { loanAdvMoneyCompCheck } from './redux/loan/advMoney-compCheck';
import { loanAdvMoneyRevoke } from './redux/loan/advMoney-revoke';

//  垫资审核 + 总公司制单 + 分公司制单 + 确认打款车行 + 确认打款分公司
import { loanMoneyCheck } from './redux/loan/moneyCheck';
import { loanMoneyCheckAllBill } from './redux/loan/moneyCheck-allBill';
import { loanMoneyCheckCompBill } from './redux/loan/moneyCheck-compBill';
import { loanMoneyCheckPayCar } from './redux/loan/moneyCheck-payCar';
import { loanMoneyCheckPayComp } from './redux/loan/moneyCheck-payComp';

//  放款审核 + 详情 + 确认提交银行 + 确认收款
import { loanBankMoney } from './redux/loan/bankMoney';
import { loanBankMoneyAddedit } from './redux/loan/bankMoney-addedit';
import { loanBankMoneyApply } from './redux/loan/bankMoney-apply';
import { loanBankMoneyReceive } from './redux/loan/bankMoney-receive';

//  车辆抵押 + 详情 + 确认提交银行 + 抵押完成
import { loanMortgage } from './redux/loan/mortgage';
import { loanMortgageAddedit } from './redux/loan/mortgage-addedit';
import { loanMortgageApply } from './redux/loan/mortgage-apply';

//  车贷入档 + 详情 + 入档补录
import { loaNarchives } from './redux/loan/archives';
import { loaNarchivesAddedit } from './redux/loan/archives-addedit';
import { loaNarchivesEnter } from './redux/loan/archives-enter';

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
import { loanstoolsMisInvoiceCheckTwo } from './redux/loanstools/misInvoice-checkTwo';
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
 * 贷前工具
 */

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
//  代偿预算单 + 详情 + 申请 + 财务经理审核 + 制单
import { postloantoolsBudget } from './redux/postloantools/budget';
import { postloantoolsBudgetAddEdit } from './redux/postloantools/budget-addedit';
import { postloantoolsBudgetApply } from './redux/postloantools/budget-apply';
import { postloantoolsBudgetCheck } from './redux/postloantools/budget-check';
import { postloantoolsBudgetMakebill } from './redux/postloantools/budget-makebill';

//  代偿审核 + 详情 + 审核 + 确认放款
import { postloantoolsCompensatory } from './redux/postloantools/compensatory';
import { postloantoolsCompensatoryAddEdit } from './redux/postloantools/compensatory-addedit';
import { postloantoolsCompensatoryCheck } from './redux/postloantools/compensatory-check';
import { postloantoolsBudgetCertain } from './redux/postloantools/compensatory-certain';

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
  bizArchives,
  bizArchivesAddEdit,
  bizArchivesCertain,
  bizredList,
  bizredListAddEdit,
  bizredListApply,
  bizredListCheck,
  bizredListPay,
  bizredListEnter,
  loanBudget,
  loanBudgetAddedit,
  loanBudgetCheck,
  loanCreditStart,
  loanCreditStartAddedit,
  loanCreditEntering,
  loanCreditCheck,
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
  loanstoolsMisInvoiceCheckTwo,
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
  bizTrailer,
  bizTrailerAddEdit,
  bizTrailerDispose,
  transmit,
  transmitAddedit,
  transmitSend,
  transmitCheck,
  postloantoolsBudget,
  postloantoolsBudgetAddEdit,
  postloantoolsBudgetApply,
  postloantoolsBudgetCheck,
  postloantoolsBudgetMakebill,
  postloantoolsCompensatory,
  postloantoolsCompensatoryAddEdit,
  postloantoolsCompensatoryCheck,
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
  basisDealerCheck,
  basisLoanPercent,
  basisLoanPercentAddedit,
  basisBank,
  basisBankAddEdit,
  loanBankMoney,
  loanBankMoneyAddedit,
  loanBankMoneyApply,
  loanBankMoneyReceive,
  loanMortgage,
  loanMortgageAddedit,
  loanMortgageApply,
  loaNarchives,
  loaNarchivesAddedit,
  loaNarchivesEnter,
  basisSubbranch,
  basisSubbranchAddEdit,
  loanAdvMoney,
  loanAdvMoneyAddedit,
  loanAdvMoneyApply,
  loanAdvMoneyAreaCheck,
  loanAdvMoneyCompCheck,
  loanAdvMoneyRevoke,
  loanMoneyCheck,
  loanMoneyCheckAllBill,
  loanMoneyCheckCompBill,
  loanMoneyCheckPayCar,
  loanMoneyCheckPayComp
});
