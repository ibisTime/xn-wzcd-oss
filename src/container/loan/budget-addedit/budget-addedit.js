import React from 'react';
import {
    getQueryString,
    getUserId,
    showWarnMsg,
    showSucMsg,
    moneyParse,
    moneyFormat,
    moneyUppercase
} from 'common/js/util';
import {CollapseWrapper} from 'component/collapse-detail/collapse-detail';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/budget-addedit';
import { getSystormParam } from 'api/dict';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanBudgetAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BudgetAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdvanceFund: false,
            sfData: null,
            serviceCharge: 0,
            oilSubsidyValue: null,
            gpsDeductValue: null,
            loanPeriodsData: null
        };
        this.code = getQueryString('code', this.props.location.search);
        this.companyCode = getQueryString('companyCode', this.props.location.search);
        this.carCompanyCode = getQueryString('carDealerCode', this.props.location.search);
        this.saleUserId = getQueryString('saleUserId', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        // 申请
        this.isApply = !!getQueryString('isApply', this.props.location.search);
        // 银行利率明细列表
        this.bankRateList = null;
        this.bankRateTypeList = null;
        // 贷款周期
        this.loanPeriodsData = null;
        // 收款账户
        this.receivables = {};
        // 应退按揭款
        this.repointDetailList1 = [];
        // 购车途径
        this.shopWay = true;
    }

    componentDidMount() {
        if (this.isApply) {
            this.props.doFetching();
            Promise.all([
                fetch(632007, {
                    companyCode: this.companyCode,
                    type: 1
                }),
                getSystormParam({key: 'budget_oil_subsidy_rate'}),
                getSystormParam({key: 'budget_gps_deduct_rate'})
            ]).then(([receivablesData, oilSubsidyData, gpsDeductData]) => {
                this.receivables = receivablesData[0];
                this.setState({
                    oilSubsidyValue: oilSubsidyData.cvalue,
                    gpsDeductValue: gpsDeductData.cvalue
                });
                this.props.cancelFetching();
            }).catch(this.props.cancelFetching);
        }
    }

    // 我司贷款成数： 贷款金额 / 发票价格
    getCompanyLoanNum = (params) => {
        let invoicePrice = moneyParse(params.invoicePrice);
        let loanAmount = moneyParse(params.loanAmount);
        let number = 0;

        if (invoicePrice && loanAmount) {
            number = (loanAmount / invoicePrice).toFixed(2);
        } else {
            number = 0;
        }
        return number;
    }

    // 综合利率： 服务费/贷款金额+银行利率
    getGlobalRate = (params) => {
        let fee = moneyParse(params.fee) / 1000;
        let loanAmount = moneyParse(params.loanAmount) / 1000;
        let bankRate = params.bankRate;
        let rate = 0;

        if (fee && loanAmount && bankRate) {
            rate = ((fee / loanAmount) + bankRate).toFixed(2);
        } else {
            rate = 0;
        }
        return rate;
    }

    // 银行贷款成数： (贷款金额+服务费) / 发票价格
    getBankLoanNum = (params) => {
        let fee = moneyParse(params.fee) / 1000;
        let loanAmount = moneyParse(params.loanAmount) / 1000;
        let invoicePrice = moneyParse(params.invoicePrice) / 1000;
        let feeTotal = 0;

        if (fee && loanAmount && invoicePrice) {
            feeTotal = (loanAmount + fee) / invoicePrice;
        } else {
            feeTotal = 0;
        }
        return moneyFormat(feeTotal * 1000);
    }

    // 收客户手续费合计：履约保证金+担保风险金+GPS收费+杂费
    getCustomerFeeTotal = (params) => {
        let lyAmount = moneyParse(params.lyAmount || 0) / 1000;
        let fxAmount = moneyParse(params.fxAmount || 0) / 1000;
        let gpsFee = moneyParse(params.gpsFee || 0) / 1000;
        let otherFee = moneyParse(params.otherFee || 0) / 1000;
        let feeTotal = 0;

        if (lyAmount && fxAmount && gpsFee && otherFee) {
            feeTotal = lyAmount + fxAmount + gpsFee + otherFee;
        } else {
            feeTotal = 0;
        }

        return moneyFormat(feeTotal);
    }

    // 应退按揭款合计 = 贷款金额 - 收客户手续费（按揭款扣）- GPS费（按揭款扣）- 厂家贴息
    getRefundAmount = (params) => {
        let loanAmount = moneyParse(params.loanAmount || this.props.form.getFieldValue('loanAmount') || 0) / 1000;
        let carDealerSubsidy = moneyParse(params.carDealerSubsidy || this.props.form.getFieldValue('carDealerSubsidy') || 0) / 1000;
        let otherFee = moneyParse(this.state.sfData.otherFee || 0) / 1000;
        let gpsFee = moneyParse(this.state.sfData.gpsFee || 0) / 1000;
        let refund = 0;

        let gpsFeeWay = this.props.form.getFieldValue('gpsFeeWay');
        let serviceChargeWay = this.props.form.getFieldValue('fee_way');
        if (gpsFeeWay !== '2') {
            gpsFee = 0;
        }
        if (serviceChargeWay !== '2') {
            otherFee = 0;
        }
        if (loanAmount && carDealerSubsidy) {
            refund = loanAmount - carDealerSubsidy - gpsFee - otherFee;
        }
        return refund;
    }

    // 金额是否正确
    getAmountRules = (v) => {
        return /(^[1-9](,\d{3}|[0-9])*(\.\d{1,2})?$)|([0])/.test(v);
    }

    render() {
        let fields = [{
            title: '预算单信息',
            items: [
                [{
                    title: '客户姓名',
                    field: 'customerName',
                    readonly: true,
                    required: true
                }, {
                    title: '业务编号',
                    field: 'code',
                    readonly: true,
                    required: true
                }, {
                    title: '客户类型',
                    field: 'customerType',
                    type: 'select',
                    data: [{
                        key: '1',
                        value: '个人'
                    }, {
                        key: '2',
                        value: '企业'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }],
                [{
                    title: '汽车经销商',
                    field: 'carDealerCode',
                    type: 'select',
                    pageCode: 632065,
                    params: {
                        curNodeCode: '006_02'
                    },
                    keyName: 'code',
                    valueName: '{{parentGroup.DATA}}-{{abbrName.DATA}}',
                    required: true,
                    onChange: (v, data) => {
                        if (!data) {
                            return;
                        }
                        this.props.doFetching();
                        data.carDealerProtocolList.forEach(d => {
                            if (d.bankCode === this.props.pageData.bankSubbranch.bank.bankCode) {
                                this.setState({
                                    sfData: d,
                                    serviceCharge: this.getCustomerFeeTotal(d)
                                });
                            }
                        });
                    }
                }, {
                    title: '贷款银行',
                    field: 'loanBankName',
                    readonly: true,
                    required: true,
                    formatter: (v, data) => {
                        if (!this.bankRateList && data) {
                            if (!this.bankRateList && data.bankSubbranch) {
                                this.bankRateList = data.bankSubbranch.bank.bankRateList;
                                if (data.loanPeriods && !this.bankRateTypeList) {
                                    let rateList = [];
                                    let loanPeriodsData = [];
                                    let tmpl = {};
                                    this.bankRateList.forEach(item => {
                                        if (item.period === data.loanPeriods) {
                                            rateList.push(item);
                                        }
                                        if (!tmpl[item.period]) {
                                            tmpl[item.period] = item.period;
                                            loanPeriodsData.push({
                                                dkey: item.period,
                                                dvalue: item.period + '期'
                                            });
                                        }
                                    });
                                    this.bankRateTypeList = rateList;
                                    this.loanPeriodsData = loanPeriodsData;
                                    this.props.form.setFieldsValue({
                                        bankRateType: data.bankRate
                                    });
                                }
                            }
                        }
                        return data.bankSubbranch && (data.bankSubbranch.bank.bankName + '-' + data.bankSubbranch.abbrName);
                    }
                }, {
                    title: '厂商指导价',
                    field: 'originalPrice',
                    amount: true,
                    required: true
                }],
                [{
                    title: '车辆型号',
                    field: 'carModel',
                    required: true
                }, {
                    title: '车架号码',
                    field: 'frameNo',
                    required: true
                }, {
                    title: '贷款周期(期)',
                    field: 'loanPeriods',
                    type: 'select',
                    data: this.loanPeriodsData,
                    keyName: 'dkey',
                    valueName: 'dvalue',
                    required: true,
                    onChange: (v, data) => {
                        let rateList = [];
                        this.bankRateList.forEach(item => {
                            if (item.period === v) {
                                rateList.push(item);
                            }
                        });
                        this.bankRateTypeList = rateList;
                        this.props.form.setFieldsValue({
                            bankRate: 0,
                            bankRateType: ''
                        });
                    }
                }, {
                    title: '发票价格',
                    field: 'invoicePrice',
                    amount: true,
                    required: true,
                    onChange: (v) => {
                        this.props.setPageData({
                            ...this.props.pageData,
                            companyLoanCs: this.getCompanyLoanNum({
                                invoicePrice: v,
                                loanAmount: this.props.form.getFieldValue('loanAmount')
                            }),
                            bankLoanCs: this.getBankLoanNum({
                                fee: this.props.form.getFieldValue('fee'),
                                loanAmount: this.props.form.getFieldValue('loanAmount'),
                                invoicePrice: v
                            })
                        });
                    }
                }],
                [{
                    title: '购车途径',
                    field: 'shopWay',
                    type: 'select',
                    key: 'budget_orde_biz_typer',
                    readonly: true,
                    required: true,
                    formatter: (v, data) => {
                        if(v === '2') {
                            this.shopWay = false;
                        }
                        return v;
                    }
                }, {
                    title: '利率类型',
                    field: 'rateType',
                    type: 'select',
                    key: 'rate_type',
                    required: true,
                    onChange: (v, data) => {
                        if (v === '1') {
                            this.props.setPageData({
                                ...this.props.pageData,
                                carDealerSubsidy: 0
                            });
                        }
                    }
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true,
                    required: true,
                    onChange: (v) => {
                        if(!this.getAmountRules(v)) {
                            return false;
                        }
                        // gps提成，油补
                        let oilSubsidy = 0;
                        let gpsDeduct = 0;
                        if (this.getAmountRules(v)) {
                            oilSubsidy = v * 1000 * this.state.oilSubsidyValue;
                            gpsDeduct = v * 1000 * this.state.gpsDeductValue;
                        }
                        this.props.setPageData({
                            ...this.props.pageData,
                            oilSubsidy: oilSubsidy,
                            gpsDeduct: gpsDeduct
                        });

                        // 应退按揭款
                        let gpsFeeWay = this.props.form.getFieldValue('gpsFeeWay');
                        let serviceChargeWay = this.props.form.getFieldValue('fee_way');
                        if (gpsFeeWay && serviceChargeWay && this.props.form.getFieldValue('carDealerSubsidy') && v) {
                            let repointAmount = this.getRefundAmount({
                                loanAmount: v
                            });
                            let repointDetailList1 = [{
                                useMoneyPurpose: '1',
                                repointAmount: repointAmount,
                                repointAmountL: moneyUppercase(repointAmount),
                                companyName: this.receivables.companyCode,
                                accountCode: this.receivables.bankcardNumber,
                                subbranch: this.receivables.subbranch
                            }];

                            this.props.setPageData({
                                ...this.props.pageData,
                                companyLoanCs: this.getCompanyLoanNum({
                                    invoicePrice: this.props.form.getFieldValue('invoicePrice'),
                                    loanAmount: v
                                }),
                                bankLoanCs: this.getBankLoanNum({
                                    fee: this.props.form.getFieldValue('fee'),
                                    loanAmount: v,
                                    invoicePrice: this.props.form.getFieldValue('invoicePrice')
                                }),
                                globalRate: this.getGlobalRate({
                                    fee: this.props.form.getFieldValue('fee'),
                                    loanAmount: v,
                                    bankRate: this.props.form.getFieldValue('bankRate')
                                }),
                                repointDetailList1: repointDetailList1
                            });
                        }
                    }
                }],
                [{
                    title: '是否需要贷前调查',
                    field: 'isSurvey',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }, {
                    title: '银行利率',
                    field: 'bankRateType',
                    type: 'select',
                    data: this.bankRateTypeList,
                    keyName: 'rate',
                    valueName: '{{rate.DATA}}-{{period.DATA}}期',
                    required: true,
                    onChange: (v) => {
                        this.props.form.setFieldsValue({
                            bankRate: v
                        });
                        this.props.setPageData({
                            ...this.props.pageData,
                            globalRate: this.getGlobalRate({
                                fee: this.props.form.getFieldValue('fee'),
                                loanAmount: this.props.form.getFieldValue('loanAmount'),
                                bankRate: v
                            })
                        });
                    }
                }, {
                    field: 'bankRate',
                    required: true
                }],
                [{
                    // 贷款金额 / 发票价格
                    title: '我司贷款成数',
                    field: 'companyLoanCs',
                    readonly: true,
                    required: true
                }, {
                    title: '是否垫资',
                    field: 'isAdvanceFund',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true,
                    onChange: (v) => {
                        if (v === '1') {
                            this.setState({
                                isAdvanceFund: true
                            });
                            this.props.setPageData({
                                ...this.props.pageData,
                                repointDetailList1: this.repointDetailList1
                            });
                        } else {
                            this.setState({
                                isAdvanceFund: false
                            });
                            let gpsFeeWay = this.props.form.getFieldValue('gpsFeeWay');
                            let serviceChargeWay = this.props.form.getFieldValue('fee_way');
                            if (gpsFeeWay && serviceChargeWay && this.props.form.getFieldValue('loanAmount') && this.props.form.getFieldValue('carDealerSubsidy')) {
                                let repointAmount = this.getRefundAmount();
                                let repointDetailList1 = [{
                                    useMoneyPurpose: '1',
                                    repointAmount: repointAmount,
                                    repointAmountL: moneyUppercase(repointAmount),
                                    companyName: this.receivables.companyCode,
                                    accountCode: this.receivables.bankcardNumber,
                                    subbranch: this.receivables.subbranch
                                }];

                                this.props.setPageData({
                                    ...this.props.pageData,
                                    repointDetailList1: repointDetailList1
                                });
                            }
                        }
                    }
                }, {
                    title: '综合利率',
                    field: 'globalRate',
                    readonly: true,
                    required: true
                }],
                [{
                    title: '服务费',
                    field: 'fee',
                    amount: true,
                    required: true,
                    onChange: (v) => {
                        this.props.setPageData({
                            ...this.props.pageData,
                            globalRate: this.getGlobalRate({
                                fee: v,
                                loanAmount: this.props.form.getFieldValue('loanAmount'),
                                bankRate: this.props.form.getFieldValue('bankRate')
                            }),
                            bankLoanCs: this.getBankLoanNum({
                                fee: v,
                                loanAmount: this.props.form.getFieldValue('loanAmount'),
                                invoicePrice: this.props.form.getFieldValue('invoicePrice')
                            })
                        });
                    }
                }, {
                    title: '厂家贴息',
                    field: 'carDealerSubsidy',
                    amount: true,
                    required: true,
                    onChange: (v) => {
                        if(!this.getAmountRules(v)) {
                            return false;
                        }
                        let gpsFeeWay = this.props.form.getFieldValue('gpsFeeWay');
                        let serviceChargeWay = this.props.form.getFieldValue('fee_way');
                        if (gpsFeeWay && serviceChargeWay && this.props.form.getFieldValue('loanAmount') && v) {
                            let repointAmount = this.getRefundAmount({
                                carDealerSubsidy: v
                            });
                            let repointDetailList1 = [{
                                useMoneyPurpose: '1',
                                repointAmount: repointAmount,
                                repointAmountL: moneyUppercase(repointAmount),
                                companyName: this.receivables.companyCode,
                                accountCode: this.receivables.bankcardNumber,
                                subbranch: this.receivables.subbranch
                            }];

                            this.props.setPageData({
                                ...this.props.pageData,
                                repointDetailList1: repointDetailList1
                            });
                        }
                    }
                }, {
                    // (贷款金额+服务费) / 发票价格
                    title: '银行贷款成数',
                    field: 'bankLoanCs',
                    readonly: true,
                    required: true
                }],
                [{
                    title: 'GPS',
                    field: 'budgetOrderGpsList',
                    type: 'o2m',
                    options: {
                        add: true,
                        edit: true,
                        fields: [{
                            title: 'GPS设备号',
                            field: 'code',
                            type: 'select',
                            listCode: 632707,
                            params: {
                                applyStatus: '2',
                                applyUser: this.saleUserId,
                                useStatus: 0
                            },
                            keyName: 'code',
                            valueName: 'gpsDevNo',
                            required: true,
                            onChange: (v, data, props) => {
                                props.setPageData({
                                    gpsDevNo: data.code,
                                    gpsType: data.gpsType
                                });
                            },
                            noVisible: true
                        }, {
                            title: 'GPS设备号',
                            field: 'gpsDevNo',
                            hidden: true
                        }, {
                            title: 'GPS类型',
                            field: 'gpsType',
                            type: 'select',
                            data: [{
                                key: '1',
                                value: '有线'
                            }, {
                                key: '0',
                                value: '无线'
                            }],
                            keyName: 'key',
                            valueName: 'value',
                            hidden: true
                        }, {
                            title: 'GPS安装位置',
                            field: 'gpsLocation',
                            required: true
                        }]
                    }
                }]
            ]
        }, {
            title: '职业及收入情况',
            items: [
                [{
                    title: '申请人就职单位',
                    field: 'applyUserCompany',
                    required: true
                }, {
                    title: '申请人职位',
                    field: 'applyUserDuty',
                    required: true
                }, {
                    title: '申请人共还人关系',
                    field: 'applyUserGhrRelation',
                    type: 'select',
                    key: 'credit_user_relation',
                    readonly: true
                }, {
                    title: '婚姻状况',
                    field: 'marryState',
                    type: 'select',
                    key: 'marry_state',
                    required: true
                }],
                [{
                    title: '申请人月收入',
                    field: 'applyUserMonthIncome',
                    amount: true,
                    required: true
                }, {
                    title: '申请人结息',
                    field: 'applyUserSettleInterest',
                    amount: true,
                    required: true
                }, {
                    title: '申请人余额',
                    field: 'applyUserBalance',
                    amount: true,
                    required: true
                }, {
                    title: '申请人流水是否体现月收入',
                    field: 'applyUserJourShowIncome',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }, {
                    title: '申请人是否打件',
                    field: 'applyUserIsPrint',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    value: '1',
                    readonly: true,
                    required: true
                }],
                [{
                    title: '共还人月收入',
                    field: 'ghMonthIncome',
                    amount: true
                }, {
                    title: '共还人结息',
                    field: 'ghSettleInterest',
                    amount: true
                }, {
                    title: '共还人余额',
                    field: 'ghBalance',
                    amount: true
                }, {
                    title: '共还人流水是否体现月收入',
                    field: 'ghJourShowIncome',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '共还人是否打件',
                    field: 'ghIsPrint',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }],
                [{
                    title: '担保人1月收入',
                    field: 'guarantor1MonthIncome',
                    amount: true
                }, {
                    title: '担保人1结息',
                    field: 'guarantor1SettleInterest',
                    amount: true
                }, {
                    title: '担保人1余额',
                    field: 'guarantor1Balance',
                    amount: true
                }, {
                    title: '担保人1流水是否体现月收入',
                    field: 'guarantor1JourShowIncome',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '担保人1是否打件',
                    field: 'guarantor1IsPrint',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }],
                [{
                    title: '担保人2月收入',
                    field: 'guarantor2MonthIncome',
                    amount: true
                }, {
                    title: '担保人2结息',
                    field: 'guarantor2SettleInterest',
                    amount: true
                }, {
                    title: '担保人2余额',
                    field: 'guarantor2Balance',
                    amount: true
                }, {
                    title: '担保人2流水是否体现月收入',
                    field: 'guarantor2JourShowIncome',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '担保人2是否打件',
                    field: 'guarantor2IsPrint',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }],
                [{
                    title: '其他收入备注',
                    field: 'otherIncomeNote',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }, {
            title: '资产情况',
            items: [
                [{
                    title: '房产证情况',
                    field: 'isHouseProperty',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '无'
                    }, {
                        key: '1',
                        value: '有'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }, {
                    title: '营业执照',
                    field: 'isLicense',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '无'
                    }, {
                        key: '1',
                        value: '有'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }],
                [{
                    title: '房产证',
                    field: 'houseProperty',
                    type: 'img'
                }, {
                    title: '营业执照',
                    field: 'license',
                    type: 'img'
                }],
                [{
                    title: '现有车辆',
                    field: 'carType',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '自有'
                    }, {
                        key: '1',
                        value: '租用'
                    }, {
                        key: '2',
                        value: '无'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '有无驾照',
                    field: 'isDriceLicense',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '无'
                    }, {
                        key: '1',
                        value: '有'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '提供场地证明',
                    field: 'isSiteProve',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '无'
                    }, {
                        key: '1',
                        value: '有'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }],
                [{
                    title: '驾照',
                    field: 'driceLicense',
                    type: 'img'
                }, {
                    title: '场地证明',
                    field: 'siteProve',
                    type: 'img'
                }],
                [{
                    title: '经营场地面积',
                    field: 'siteArea'
                }, {
                    title: '其他资产说明',
                    field: 'otherPropertyNote'
                }]
            ]
        }, {
            title: '其他情况',
            items: [
                [{
                    title: '申请人户籍地',
                    field: 'applyBirthAddress',
                    required: true
                }, {
                    title: '现住地址',
                    field: 'applyNowAddress',
                    required: true
                }, {
                    title: '现住房屋类型',
                    field: 'houseType',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '自有'
                    }, {
                        key: '1',
                        value: '租用'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }],
                [{
                    title: '共还人户籍地',
                    field: 'ghBirthAddress'
                }, {
                    title: '担保人1户籍地',
                    field: 'guarantor1BirthAddress'
                }, {
                    title: '担保人2户籍地',
                    field: 'guarantor2BirthAddress'
                }],
                [{
                    title: '其他情况说明',
                    field: 'otherNote',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }, {
            title: '费用情况',
            items: [
                [{
                    title: '油补公里数',
                    field: 'oilSubsidyKil',
                    required: true
                }, {
                    title: '油补',
                    field: 'oilSubsidy',
                    amount: true,
                    formatter: (v, data) => {
                        let oilSubsidy = v;
                        if (!this.view) {
                            oilSubsidy = data.loanAmount * this.state.oilSubsidyValue;
                        }
                        if (!String(this.props.pageData.oilSubsidy)) {
                            this.props.setPageData({
                                ...this.props.pageData,
                                oilSubsidy: oilSubsidy
                            });
                        }
                        return moneyFormat(oilSubsidy);
                    },
                    readonly: true,
                    required: true
                }],
                [{
                    title: '我司续保',
                    field: 'isPlatInsure',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }, {
                    title: 'GPS提成',
                    field: 'gpsDeduct',
                    amount: true,
                    formatter: (v, data) => {
                        let gpsDeduct = v;
                        if (!this.view) {
                            gpsDeduct = data.loanAmount * this.state.gpsDeductValue;
                        }
                        if (!String(this.props.pageData.gpsDeduct)) {
                            this.props.setPageData({
                                ...this.props.pageData,
                                gpsDeduct: gpsDeduct
                            });
                        }
                        return moneyFormat(gpsDeduct);
                    },
                    readonly: true,
                    required: true
                }],
                [{
                    title: 'GPS收费方式',
                    field: 'gpsFeeWay',
                    type: 'select',
                    key: 'gps_fee_way',
                    required: true,
                    onChange: (v) => {
                        let gpsFeeWay = v;
                        let serviceChargeWay = this.props.form.getFieldValue('fee_way');
                        if (gpsFeeWay && serviceChargeWay && this.props.form.getFieldValue('loanAmount') && this.props.form.getFieldValue('carDealerSubsidy')) {
                            let repointAmount = this.getRefundAmount();
                            let repointDetailList1 = [{
                                useMoneyPurpose: '1',
                                repointAmount: repointAmount,
                                repointAmountL: moneyUppercase(repointAmount),
                                companyName: this.receivables.companyCode,
                                accountCode: this.receivables.bankcardNumber,
                                subbranch: this.receivables.subbranch
                            }];

                            this.props.setPageData({
                                ...this.props.pageData,
                                repointDetailList1: repointDetailList1
                            });
                        }
                    }
                }, {
                    title: '手续费收取方式',
                    field: 'serviceChargeWay',
                    type: 'select',
                    key: 'fee_way',
                    required: true,
                    onChange: (v) => {
                        let gpsFeeWay = this.props.form.getFieldValue('gpsFeeWay');
                        let serviceChargeWay = v;
                        if (gpsFeeWay && serviceChargeWay && this.props.form.getFieldValue('loanAmount') && this.props.form.getFieldValue('carDealerSubsidy')) {
                            let repointAmount = this.getRefundAmount();
                            let repointDetailList1 = [{
                                useMoneyPurpose: '1',
                                repointAmount: repointAmount,
                                repointAmountL: moneyUppercase(repointAmount),
                                companyName: this.receivables.companyCode,
                                accountCode: this.receivables.bankcardNumber,
                                subbranch: this.receivables.subbranch
                            }];

                            this.props.setPageData({
                                ...this.props.pageData,
                                repointDetailList1: repointDetailList1
                            });
                        }
                    }
                }],
                [{
                    title: '应退按揭款',
                    field: 'repointDetailList1',
                    required: true,
                    type: 'o2m',
                    options: {
                        edit: !this.state.isAdvanceFund,
                        fields: [{
                            title: '用款用途',
                            field: 'useMoneyPurpose',
                            type: 'select',
                            data: [{
                                key: '1',
                                value: '应退按揭款'
                            }, {
                                key: '2',
                                value: '协议内返点'
                            }, {
                                key: '3',
                                value: '协议外返点'
                            }],
                            keyName: 'key',
                            valueName: 'value',
                            value: '1',
                            readonly: true
                        }, {
                            title: '金额小写',
                            field: 'repointAmount',
                            amount: true,
                            required: true
                        }, {
                            title: '金额大写',
                            field: 'repointAmountL',
                            readonly: true,
                            noVisible: true,
                            required: true
                        }, {
                            title: '单位名称',
                            field: 'companyName',
                            readonly: true,
                            required: true
                        }, {
                            title: '账号',
                            field: 'accountCode',
                            type: 'select',
                            listCode: 632007,
                            params: {
                                type: 2,
                                companyCode: this.carCompanyCode
                            },
                            keyName: 'bankcardNumber',
                            valueName: '{{bankcardNumber.DATA}}-{{subbranch.DATA}}',
                            onChange: (v, data, props) => {
                                console.log(props);
                                v && props.setPageData({
                                    companyName: data.companyCode,
                                    subbranch: data.subbranch
                                });
                            },
                            required: true
                        }, {
                            title: '开户行',
                            field: 'subbranch',
                            readonly: true,
                            required: true
                        }]
                    }
                }],
                [{
                    title: '协议外返点',
                    field: 'repointDetailList3',
                    type: 'o2m',
                    options: {
                        add: true,
                        delete: true,
                        fields: [{
                            title: '用款用途',
                            field: 'useMoneyPurpose1',
                            type: 'select',
                            data: [{
                                key: '1',
                                value: '应退按揭款'
                            }, {
                                key: '2',
                                value: '协议内返点'
                            }, {
                                key: '3',
                                value: '协议外返点'
                            }],
                            keyName: 'key',
                            valueName: 'value',
                            value: '3',
                            readonly: true,
                            required: true,
                            formatter: (v, data) => {
                                return data.useMoneyPurpose;
                            }
                        }, {
                            title: '金额小写',
                            field: 'repointAmount1',
                            amount: true,
                            required: true,
                            onChange: (v, data, props) => {
                                let amountL = '';
                                if (v) {
                                    amountL = moneyUppercase(v);
                                }
                                props.setPageData({
                                    repointAmountL: amountL
                                });
                            },
                            formatter: (v, data) => {
                                return data.repointAmount;
                            }
                        }, {
                            title: '金额大写',
                            field: 'repointAmountL1',
                            required: true,
                            readonly: true,
                            noVisible: true,
                            formatter: (v, data) => {
                                return data.repointAmountL;
                            }
                        }, {
                            title: '户名',
                            field: 'companyName1',
                            required: true,
                            formatter: (v, data) => {
                                return data.companyName;
                            }
                        }, {
                            title: '账号',
                            field: 'accountCode1',
                            bankCard: true,
                            required: true,
                            formatter: (v, data) => {
                                return data.accountCode;
                            }
                        }, {
                            title: '开户行',
                            field: 'subbranch1',
                            required: true,
                            formatter: (v, data) => {
                                return data.subbranch;
                            }
                        }]
                    }
                }]
            ]
        }, {
            title: '贷款材料',
            items: [
                [{
                    title: '结婚证(离婚证)',
                    field: 'marryDivorce',
                    type: 'img'
                }, {
                    title: '户口本(主贷本人页)',
                    field: 'applyUserHkb',
                    type: 'img'
                }],
                [{
                    title: '银行流水',
                    field: 'bankBillPdf',
                    type: 'img'
                }, {
                    title: '单身证明',
                    field: 'singleProvePdf',
                    type: 'img'
                }],
                [{
                    title: '收入证明',
                    field: 'incomeProvePdf',
                    type: 'img'
                }, {
                    title: '居住证明',
                    field: 'liveProvePdf',
                    type: 'img'
                }],
                [{
                    title: '购房发票',
                    field: 'houseInvoice',
                    type: 'img'
                }, {
                    title: '自建房证明',
                    field: 'buildProvePdf',
                    type: 'img'
                }],
                [{
                    title: '户口本（首页）',
                    field: 'hkbFirstPage',
                    type: 'img'
                }, {
                    title: '户口本（户主页）',
                    field: 'hkbMainPage',
                    type: 'img'
                }],
                [{
                    title: '担保人1身份证',
                    field: 'guarantor1IdNo',
                    type: 'img'
                }, {
                    title: '担保人1户口本',
                    field: 'guarantor1Hkb',
                    type: 'img'
                }],
                [{
                    title: '担保人2身份证',
                    field: 'guarantor2IdNo',
                    type: 'img'
                }, {
                    title: '担保人2户口本',
                    field: 'guarantor2Hkb',
                    type: 'img'
                }],
                [{
                    title: '共还人户口本',
                    field: 'ghHkb',
                    type: 'img'
                }]
            ]
        }, {
            title: '家访材料',
            items: [
                [{
                    title: '小区外观',
                    field: 'housePic',
                    type: 'img'
                }, {
                    title: '单元楼照片',
                    field: 'houseUnitPic',
                    type: 'img'
                }],
                [{
                    title: '门牌照片',
                    field: 'houseDoorPic',
                    type: 'img'
                }, {
                    title: '客厅照片',
                    field: 'houseRoomPic',
                    type: 'img'
                }],
                [{
                    title: '主贷与住宅合影',
                    field: 'houseCustomerPic',
                    type: 'img'
                }, {
                    title: '签约员与客户合影',
                    field: 'houseSaleCustomerPic',
                    type: 'img'
                }]
            ]
        }, {
            title: '企业照片',
            items: [
                [{
                    title: '企业名称照片',
                    field: 'companyNamePic',
                    type: 'img'
                }, {
                    title: '办公场地照片',
                    field: 'companyPlacePic',
                    type: 'img'
                }],
                [{
                    title: '生产车间照片',
                    field: 'companyWorkshopPic',
                    type: 'img'
                }, {
                    title: '签约员与客户合影',
                    field: 'companySaleCustomerPic',
                    type: 'img'
                }]
            ]
        }, {
            title: '二手车照片',
            hidden: this.shopWay,
            items: [
                [{
                    title: '合格证',
                    field: 'secondHgz',
                    type: 'img'
                }, {
                    title: '里程表',
                    field: 'secondOdometer',
                    type: 'img'
                }],
                [{
                    title: '车前正面照',
                    field: 'secondCarFrontPic',
                    type: 'img'
                }, {
                    title: '中控台',
                    field: 'secondConsolePic',
                    type: 'img'
                }],
                [{
                    title: '车300评估页',
                    field: 'second300Pdf',
                    type: 'img'
                }, {
                    title: '汽修宝截图',
                    field: 'secondQxbPic',
                    type: 'img'
                }],
                [{
                    title: '车内饰',
                    field: 'secondCarInPic',
                    type: 'img'
                }, {
                    title: '铭牌',
                    field: 'secondNumber',
                    type: 'img'
                }]
            ]
        }, {
            title: '其他材料',
            items: [
                [{
                    title: '附件',
                    field: 'otherFilePdf',
                    type: 'img'
                }],
                [{
                    title: '备注事项',
                    field: 'otherApplyNote',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }];

        let buttons = [];

        if (this.isRevoke) {
            let revokeFields = [{
                title: '撤销理由',
                field: 'cancelReason',
                type: 'textarea',
                normalArea: true,
                readonly: false,
                required: true
            }];
            fields = fields.concat(revokeFields);
            buttons = [{
                title: '撤销',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.cancelReason = params.cancelReason;
                    data.operator = getUserId();
                    let bizCode = 632125;
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }

        let checkFields = [{
            field: 'approveNote',
            title: '审核说明',
            type: 'textarea',
            normalArea: true,
            readonly: false
        }];

        if (this.isAreaCheck || this.isCompCheck || this.isCheck) {
            fields = fields.concat(checkFields);

            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveNote = params.approveNote;
                    data.approveResult = '1';
                    data.operator = getUserId();
                    let bizCode;
                    if (this.isAreaCheck) {
                        bizCode = 632122;
                    } else if (this.isCompCheck) {
                        bizCode = 632123;
                    } else if (this.isCheck) {
                        bizCode = 632124;
                    }
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.approveNote = params.approveNote;
                    data.approveResult = '0';
                    data.operator = getUserId();
                    let bizCode;
                    if (this.isAreaCheck) {
                        bizCode = 632122;
                    } else if (this.isCompCheck) {
                        bizCode = 632123;
                    } else if (this.isCheck) {
                        bizCode = 632124;
                    }
                    this.props.doFetching();
                    fetch(bizCode, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }

        if (this.isApply) {
            buttons = [{
                title: '保存',
                check: true,
                handler: (data) => {
                    data.type = '1';
                    data.dealType = '0';
                    data.budgetOrderCode = this.code;
                    data.operator = getUserId();
                    data.gpsList = data.budgetOrderGpsList;

                    let repointDetailList = [];
                    if (data.repointDetailList1) {
                        repointDetailList = repointDetailList.concat(data.repointDetailList1);
                    }
                    if (data.repointDetailList3) {
                        repointDetailList = repointDetailList.concat(data.repointDetailList3);
                    }
                    delete data.repointDetailList1;
                    delete data.repointDetailList3;
                    data.repointDetailList = repointDetailList;
                    data.bankLoanCs = this.props.pageData.bankLoanCs;
                    data.globalRate = this.props.pageData.globalRate;
                    data.companyLoanCs = this.props.pageData.companyLoanCs;
                    data.gpsDeduct = this.props.pageData.gpsDeduct;
                    data.oilSubsidy = this.props.pageData.oilSubsidy;
                    this.props.doFetching();
                    fetch(632120, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
                }
            }, {
                title: '申请',
                check: true,
                handler: (data) => {
                    data.type = '1';
                    data.dealType = '1';
                    data.budgetOrderCode = this.code;
                    data.operator = getUserId();
                    data.gpsList = data.budgetOrderGpsList;
                    delete data.budgetOrderGpsList;
                    let repointDetailList = [];
                    if (data.repointDetailList1) {
                        repointDetailList = repointDetailList.concat(data.repointDetailList1);
                    }
                    repointDetailList = repointDetailList.concat(data.repointDetailList2);
                    if (data.repointDetailList3) {
                        repointDetailList = repointDetailList.concat(data.repointDetailList3);
                    }
                    delete data.repointDetailList1;
                    delete data.repointDetailList3;
                    data.repointDetailList = repointDetailList;
                    data.bankLoanCs = this.props.pageData.bankLoanCs;
                    data.globalRate = this.props.pageData.globalRate;
                    data.companyLoanCs = this.props.pageData.companyLoanCs;
                    data.gpsDeduct = this.props.pageData.gpsDeduct;
                    data.oilSubsidy = this.props.pageData.oilSubsidy;
                    this.props.doFetching();
                    fetch(632120, data).then(() => {
                        this.props.cancelFetching();
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(() => {
                        this.props.cancelFetching();
                    });
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: buttons
        });
    }
}

export default BudgetAddedit;
