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
} from '@redux/loan/budget-detail';
import { getSystormParam } from 'api/dict';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanBudgetDetail,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BudgetDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdvanceFund: false,
            sfData: null,
            sfDataFetch: false,
            oilSubsidyValue: null,
            gpsDeductValue: null
        };
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        // 撤销
        this.isRevoke = !!getQueryString('isRevoke', this.props.location.search);
        // 区域总经理审查
        this.isAreaCheck = !!getQueryString('isAreaCheck', this.props.location.search);
        // 分公司总经理审查
        this.isCompCheck = !!getQueryString('isCompCheck', this.props.location.search);
        // 二审
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        // 银行利率明细列表
        this.bankRateList = null;
        // 购车途径
        this.shopWay = true;
    }

    render() {
        let o2mFields = [{
            title: '姓名',
            field: 'userName',
            nowrap: true,
            required: true,
            width: 80
        }, {
            title: '与借款人关系',
            field: 'relation',
            type: 'select',
            key: 'credit_user_relation',
            required: true
        }, {
            title: '贷款角色',
            field: 'loanRole',
            type: 'select',
            key: 'credit_user_loan_role',
            required: true
        }, {
            title: '手机号',
            field: 'mobile',
            required: true,
            render: (v) => {
                let val = (v && v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证号',
            field: 'idNo',
            idCard: true,
            required: true,
            render: (v) => {
                let val = (v && v.replace(/^(\d{6}).+(\d{4})$/, '$1****$2')) || '';
                return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
            }
        }, {
            title: '身份证正面',
            field: 'idNoFront',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '身份证反面',
            field: 'idNoReverse',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '征信查询授权书',
            field: 'authPdf',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '面签照片',
            field: 'interviewPic',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '贷款抵押笔数',
            field: 'dkdyCount',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款抵押贷款余额',
            field: 'dkdyAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款抵押近两年逾期次数',
            field: 'dkdy2YearOverTimes',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款抵押最高逾期金额',
            field: 'dkdyMaxOverAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款抵押当前逾期金额',
            field: 'dkdyCurrentOverAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款抵押近6个月平均月还款额',
            field: 'dkdy6MonthAvgAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款信用未结清贷款笔数',
            field: 'hkxyUnsettleCount',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款信用未结清贷款余额',
            field: 'hkxyUnsettleAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款信用近两年逾期次数',
            field: 'hkxy2YearOverTimes',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款信用单月最高逾期金额',
            field: 'hkxyMonthMaxOverAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款信用当前逾期金额',
            field: 'hkxyCurrentOverAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '贷款信用近6个月平均月还款额',
            field: 'hkxy6MonthAvgAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '信用卡张数',
            field: 'xykCount',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '信用卡授信总额',
            field: 'xykCreditAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '信用卡近6个月使用额',
            field: 'xyk6MonthUseAmount',
            amount: true,
            noVisible: true
        }, {
            title: '信用卡近两年逾期次数',
            field: 'xyk2YearOverTimes',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '信用卡单月最高逾期金额',
            field: 'xykMonthMaxOverAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '信用卡当前逾期金额',
            field: 'xykCurrentOverAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '对外担保笔数',
            field: 'outGuaranteesCount',
            number: true,
            required: true,
            noVisible: true
        }, {
            title: '对外担保余额',
            field: 'outGuaranteesAmount',
            amount: true,
            required: true,
            noVisible: true
        }, {
            title: '对外担保备注',
            field: 'outGuaranteesRemark',
            required: true,
            noVisible: true
        }, {
            title: '法院网查询结果',
            field: 'courtNetworkResults',
            type: 'textarea',
            normalArea: true,
            required: true,
            readonly: !this.isCheckFirst,
            hidden: !this.view,
            noVisible: true
        }];

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
                    valueName: '{{parentGroup.DATA}}-{{abbrName.DATA}}'
                }, {
                    title: '贷款银行',
                    field: 'loanBankName'
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
                    key: 'loan_period',
                    required: true
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
                    title: '发票价格',
                    field: 'invoicePrice',
                    amount: true,
                    required: true
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true,
                    required: true
                }],
                [{
                    title: '利率类型',
                    field: 'rateType',
                    type: 'select',
                    key: 'rate_type',
                    required: true
                }, {
                    title: '银行利率',
                    field: 'bankRate',
                    formatter: (v, d) => {
                      return (d.bankRate * 100).toFixed(4) + '%';
                    },
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
                    required: true
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
                    required: true
                }, {
                    title: '厂家贴息',
                    field: 'carDealerSubsidy',
                    amount: true,
                    required: true
                }, {
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
                        detail: true,
                        fields: [{
                            title: 'GPS',
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
                            noVisible: true,
                            onChange: (v, data, props) => {
                                props.setPageData({
                                    gpsDevNo: data.gpsDevNo,
                                    gpsType: data.gpsType
                                });
                            }
                        }, {title: 'GPS设备号',
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
                            field: 'azLocation',
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
                    key: 'credit_user_relation'
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
                        value: '无'
                    }, {
                        key: '1',
                        value: '自有'
                    }, {
                        key: '2',
                        value: '租用'
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
                    valueName: 'value',
                    required: true
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
            title: '紧急联系人',
            items: [
                [{
                    field: 'emergencyName1',
                    title: '联系人1姓名',
                    required: true
                }, {
                    field: 'emergencyRelation1',
                    title: '与申请人关系',
                    type: 'select',
                    key: 'credit_user_relation',
                    required: true
                }, {
                    field: 'emergencyMobile1',
                    title: '手机号码',
                    mobile: true,
                    required: true
                }],
                [{
                    field: 'emergencyName2',
                    title: '联系人2姓名'
                }, {
                    field: 'emergencyRelation2',
                    title: '与申请人关系',
                    type: 'select',
                    key: 'credit_user_relation'
                }, {
                    field: 'emergencyMobile2',
                    title: '手机号码',
                    mobile: true
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
                    required: true
                }],
                [{
                    title: 'GPS收费方式',
                    field: 'gpsFeeWay',
                    type: 'select',
                    key: 'gps_fee_way',
                    required: true
                }, {
                    title: '收客户手续费收取方式',
                    field: 'serviceChargeWay',
                    type: 'select',
                    key: 'fee_way',
                    required: true
                }],
                [{
                    title: '应退按揭款',
                    field: 'repointDetailList1',
                    required: true,
                    type: 'o2m',
                    options: {
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
                            value: '1'
                        }, {
                            title: '金额小写',
                            field: 'repointAmount',
                            amount: true,
                            required: true
                        }, {
                            title: '金额大写',
                            field: 'repointAmountL',
                            readonly: true,
                            required: true,
                            noVisible: true
                        }, {
                            title: '单位名称',
                            field: 'carDealerName',
                            readonly: true
                        }, {
                            title: '户名',
                            field: 'accountName'
                        }, {
                            title: '账号',
                            field: 'accountNo'
                        }, {
                            title: '开户行',
                            field: 'openBankName'
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
                            value: '3',
                            readonly: true,
                            required: true
                        }, {
                            title: '金额小写',
                            field: 'repointAmount',
                            amount: true,
                            required: true,
                            onChange: (v, props) => {
                                let amountL = '';
                                if (v) {
                                    amountL = moneyUppercase(v);
                                }
                                props.setPageData({
                                    repointAmountL: amountL
                                });
                            }
                        }, {
                            title: '金额大写',
                            field: 'repointAmountL',
                            required: true,
                            readonly: true,
                            noVisible: true
                        }, {
                            title: '单位名称',
                            field: 'carDealerName1',
                            required: true,
                            formatter: (v, data) => {
                                return data.carDealerName || data.carDealerName1;
                            },
                            render: (v, data) => {
                                return data.carDealerName || data.carDealerName1;
                            }
                        }, {
                            title: '户名',
                            field: 'accountName1',
                            required: true,
                            formatter: (v, data) => {
                                return data.accountName || data.accountName1;
                            },
                            render: (v, data) => {
                                return data.accountName || data.accountName1;
                            }
                        }, {
                            title: '账号',
                            field: 'accountNo1',
                            bankCard: true,
                            required: true,
                            formatter: (v, data) => {
                                return data.accountNo || data.accountNo1;
                            },
                            render: (v, data) => {
                                return data.accountNo || data.accountNo1;
                            }
                        }, {
                            title: '开户行',
                            field: 'openBankName1',
                            required: true,
                            formatter: (v, data) => {
                                return data.openBankName || data.openBankName1;
                            },
                            render: (v, data) => {
                                return data.openBankName || data.openBankName1;
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
                    title: '担保人1身份证正面',
                    field: 'guarantor1IdPicz',
                    type: 'img'
                }, {
                    title: '担保人1身份证反面',
                    field: 'guarantor1IdPicf',
                    type: 'img'
                }, {
                    title: '担保人1户口本',
                    field: 'guarantor1Hkb',
                    type: 'img'
                }],
                [{
                    title: '担保人2身份证正面',
                    field: 'guarantor2IdPicz',
                    type: 'img'
                }, {
                    title: '担保人2身份证反面',
                    field: 'guarantor2IdPicf',
                    type: 'img'
                }, {
                    title: '担保人2户口本',
                    field: 'guarantor2Hkb',
                    type: 'img'
                }],
                [{
                    title: '共还人身份证正面',
                    field: 'ghIdPicz',
                    type: 'img'
                }, {
                    title: '共还人身份证反面',
                    field: 'ghIdPicf',
                    type: 'img'
                }, {
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
        }, {
            title: '征信信息',
            items: [
                [{
                    title: '征信列表',
                    field: 'creditUserList',
                    type: 'o2m',
                    formatter: (v, data) => {
                        if (!this.props.pageData.creditUserList) {
                            this.props.setPageData({
                                ...this.props.pageData,
                                creditUserList: data.credit.creditUserList
                            });
                        }
                        return data.credit.creditUserList;
                    },
                    options: {
                        detail: true,
                        scroll: {x: 1300},
                        fields: o2mFields
                    }
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

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: buttons
        });
    }
}

export default BudgetDetail;
