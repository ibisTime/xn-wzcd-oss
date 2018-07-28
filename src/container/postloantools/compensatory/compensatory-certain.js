import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/compensatory-certain';
import {CollapseWrapper} from 'component/collapse-detail/collapse-detail';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.postloantoolsCompensatoryCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class compensatoryCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
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
                    field: 'code',
                    readonly: true
                }, {
                    title: '身份证',
                    field: 'idNo',
                    formatter: (v, d) => {
                        return d.user.idNo;
                    },
                    readonly: true
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
                    type: 'select',
                    key: 'take_way',
                    readonly: true
                }, {
                    title: '暂缓起诉(天)',
                    field: 'deferDays',
                    readonly: true
                }],
                [{
                    title: '申请垫款理由',
                    field: 'applyReason',
                    readonly: true
                }]
            ]
        }, {
            title: '风控部意见',
            open: true,
            items: [
                [{
                    title: '特殊情况说明',
                    field: 'riskNote',
                    required: true,
                    readonly: true
                }]
            ]
        }, {
            title: '放款信息',
            open: true,
            items: [
                [{
                    title: '代偿金额',
                    field: 'amount',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '代偿利率',
                    field: 'repayRate',
                    required: true
                }],
                [{
                    title: '付款日期',
                    field: 'repayDate',
                    type: 'date',
                    required: true
                }],
                [{
                    title: '付款银行',
                    field: 'repayBank',
                    type: 'select',
                    listCode: 632007,
                    params: {
                        type: 1
                    },
                    keyName: 'code',
                    valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
                    required: true,
                    onChange: (v, data) => {
                        this.props.setPageData({
                            repayUser: data.realName,
                            repayBankcard: data.bankcardNumber
                        });
                    }
                }, {
                    title: '付款人',
                    field: 'repayUser',
                    required: true,
                    readonly: true
                }, {
                    title: '付款卡号',
                    field: 'repayBankcard',
                    required: true,
                    readonly: true
                }],
                [{
                    title: '付款凭证',
                    field: 'repayBill',
                    type: 'img'
                }]
            ]
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632337,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    params.operator = getUserId();
                    params.repayUser = this.props.pageData.repayUser;
                    params.repayBankcard = this.props.pageData.repayBankcard;
                    this.props.doFetching();
                    fetch(632335, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default compensatoryCertain;