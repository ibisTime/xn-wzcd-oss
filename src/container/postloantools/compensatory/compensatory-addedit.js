import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/compensatory-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.postloantoolsCompensatoryAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class compensatoryAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            isRemark: false
        };
    }
    render() {
        const fields = [{
            title: '客户信息',
            items: [
                [{
                    title: '客户姓名',
                    field: 'customerUserName',
                    formatter: (v, d) => {
                        return d.user.realName;
                    },
                    readonly: true
                }, {
                    title: '业务编号',
                    field: 'bizCode',
                    readonly: true
                }, {
                    title: '身份证',
                    field: 'idNo',
                    formatter: (v, d) => {
                        return d.user.idNo;
                    },
                    readonly: true
                }], [{
                    title: '贷款银行',
                    field: 'loanBankName',
                    formatter: (v, d) => {
                        return d.budgetOrder.loanBankName;
                    },
                    readonly: true
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.loanAmount);
                    },
                    readonly: true
                }, {
                    title: '发票价格',
                    field: 'invoicePrice',
                    formatter: (v, d) => {
                        return moneyFormat(d.budgetOrder.invoicePrice);
                    },
                    readonly: true
                }], [{
                    title: '申请人就职单位',
                    field: 'applyUserCompany',
                    formatter: (v, d) => {
                        return d.budgetOrder.applyUserCompany;
                    },
                    readonly: true
                }, {
                    title: '申请人户籍地',
                    field: 'applyBirthAddress',
                    formatter: (v, d) => {
                        return d.budgetOrder.applyBirthAddress;
                    },
                    readonly: true
                }, {
                    title: '现住地址',
                    field: 'applyNowAddress',
                    formatter: (v, d) => {
                        return d.budgetOrder.applyNowAddress;
                    },
                    readonly: true
                }], [{
                    title: 'GPS',
                    field: 'budgetOrderGpsList1',
                    formatter: (v, d) => {
                        return d.budgetOrder.budgetOrderGpsList;
                    },
                    type: 'o2m',
                    options: {
                        noSelect: true,
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
            title: '预算单信息',
            open: true,
            items: [
                [{
                    title: '代偿性质',
                    field: 'type',
                    type: 'select',
                    formatter: (v, d) => {
                        return d.replaceRepayApply.type;
                    },
                    key: 'replace_repay_type',
                    readonly: true
                }, {
                    title: '预算金额',
                    field: 'budgetAmount',
                    formatter: (v, d) => {
                        return moneyFormat(d.replaceRepayApply.amount);
                    },
                    readonly: true
                }],
                [{
                    title: '收款人姓名',
                    field: 'repayUserName',
                    formatter: (v, d) => {
                        return d.replaceRepayApply.receiptRealName;
                    },
                    readonly: true
                }, {
                    title: '收款人开户行',
                    field: 'receiptBank',
                    formatter: (v, d) => {
                        return d.replaceRepayApply.receiptBank;
                    },
                    readonly: true
                }, {
                    title: '收款人账号',
                    field: 'repayBankcard',
                    formatter: (v, d) => {
                        return d.replaceRepayApply.receiptAccount;
                    },
                    readonly: true
                }],
                [{
                    title: '是否加急',
                    field: 'isUrgent',
                    formatter: (v, d) => {
                        let index = d.replaceRepayApply.isUrgent;
                        let isUrgent = this.arr[index].value;
                        return isUrgent;
                    },
                    readonly: true
                }, {
                    title: '已代偿金额',
                    field: 'budgetAmount',
                    amount: true,
                    readonly: true
                }, {
                    title: '代偿说明',
                    field: 'applyNote',
                    formatter: (v, d) => {
                        return d.replaceRepayApply.applyNote;
                    },
                    readonly: true
                }]
            ]
        }, {
            title: '其他信息',
            open: true,
            items: [
                [{
                    title: '与我司过往是否有纠纷',
                    field: 'isPlatIssue',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '是'
                    }, {
                        key: '1',
                        value: '否'
                    }],
                    keyName: 'key',
                    valueName: 'value',
                    readonly: true
                }],
                [{
                    title: '垫款后采取的方式',
                    field: 'takeWay',
                    readonly: true
                }, {
                    title: '暂缓起诉(天)',
                    field: 'deferDays',
                    readonly: true
                }],
                [{
                    title: '申请垫款理由',
                    field: 'useDatetime',
                    readonly: true
                }]
            ]
        }, {
            title: '欠款人以及担保人相关财产状况信息',
            items: [
                [{
                    title: '欠款人及配偶信息',
                    field: 'useDatetime',
                    readonly: true
                }],
                [{
                    title: '担保人信息及其名下财产信息',
                    field: 'useDatetime',
                    readonly: true
                }]
            ]
        }, {
            title: '流程日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            rowkey: 'id',
            params: {
                refOrder: this.code
            },
            options: {
                fields: [{
                    title: '操作人',
                    field: 'operatorName'
                }, {
                    title: '开始时间',
                    field: 'startDatetime',
                    type: 'datetime'
                }, {
                    title: '结束时间',
                    field: 'endDatetime',
                    type: 'datetime'
                }, {
                    title: '花费时长',
                    field: 'speedTime'
                }, {
                    title: '审核意见',
                    field: 'dealNote'
                }, {
                    title: '当前节点',
                    field: 'dealNode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }, {
            title: '风控部意见',
            open: true,
            items: [
                [{
                    title: '特殊情况说明',
                    field: 'riskNote',
                    required: true
                }]
            ]
        }, {
            title: '审核意见',
            field: 'approveNote',
            required: true,
            type: 'select',
            key: 'approve_note',
            onChange: (v) => {
                this.setState({
                    isRemark: v === '99'
                });
            }
        }, {
            title: '备注',
            field: 'remark',
            required: true,
            hidden: !this.state.isRemark
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632337
        });
    }
}

export default compensatoryAddedit;