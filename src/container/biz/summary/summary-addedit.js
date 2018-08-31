import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/summary/summary-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.summaryAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class SummaryAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.choose = ['否', '是'];
    }
    render() {
        const fields = [{
            title: '客户基本信息',
            items: [
                [{
                    title: '客户姓名',
                    field: 'realName'
                }, {
                    title: '身份证',
                    field: 'idNo'
                }, {
                    title: '业务编号',
                    field: 'code',
                    formatter: (v, d) => {
                        return d.budgetOrder.code;
                    }
                }],
                [{
                    title: '贷款银行',
                    field: 'loanBankName'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true
                }, {
                    title: '发票价格',
                    field: 'invoicePrice',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.invoicePrice);
                    }
                }],
                [{
                    title: 'GPS',
                    field: 'budgetOrderGpsList',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.budgetOrderGpsList);
                    },
                    type: 'o2m',
                    options: {
                        add: true,
                        edit: true,
                        fields: [{
                            title: 'GPS设备号',
                            field: 'gpsDevNo'
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
                            valueName: 'value'
                        }, {
                            title: 'GPS安装位置',
                            field: 'azLocation',
                            type: 'select',
                            key: 'az_location'
                        }]
                    }
                }]
            ]
        }, {
            title: '担保人信息',
            items: [
                [{
                    title: '担保人1',
                    field: 'guarantor1Name',
                    formatter: (v, d) => {
                        return d.budgetOrder.guarantor1Name;
                    }
                }, {
                    title: '担保人1月收入',
                    field: 'guarantor1MonthIncome',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.guarantor1MonthIncome);
                    }
                }, {
                    title: '担保人1结息',
                    field: 'guarantor1SettleInterest',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.guarantor1SettleInterest);
                    }
                }], [{
                    title: '担保人1余额',
                    field: 'guarantor1Balance',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.guarantor1Balance);
                    }
                }, {
                    title: '担保人1流水是否体现月收入',
                    field: 'guarantor1JourShowIncome',
                    formatter: (v, d) => {
                        return this.choose[d.budgetOrder.guarantor1JourShowIncome];
                    }
                }, {
                    title: '担保人1是否打件',
                    field: 'guarantor1IsPrint',
                    formatter: (v, d) => {
                        return this.choose[d.budgetOrder.guarantor1IsPrint];
                    }
                }], [{
                    title: '担保人2',
                    field: 'guarantor2Name',
                    formatter: (v, d) => {
                        return d.budgetOrder.guarantor2Name;
                    }
                }, {
                    title: '担保人2月收入',
                    field: 'guarantor2MonthIncome',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.guarantor2MonthIncome);
                    }
                }, {
                    title: '担保人2结息',
                    field: 'guarantor2SettleInterest',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.guarantor2SettleInterest);
                    }
                }], [{
                    title: '担保人2余额',
                    field: 'guarantor2Balance',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.guarantor2Balance);
                    }
                }, {
                    title: '担保人2流水是否体现月收入',
                    field: 'guarantor2JourShowIncome',
                    formatter: (v, d) => {
                        return this.choose[d.budgetOrder.guarantor2JourShowIncome];
                    }
                }, {
                    title: '担保人2是否打件',
                    field: 'guarantor2IsPrint',
                    formatter: (v, d) => {
                        return this.choose[d.budgetOrder.guarantor2IsPrint];
                    }
                }]
            ]
        }, {
            title: '紧急联系人',
            items: [
                [{
                    field: 'emergencyName1',
                    title: '联系人1姓名',
                    formatter: (v, d) => {
                        return d.budgetOrder.emergencyName1;
                    }
                }, {
                    field: 'emergencyRelation1',
                    title: '与申请人关系',
                    _keys: ['budgetOrder', 'emergencyRelation1'],
                    type: 'select',
                    key: 'emergency_contact_relation',
                    required: true
                }, {
                    field: 'emergencyMobile1',
                    title: '手机号码',
                    formatter: (v, d) => {
                        return d.budgetOrder.emergencyMobile1;
                    }
                }],
                [{
                    field: 'emergencyName2',
                    title: '联系人2姓名',
                    formatter: (v, d) => {
                        return d.budgetOrder.emergencyName2;
                    }
                }, {
                    field: 'emergencyRelation2',
                    title: '与申请人关系',
                    _keys: ['budgetOrder', 'emergencyRelation2'],
                    type: 'select',
                    key: 'emergency_contact_relation'
                }, {
                    field: 'emergencyMobile2',
                    title: '手机号码',
                    formatter: (v, d) => {
                        return d.budgetOrder.emergencyMobile2;
                    }
                }]
            ]
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521
        });
    }
}

export default SummaryAddedit;