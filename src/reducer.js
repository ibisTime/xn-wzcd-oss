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
// 银行返点菜单
import { financeRebate } from '@redux/finance/rebate';
import { financeRebateAddEdit } from '@redux/finance/rebate-addedit';

// 预打款统计
import { financePrepayment } from '@redux/finance/prepayment';
import { financePrepaymentAddEdit } from '@redux/finance/prepayment-addedit';

// 今日已垫资
import { financeFunded } from '@redux/finance/funded';

// 履约保证金开票
import { financeInvoice } from '@redux/finance/invoice';

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

//  还款中客户 + 详情 + 还款计划 + 提前还款
import { repayments } from './redux/biz/repayments/repayments';
import { repaymentsAddEdit } from './redux/biz/repayments/repayments-addedit';
import { repaymentsPlan } from './redux/biz/repayments/repayments-plan';
import { repaymentsPay } from './redux/biz/repayments/repayments-pay';

//  逾期客户汇总 + 详情 + 还款计划
import { summary } from './redux/biz/summary/summary';
import { summaryAddEdit } from './redux/biz/summary/summary-addedit';
import { summaryPlan } from './redux/biz/summary/summary-plan';

//  当月还款账单 + 详情
import { bizRefundList } from './redux/biz/refundList';
import { bizRefundListAddedit } from './redux/biz/refundList-addedit';

//  逾期名单 + 详情 + 录入催收过程 + 录入催收结果 + 催收记录 + 催收记录催收过程详情 + 催收记录催收结果详情
import { bizOverdueList } from './redux/biz/overdueList/overdueList';
import { bizOverdueListDispose } from './redux/biz/overdueList/overdueList-dispose';
import { bizOverdueListProcess } from './redux/biz/overdueList/overdueList-process';
import { bizOverdueListResult } from './redux/biz/overdueList/overdueList-result';
import { bizOverdueListApply } from './redux/biz/overdueList/overdueList-apply';
import { bizOverdueListRecord } from './redux/biz/overdueList/overdueList-record';
import { bizOverdueListProcessAddedit } from './redux/biz/overdueList/overdueList-processAddedit';
import { bizOverdueListResultAddedit } from './redux/biz/overdueList/overdueList-resultAddedit';

//  白名单 + 详情
import { bizWhiteList } from './redux/biz/whiteList/whiteList';
import { bizWhiteListAddEdit } from './redux/biz/whiteList/whiteList-addedit';

//  绿名单 + 详情 + 缴纳清收成本
import { bizGreenList } from './redux/biz/greenList';
import { bizGreenListAddedit } from './redux/biz/greenList-addedit';
import { bizGreenListPayment } from './redux/biz/greenList-payment';

//  黄名单 + 详情 + 缴纳清收成本 + 缴纳代偿款
import { bizYellowList } from './redux/biz/yellowList';
import { bizYellowListAddEdit } from './redux/biz/yellowList-addedit';
import { bizYellowListPayCost } from './redux/biz/yellowList-payCost';
import { bizYellowListPayCompensate } from './redux/biz/yellowList-payCompensate';

//  黑名单 + 详情
import { bizBlackList } from './redux/biz/blackList';
import { bizBlackListAddedit } from './redux/biz/blackList-addedit';
import { bizBlackListDispose } from './redux/biz/blackList-dispose';

//  红名单 + 详情 + 风控经理审核 + 分公司总经理审核 + 风控总监审核 + 财务经理审核 + 申请收车 + 财务打款 + 录入收车结果
import { bizredList } from './redux/biz/redList';
import { bizredListAddEdit } from './redux/biz/redList-addedit';
import { bizredListApply } from './redux/biz/redList-apply';
import { bizredListCheckDirector } from './redux/biz/redList-checkDirector';
import { bizredListCompCheck } from './redux/biz/redList-compCheck';
import { bizredListCheckDirectorTwo } from './redux/biz/redList-checkDirectorTwo';
import { bizredListFinance } from './redux/biz/redList-finance';
import { bizredListPay } from './redux/biz/redList-pay';
import { bizredListEnter } from './redux/biz/redList-enter';

//  收车管理 + 详情 + 处理结果
import { bizTrailer } from './redux/biz/trailer';
import { bizTrailerAddEdit } from './redux/biz/trailer-addedit';
import { bizTrailerDispose } from './redux/biz/trailer-dispose';
import { bizTrailerFinance } from './redux/biz/trailer-finance';
import { bizTrailerCashier } from './redux/biz/trailer-cashier';

//  司法诉讼 + 详情 + 司法诉讼 + 案件受理 + 财务审核 + 出纳打款 + 送达 +  判决 + 生效
import { bizLitigation } from './redux/biz/litigation/litigation';
import { bizLitigationAddEdit } from './redux/biz/litigation/litigation-addedit';
import { bizLitigationLitigation } from './redux/biz/litigation/litigation-litigation';
import { bizLitigationAcceptance } from './redux/biz/litigation/litigation-acceptance';
import { bizLitigationFinance } from './redux/biz/litigation/litigation-finance';
import { bizLitigationCashier } from './redux/biz/litigation/litigation-cashier';
import { bizLitigationService } from './redux/biz/litigation/litigation-service';
import { bizLitigationJudgment } from './redux/biz/litigation/litigation-judgment';
import { bizLitigationTakeEffect } from './redux/biz/litigation/litigation-takeEffect';

//  执行案件 + 详情 + 申请执行 + 案件受理 + 拍卖 + 公告 + 执行结果 + 财务确认收款 + 录入查封裁定到期时间
import { bizImplementCase } from './redux/biz/implementCase/implementCase';
import { bizImplementCaseAddEdit } from './redux/biz/implementCase/implementCase-addedit';
import { bizImplementCaseApply } from './redux/biz/implementCase/implementCase-apply';
import { bizImplementCaseAcceptance } from './redux/biz/implementCase/implementCase-acceptance';
import { bizImplementCaseAuction } from './redux/biz/implementCase/implementCase-auction';
import { bizImplementCaseNotice } from './redux/biz/implementCase/implementCase-notice';
import { bizImplementCaseResult } from './redux/biz/implementCase/implementCase-result';
import { bizImplementCaseFinance } from './redux/biz/implementCase/implementCase-finance';
import { bizImplementCaseEnter } from './redux/biz/implementCase/implementCase-enter';

//  恢复执行案件 + 详情 + 申请执行 + 案件受理 + 拍卖 + 公告 + 执行结果 + 财务确认收款 + 录入查封裁定到期时间
import { bizRecoveryImplementCase } from './redux/biz/recoveryImplementCase/recoveryImplementCase';
import { bizRecoveryImplementCaseAddEdit } from './redux/biz/recoveryImplementCase/recoveryImplementCase-addedit';
import { bizRecoveryImplementCaseApply } from './redux/biz/recoveryImplementCase/recoveryImplementCase-apply';
import { bizRecoveryImplementCaseAcceptance } from './redux/biz/recoveryImplementCase/recoveryImplementCase-acceptance';
import { bizRecoveryImplementCaseAction } from './redux/biz/recoveryImplementCase/recoveryImplementCase-auction';
import { bizRecoveryImplementCaseNotice } from './redux/biz/recoveryImplementCase/recoveryImplementCase-notice';
import { bizRecoveryImplementCaseResult } from './redux/biz/recoveryImplementCase/recoveryImplementCase-result';
import { bizRecoveryImplementCaseFinance } from './redux/biz/recoveryImplementCase/recoveryImplementCase-finance';
import { bizRecoveryImplementCaseEnter } from './redux/biz/recoveryImplementCase/recoveryImplementCase-enter';

//  结清审核 + 结清申请单 + 审核 + 确认付款
import { bizSettlement } from './redux/biz/settlement';
import { bizSettlementApply } from './redux/biz/settlement-apply';
import { bizSettlementCheck } from './redux/biz/settlement-check';
import { bizSettlementTotalCheck } from './redux/biz/settlement-totalCheck';
import { BizSettlementManager } from './redux/biz/settlement-manager';
import { bizSettlementCertain } from './redux/biz/settlement-certain';

//  公司结清 + 详情 + 录入处理意见
import { bizCompanySettlement } from './redux/biz/companySettlement/companySettlement';
import { bizCompanySettlementAddEdit } from './redux/biz/companySettlement/companySettlement-addedit';
import { bizCompanySettlementEnter } from './redux/biz/companySettlement/companySettlement-enter';

//  解除抵押 + 详情 + 申请 + 风控内勤审核 + 风控主管审核 + 风控总监审核 + 回录
import { mortgages } from './redux/biz/mortgages/mortgages';
import { mortgagesAddEdit } from './redux/biz/mortgages/mortgages-addedit';
import { mortgagesApply } from './redux/biz/mortgages/mortgages-apply';
import { mortgagesInternal } from './redux/biz/mortgages/mortgages-internal';
import { mortgagesCheck } from './redux/biz/mortgages/mortgages-check';
import { mortgagesTotalCheck } from './redux/biz/mortgages/mortgages-totalCheck';
import { mortgagesEnter } from './redux/biz/mortgages/mortgages-enter';

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

//  我司贷款成数比例 + 修改
import { basisLoanPercent } from './redux/basis/loanPercent';
import { basisLoanPercentAddedit } from './redux/basis/loanPercent-addedit';

//  gps提成百分比 + 修改
import { basisGpsextract } from './redux/basis/gpsextract';
import { basisGpsextractAddedit } from './redux/basis/gpsextract-addedit';

//  油补 + 修改
import { basisOilpercentage } from './redux/basis/oilpercentage';
import { basisOilpercentageAddedit } from './redux/basis/oilpercentage-addedit';

//  车贷期数管理 + 修改
import { basisCarloan } from './redux/basis/carloan';
import { basisCarloanAddEdit } from './redux/basis/carloan-addedit';

//  奖金提成配置 + 新增 + 修改 + 删除
import { basisBonusesConfigure } from './redux/basis/bonusesConfigure';
import { basisBonusesConfigureAddedit } from './redux/basis/bonusesConfigure-addedit';

//  车300城市列表
import { basisCities } from './redux/basis/cities';
import { basisCitiesAddedit } from './redux/basis/cities-addedit';
/**
 * 贷前管理
 */
// 预算单申请
import { loanBudget } from './redux/loan/budget';
import { loanBudgetAddedit } from './redux/loan/budget-addedit';
import { loanBudgetApplyExternal } from './redux/loan/budget-applyExternal';
import { loanBudgetDetail } from './redux/loan/budget-detail';
import { loanBudgetValuation } from './redux/loan/budget-valuation';

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
import { loanBankMoneyLoanList } from './redux/loan/bankMoney-loanList';

//  放款审核 + 详情 + 确认提交银行 + 确认收款
import { loanBankMoney } from './redux/loan/bankMoney';
import { loanBankMoneyAddedit } from './redux/loan/bankMoney-addedit';
import { loanBankMoneyApply } from './redux/loan/bankMoney-apply';
import { loanBankMoneyReceive } from './redux/loan/bankMoney-receive';
import { loanBankMoneySendList } from './redux/loan/bankMoney-sendList';

//  车辆抵押 + 详情 + 确认提交银行 + 抵押完成
import { loanMortgage } from './redux/loan/mortgage';
import { loanMortgageAddedit } from './redux/loan/mortgage-addedit';
import { loanMortgageApply } from './redux/loan/mortgage-apply';
import { loanMortgageDone } from './redux/loan/mortgage-done';

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
import { loanstoolsEstimateCheck } from './redux/loanstools/estimate-check';
import { loanstoolsEstimateCertian } from './redux/loanstools/estimate-certain';

//  客户作废 + 详情 + 申请 + 审核 + 确认
import { loanstoolsCancel } from './redux/loanstools/cancel';
import { loanstoolsCancelAddedit } from './redux/loanstools/cancel-addedit';
import { loanstoolsCancelApply } from './redux/loanstools/cancel-apply';
import { loanstoolsCancelCheck } from './redux/loanstools/cancel-check';
import { loanstoolsCancelFinance } from './redux/loanstools/cancel-finance';

//  收回垫资款 + 详情 + 贷款回录
import { loanstoolsTake } from './redux/loanstools/take';
import { loanstoolsTakeAddedit } from './redux/loanstools/take-addedit';
import { loanstoolsTakeEnter } from './redux/loanstools/take-enter';
import { loanstoolsTakeFinance } from './redux/loanstools/take-finance';

//  收回预算款 + 详情 + 打款回录 + 确认收款
import { loanstoolsTakeEstimate } from './redux/loanstools/takeEstimate';
import { loanstoolsTakeEstimateAddedit } from './redux/loanstools/takeEstimate-addedit';
import { loanstoolsTakeEstimateEnter } from './redux/loanstools/takeEstimate-enter';
import { loanstoolsTakeEstimateCertain } from './redux/loanstools/takeEstimate-certain';

//  收回手续费 + 详情 + 收款回录
import { loanstoolsTakeFree } from './redux/loanstools/takeFree';
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

//  返点支付 + 详情 + 制单 + 确认 + 财务审核 + 分公司总经理审核
import { loanstoolsRebates } from './redux/loanstools/rebates';
import { loanstoolsRebatesAddedit } from './redux/loanstools/rebates-addedit';
import { loanstoolsRebatesBill } from './redux/loanstools/rebates-bill';
import { loanstoolsRebatesCertain } from './redux/loanstools/rebates-certain';
import { loanstoolsRebatesFinance } from './redux/loanstools/rebates-finance';
import { loanstoolsRebatesCompanyCheck } from './redux/loanstools/rebates-companyCheck';

//  银行合同 + 导入
import { loanstoolsContract } from './redux/loanstools/contract';
import { loanstoolsContractImport } from './redux/loanstools/contract-import';
import { loanstoolsContractDispose } from './redux/loanstools/contract-dispose';

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
import { postloantoolsCompensatoryCertain } from './redux/postloantools/compensatory-certain';

//  GPS申领 + 详情 + 公司申领 + 个人申领 + 公司审核 + 个人审核
import { postloantoolsApplyGps } from './redux/postloantools/applyGps';
import { postloantoolsApplyGpsAddedit } from './redux/postloantools/applyGps-addedit';
import { postloantoolsApplyGpsCompany } from './redux/postloantools/applyGps-company';
import { postloantoolsApplyGpsPerson } from './redux/postloantools/applyGps-person';
import { postloantoolsApplyGpsCompanyCheck } from './redux/postloantools/applyGps-companyCheck';
import { postloantoolsApplyGpsPersonCheck } from './redux/postloantools/applyGps-personCheck';

//  Gps管理 + 详情
import { postloantoolsManageGps } from './redux/postloantools/manageGps';
import { postloantoolsManageGpsAddedit } from './redux/postloantools/manageGps-addedit';

//   gps个人申领上限
import { postloantoolsManageGpsUpperLimit } from './redux/postloantools/manageGps-UpperLimit';

//  Gps退回 + 详情
import { postloantoolsRegressesGps } from './redux/postloantools/regressesGps';

//  Gps安装 + 详情 + 安装回录 + 回收作废
import { postloantoolsInstallGps } from './redux/postloantools/installGps';
import { postloantoolsInstallGpsAddEdit } from './redux/postloantools/installGps-addedit';
import { postloantoolsInstallGpsEnter } from './redux/postloantools/installGps-enter';
import { postloantoolsInstallGpsToVoid } from './redux/postloantools/installGps-toVoid';

//  导入逾期名单 + 详情 + 导入 + 处理
import { postloantoolsImport } from './redux/postloantools/import';
import { postloantoolsImportAddedit } from './redux/postloantools/import-addedit';
import { postloantoolsImportImport } from './redux/postloantools/import-import';
import { postloantoolsImportDispose } from './redux/postloantools/import-dispose';

//  车辆续保 + 续保
import { postloantoolsInsurance } from './redux/postloantools/insurance';
import { postloantoolsInsuranceContinue } from './redux/postloantools/insurance-continue';

/**
 * 统计分析
 */
import { analysisBalancedetail } from './redux/analysis/balancedetail';
import { analysisInsuranceAmount } from './redux/analysis/insuranceAmount';
import { analysisInsuranceAmountAddedit } from './redux/analysis/insuranceAmount-addedit';
import { analysisReplaceRepay } from './redux/analysis/replaceRepay';
import { analysisOverdueCollection } from './redux/analysis/overdueCollection';
import { analysisRiskCustomers } from './redux/analysis/riskCustomers';
import { analysisCarLoanInstallment } from './redux/analysis/carLoanInstallment';
import { analysisAdvance } from './redux/analysis/advance';
import { analysisBonuses } from './redux/analysis/bonuses';
import { analysisAchievement } from './redux/analysis/achievement';
import { analysisAchievementMonth } from './redux/analysis/achievementMonth';
// 查询分析
import { analysisSchedule } from './redux/analysis/schedule';
import { analysisAdvMoney } from './redux/analysis/advMoney';
import { analysisTablehistory } from './redux/analysis/tablehistory';

/**
 * 人事
 */
// 人事档案 + 详情 + 分公司总经理审批 + 行政部审批 + 网络技术审批
import { personalarchivesParchives } from './redux/personalarchives/parchives';
import { personalarchivesParchivesAddedit } from './redux/personalarchives/parchives-addedit';
import { personalarchivesParchivesApply } from './redux/personalarchives/parchives-apply';
import { personalarchivesParchivesCompanyCheck } from './redux/personalarchives/parchives-companyCheck';
import { personalarchivesParchivesCheck } from './redux/personalarchives/parchives-check';
import { personalarchivesParchivesTechnology } from './redux/personalarchives/parchives-technology';

// 车贷档案
import { loanarchivesLocationcode } from './redux/loanarchives/locationcode';
import { loanarchivesLocationcodeAddedit } from './redux/loanarchives/locationcode-addedit';

// 车贷档案查询
import { loanarchivesArchivesquery } from './redux/loanarchives/archivesquery';
import { loanarchivesArchivesqueryAddedit } from './redux/loanarchives/archivesquery-addedit';

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

// 费用预支申请
import { administrativeGpsSupplier } from './redux/administrative/gpsSupplier';
import { administrativeGpsSupplierAddedit } from './redux/administrative/gpsSupplier-addedit';

// 合同打印
// 担保合同
import { printingGuarantee } from './redux/printing/guarantee';
import { printingGuaranteeMake } from './redux/printing/guarantee-make';

// 抵押合同
import { printingMortgage } from './redux/printing/mortgage';
import { printingMortgageMake } from './redux/printing/mortgage-make';

// 解除抵押
import { printingRelieve } from './redux/printing/relieve';
import { printingRelieveMake } from './redux/printing/relieve-make';

// 合同打印模板
// 担保合同
import { contractTemplateGuarantee } from './redux/contractTemplate/guarantee';
import { contractTemplateGuaranteeAddedit } from './redux/contractTemplate/guarantee-addedit';

// 抵押合同
import { contractTemplateMortgage } from './redux/contractTemplate/mortgage';
import { contractTemplateMortgageAddedit } from './redux/contractTemplate/mortgage-addedit';

// 解除抵押
import { contractTemplateRelieve } from './redux/contractTemplate/relieve';
import { contractTemplateRelieveAddedit } from './redux/contractTemplate/relieve-addedit';

// 历史业务
// 历史业务(已结清)
import { historyHistoryBusiness } from './redux/history/historyBusiness';
import { historyHistoryBusinessAddedit } from './redux/history/historyBusiness-addedit';

// 历史业务(预算单进行中)
import { historyHistorying } from './redux/history/historying';
import { historyHistoryingAddedit } from './redux/history/historying-addedit';

// 历史业务(征信单进行中)
import { historyCredithistory } from './redux/history/credithistory';
import { historyCredithistoryAddedit } from './redux/history/credithistory-addedit';

// 垃圾箱
import { historyDustbin } from './redux/history/dustbin';
import { historyDustbinAddedit } from './redux/history/dustbin-addedit';

// 业务管理-历史业务
import { historyHistoryRecords } from './redux/history/historyRecords';

// 风险名单管理
// 黑名单
import { riskBlackList } from './redux/risk/blackList';
import { riskBlackListAddedit } from './redux/risk/blackList-addedit';

// 绿名单
import { riskGreenList } from './redux/risk/greenList';
import { riskGreenListAddedit } from './redux/risk/greenList-addedit';

// 红名单
import { riskredList } from './redux/risk/redList';
import { riskredListAddedit } from './redux/risk/redList-addedit';

// 黄名单
import { riskYellowList } from './redux/risk/yellowList';
import { riskYellowListAddedit } from './redux/risk/yellowList-addedit';

// 白名单
import { riskWhiteList } from './redux/risk/whiteList';
import { riskWhiteListAddedit } from './redux/risk/whiteList-addedit';

// 资料传送
import { dataReceiveDataSend } from './redux/dataReceive/dataSend';
import { dataReceiveDataSendAddEdit } from './redux/dataReceive/dataSend-addedit';
import { dataReceiveDataSendSend } from './redux/dataReceive/dataSend-send';
import { dataReceiveDataCollect } from './redux/dataReceive/dataCollect';
import { dataReceiveDataCollectAddEdit } from './redux/dataReceive/dataCollect-addedit';
import { dataReceiveDataCollectCollect } from './redux/dataReceive/dataCollect-collect';
import { dataReceiveDataCollectCheck } from './redux/dataReceive/dataCollect-check';

// gps传送
import { gpsReceiveGpsSend } from './redux/gpsReceive/gpsSend';
import { gpsReceiveGpsSendAddEdit } from './redux/gpsReceive/gpsSend-addedit';
import { gpsReceiveGpsSendSend } from './redux/gpsReceive/gpsSend-send';
import { gpsReceiveGpsSendRepair } from './redux/gpsReceive/gpsSend-repair';
import { dataReceiveGpsCollect } from './redux/gpsReceive/gpsCollect';
import { dataReceiveGpsCollectCollect } from './redux/gpsReceive/gpsCollect-collect';
import { dataReceiveGpsCollectCheck } from './redux/gpsReceive/gpsCollect-check';

// 二维码制作
import { erweimaErweima } from './redux/erweima/erweima';

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
  bizRefundList,
  bizOverdueList,
  bizGreenList,
  bizBlackList,
  bizHistoryBusinessManage,
  bizCarLoanBusinessCheck,
  bizOverdueListDispose,
  bizOverdueListApply,
  bizOverdueListRecord,
  bizOverdueListProcessAddedit,
  bizOverdueListResultAddedit,
  bizBlackListDispose,
  bizGreenListPayment,
  bizRefundCard,
  bizRefundCardAddedit,
  bizHandleApplyCheck,
  bizHistoricalApply,
  bizHistoricalApplyAddedit,
  bizGreenListAddedit,
  bizRefundListAddedit,
  bizHistoryBusinessManageAddedit,
  bizBlackListAddedit,
  bizredList,
  bizredListAddEdit,
  bizredListApply,
  bizredListCheckDirector,
  bizredListCompCheck,
  bizredListCheckDirectorTwo,
  bizredListFinance,
  bizredListPay,
  bizredListEnter,
  loanBudget,
  loanBudgetAddedit,
  loanBudgetApplyExternal,
  loanBudgetDetail,
  loanBudgetValuation,
  loanBudgetCheck,
  loanCreditStart,
  loanCreditStartAddedit,
  loanCreditEntering,
  loanCreditCheck,
  loanstoolsEstimate,
  loanstoolsEstimateAddEdit,
  loanstoolsEstimateCheck,
  loanstoolsEstimateCertian,
  loanstoolsCancel,
  loanstoolsCancelAddedit,
  loanstoolsCancelApply,
  loanstoolsCancelCheck,
  loanstoolsCancelFinance,
  loanstoolsTake,
  loanstoolsTakeAddedit,
  loanstoolsTakeEnter,
  loanstoolsTakeFinance,
  loanstoolsTakeEstimate,
  loanstoolsTakeEstimateAddedit,
  loanstoolsTakeEstimateEnter,
  loanstoolsTakeEstimateCertain,
  loanstoolsTakeFree,
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
  loanstoolsRebatesFinance,
  loanstoolsRebatesCompanyCheck,
  loanstoolsContract,
  loanstoolsContractImport,
  loanstoolsContractDispose,
  loanstoolsRefund,
  loanstoolsRefundAddedit,
  loanstoolsRefundCertain,
  bizTrailer,
  bizTrailerAddEdit,
  bizTrailerDispose,
  bizTrailerFinance,
  bizTrailerCashier,
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
  postloantoolsCompensatoryCertain,
  postloantoolsApplyGps,
  postloantoolsApplyGpsAddedit,
  postloantoolsApplyGpsCompany,
  postloantoolsApplyGpsPerson,
  postloantoolsApplyGpsCompanyCheck,
  postloantoolsApplyGpsPersonCheck,
  postloantoolsManageGps,
  postloantoolsManageGpsAddedit,
  postloantoolsManageGpsUpperLimit,
  postloantoolsInstallGps,
  postloantoolsInstallGpsAddEdit,
  postloantoolsInstallGpsEnter,
  postloantoolsInstallGpsToVoid,
  bizLitigation,
  bizLitigationAddEdit,
  bizLitigationFinance,
  bizLitigationLitigation,
  bizLitigationAcceptance,
  bizLitigationJudgment,
  bizLitigationTakeEffect,
  bizLitigationCashier,
  bizLitigationService,
  analysisBalancedetail,
  analysisBonuses,
  analysisInsuranceAmount,
  analysisInsuranceAmountAddedit,
  analysisReplaceRepay,
  analysisOverdueCollection,
  analysisRiskCustomers,
  analysisSchedule,
  analysisAdvMoney,
  analysisTablehistory,
  analysisCarLoanInstallment,
  analysisAdvance,
  analysisAchievement,
  analysisAchievementMonth,
  bizHistoryBusinessManageAddeditAddedit,
  bizSettlement,
  bizSettlementApply,
  bizSettlementCheck,
  bizSettlementTotalCheck,
  BizSettlementManager,
  bizSettlementCertain,
  postloantoolsImport,
  postloantoolsImportAddedit,
  postloantoolsImportImport,
  postloantoolsImportDispose,
  bizOverdueListProcess,
  bizOverdueListResult,
  mortgages,
  mortgagesAddEdit,
  mortgagesApply,
  mortgagesInternal,
  mortgagesCheck,
  mortgagesTotalCheck,
  mortgagesEnter,
  personalarchivesParchives,
  personalarchivesParchivesAddedit,
  personalarchivesParchivesApply,
  personalarchivesParchivesCompanyCheck,
  personalarchivesParchivesCheck,
  personalarchivesParchivesTechnology,
  loanarchivesLocationcode,
  loanarchivesLocationcodeAddedit,
  loanarchivesArchivesquery,
  loanarchivesArchivesqueryAddedit,
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
  administrativeGpsSupplier,
  administrativeGpsSupplierAddedit,
  bizYellowList,
  bizYellowListAddEdit,
  bizYellowListPayCost,
  bizYellowListPayCompensate,
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
  basisLoanPercent,
  basisLoanPercentAddedit,
  basisBank,
  basisBankAddEdit,
  basisCities,
  basisCitiesAddedit,
  loanBankMoney,
  loanBankMoneyAddedit,
  loanBankMoneyApply,
  loanBankMoneyReceive,
  loanBankMoneySendList,
  loanMortgage,
  loanMortgageAddedit,
  loanMortgageApply,
  loanMortgageDone,
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
  loanMoneyCheckPayComp,
  loanBankMoneyLoanList,
  repayments,
  repaymentsAddEdit,
  repaymentsPlan,
  repaymentsPay,
  summary,
  summaryAddEdit,
  summaryPlan,
  postloantoolsInsurance,
  postloantoolsInsuranceContinue,
  printingGuarantee,
  printingGuaranteeMake,
  printingMortgage,
  printingMortgageMake,
  printingRelieve,
  printingRelieveMake,
  contractTemplateGuarantee,
  contractTemplateGuaranteeAddedit,
  contractTemplateMortgage,
  contractTemplateMortgageAddedit,
  contractTemplateRelieve,
  contractTemplateRelieveAddedit,
  historyHistoryBusiness,
  historyHistoryBusinessAddedit,
  historyHistorying,
  historyHistoryingAddedit,
  historyCredithistory,
  historyCredithistoryAddedit,
  basisGpsextract,
  basisGpsextractAddedit,
  basisOilpercentage,
  basisOilpercentageAddedit,
  basisCarloan,
  basisCarloanAddEdit,
  basisBonusesConfigure,
  basisBonusesConfigureAddedit,
  bizWhiteList,
  bizWhiteListAddEdit,
  riskBlackList,
  riskBlackListAddedit,
  riskGreenList,
  riskGreenListAddedit,
  riskredList,
  riskredListAddedit,
  riskYellowList,
  riskYellowListAddedit,
  riskWhiteList,
  riskWhiteListAddedit,
  historyDustbin,
  historyDustbinAddedit,
  historyHistoryRecords,
  dataReceiveDataSend,
  dataReceiveDataSendAddEdit,
  dataReceiveDataSendSend,
  dataReceiveDataCollect,
  dataReceiveDataCollectAddEdit,
  dataReceiveDataCollectCollect,
  dataReceiveDataCollectCheck,
  gpsReceiveGpsSend,
  gpsReceiveGpsSendAddEdit,
  gpsReceiveGpsSendSend,
  gpsReceiveGpsSendRepair,
  dataReceiveGpsCollect,
  dataReceiveGpsCollectCollect,
  dataReceiveGpsCollectCheck,
  financeRebate,
  financeRebateAddEdit,
  financePrepayment,
  financePrepaymentAddEdit,
  financeFunded,
  financeInvoice,
  postloantoolsRegressesGps,
  erweimaErweima,
  bizImplementCase,
  bizImplementCaseAddEdit,
  bizImplementCaseApply,
  bizImplementCaseAcceptance,
  bizImplementCaseAuction,
  bizImplementCaseNotice,
  bizImplementCaseResult,
  bizImplementCaseFinance,
  bizImplementCaseEnter,
  bizRecoveryImplementCase,
  bizRecoveryImplementCaseAddEdit,
  bizRecoveryImplementCaseApply,
  bizRecoveryImplementCaseAcceptance,
  bizRecoveryImplementCaseAction,
  bizRecoveryImplementCaseNotice,
  bizRecoveryImplementCaseResult,
  bizRecoveryImplementCaseFinance,
  bizRecoveryImplementCaseEnter,
  bizCompanySettlement,
  bizCompanySettlementAddEdit,
  bizCompanySettlementEnter
});
