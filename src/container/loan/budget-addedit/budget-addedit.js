import React from 'react';
import {
    getQueryString,
    getUserId,
    showWarnMsg,
    showSucMsg,
    moneyParse,
    moneyFormat
} from 'common/js/util';
import { CollapseWrapper } from 'component/collapse-detail/collapse-detail';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/budget-addedit';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanAdmittanceAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BudgetAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
        this.rateData = {};
        this.wanFactor = 0;
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
                    field: 'carDealer',
                    type: 'select',
                    required: true
                }, {
                    title: '贷款银行',
                    field: 'loanBankName',
                    readonly: true,
                    required: true
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
                    title: '贷款周期(期)',
                    field: 'loanPeriods',
                    required: true
                }, {
                    title: '发票价格',
                    field: 'invoicePrice',
                    amount: true,
                    required: true
                }],
                [{
                    title: '购车途径',
                    field: 'shopWay',
                    type: 'select',
                    key: 'budget_orde_biz_typer',
                    readonly: true,
                    required: true
                }, {
                    title: '利率类型',
                    field: 'rateType',
                    required: true
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true,
                    required: true
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
                    title: '利率类型',
                    field: 'bankRate',
                    required: true
                }, {
                    // 贷款金额 / 发票价格
                    title: '我司贷款成数',
                    field: 'globalRate',
                    readonly: true,
                    required: true
                }],
                [{
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
                    // 服务费/贷款金额+银行利率
                    title: '综合利率',
                    field: 'globalRate',
                    readonly: true,
                    required: true
                }, {
                    title: '服务费',
                    field: 'fee',
                    amount: true,
                    required: true
                }],
                [{
                    title: '厂家贴息',
                    field: 'cardealerSubsidy',
                    required: true
                }, {
                    // (贷款金额+服务费) / 发票价格
                    title: '银行贷款成数',
                    field: 'bankLoanNum',
                    readonly: true,
                    required: true
                }],
                [{
                    title: 'GPS',
                    field: 'GPSList',
                    required: true,
                    type: 'o2m',
                    options: [{
                        add: true,
                        edit: true,
                        fields: [{
                            title: 'GPS设备号',
                            field: 'cardealerSubsidy',
                            required: true
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
                            required: true
                        }]
                    }]
                }]
            ]
        }, {
            title: '职业及收入情况',
            items: [
                [{
                    title: '申请人就职单位',
                    field: '1',
                    required: true
                }, {
                    title: '职务',
                    field: '2',
                    required: true
                }, {
                    title: '申请人共还人关系',
                    field: '3',
                    readonly: true,
                    required: true
                }, {
                    title: '婚姻状况',
                    field: 'marryState',
                    type: 'select',
                    key: 'marry_state',
                    required: true
                }],
                [{
                    field: '申请人月收入',
                    title: '4',
                    amount: true,
                    required: true
                }, {
                    field: '申请人结息',
                    title: '5',
                    amount: true,
                    required: true
                }, {
                    field: '申请人余额',
                    title: '6',
                    amount: true,
                    required: true
                }, {
                    field: '流水是否体现月收入',
                    title: '7',
                    required: true
                }, {
                    title: '是否打件',
                    field: '是否打件',
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
                    field: '共还人月收入',
                    title: '8',
                    amount: true,
                    required: true
                }, {
                    field: '共还人结息',
                    title: '9',
                    amount: true,
                    required: true
                }, {
                    field: '共还人余额',
                    title: '10',
                    amount: true,
                    required: true
                }, {
                    field: '流水是否体现月收入',
                    title: '11',
                    required: true
                }, {
                    title: '是否打件',
                    field: '12',
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
                    field: '担保人1月收入',
                    title: '11',
                    amount: true,
                    required: true
                }, {
                    field: '担保人1结息',
                    title: '11',
                    amount: true,
                    required: true
                }, {
                    field: '担保人1余额',
                    title: '1',
                    amount: true,
                    required: true
                }, {
                    field: '流水是否体现月收入',
                    title: '1',
                    required: true
                }, {
                    title: '是否打件',
                    field: '1',
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
                    field: '担保人2月收入',
                    title: '11',
                    amount: true,
                    required: true
                }, {
                    field: '担保人2结息',
                    title: '11',
                    amount: true,
                    required: true
                }, {
                    field: '担保人2余额',
                    title: '11',
                    amount: true,
                    required: true
                }, {
                    field: '流水是否体现月收入',
                    title: '11',
                    required: true
                }, {
                    title: '是否打件',
                    field: '11',
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
                    field: '其他收入备注',
                    title: 'applyRemark',
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
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }, {
                    title: '有无驾照',
                    field: 'isDriveLicense',
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
                    valueName: 'value',
                    required: true
                }],
                [{
                    title: '驾照',
                    field: 'driveLicense',
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
                    field: '其他情况说明',
                    title: 'otherNote',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }, {
            title: '手续费',
            items: [
                [{
                    title: '油补',
                    field: 'oilSubsidy',
                    required: true
                }, {
                    title: '油补公里数',
                    field: 'oilSubsidyKil',
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
                    title: 'GPS收费',
                    field: 'gpsFee',
                    amount: true,
                    required: true
                }],
                [{
                    title: '履约保证金',
                    field: 'lyAmount',
                    required: true
                }, {
                    title: 'GPS提成',
                    field: 'gpsDeduct',
                    required: true
                }],
                [{
                    title: '担保风险金',
                    field: 'gpsFee',
                    amount: true,
                    required: true
                }, {
                    title: 'GPS收费方式',
                    field: 'gpsFeeWay',
                    type: 'select',
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }],
                [{
                    title: '杂费',
                    field: 'gpsFee',
                    amount: true,
                    required: true
                }, {
                    title: '手续费收取方式',
                    field: 'gpsFeeWay',
                    type: 'select',
                    keyName: 'key',
                    valueName: 'value',
                    required: true
                }],
                [{
                    // 履约保证金+担保风险金+GPS收费+杂费
                    title: '收客户手续费合计',
                    field: 'gpsFee',
                    amount: true,
                    required: true
                }]
            ]
        }, {
            title: '家庭房产情况及家访',
            items: [
                [{
                    title: 'GPS',
                    field: 'GPSList',
                    required: true,
                    type: 'o2m',
                    options: [{
                        fields: [{
                            title: '用款用途',
                            field: '11',
                            required: true
                        }, {
                            title: '金额小写',
                            field: '11',
                            required: true
                        }, {
                            title: '金额大写',
                            field: '11',
                            required: true
                        }, {
                            title: '单位名称',
                            field: 'companyName',
                            required: true
                        }, {
                            title: '账号',
                            field: 'bankNumber',
                            required: true
                        }, {
                            title: '开户行',
                            field: 'subbranch',
                            required: true
                        }]
                    }]
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
                }, {
                    title: '备注事项',
                    field: 'otherApplyNote',
                    type: 'textarea',
                    normalArea: true
                }]
            ]
        }];

        let checkFields = [{
            field: 'approveNote',
            title: '审核说明',
            type: 'textarea',
            normalArea: true,
            readonly: !(this.isCheckCommissioner || this.isCheckDirector)
        }];

        let buttons = [];

        if (this.isCheckCommissioner || this.isCheckDirector) {
            fields = fields.concat(checkFields);

            buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    params.approveResult = '1';
                    params.operator = getUserId();
                    let bizCode = this.isCheckCommissioner ? 632121 : 632122;
                    this.props.doFetching();
                    fetch(bizCode, params).then(() => {
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
                    params.approveResult = '0';
                    params.operator = getUserId();
                    let bizCode = this.isCheckCommissioner ? 632121 : 632122;
                    this.props.doFetching();
                    fetch(bizCode, params).then(() => {
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
            editCode: 632120,
            detailCode: 632131,
            buttons: buttons,
            beforeSubmit: (data) => {
                data.creditCode = this.code;
                data.operator = getUserId();
                return data;
            }
        });
    }
}

export default BudgetAddedit;
