import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/rebates-companyCheck';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsRebatesCompanyCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RebatesCompanyCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '申请公司',
            field: 'carDealerName',
            readonly: true
        }, {
            title: '申请人',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '返点列表',
            field: 'repointDetailCodeList',
            required: true,
            type: 'o2m',
            options: {
                scroll: {
                    x: 1600
                },
                fields: [{
                    title: 'code',
                    field: 'code',
                    hidden: true
                }, {
                    title: '业务编号',
                    field: 'budgetCode'
                }, {
                    title: '客户姓名',
                    field: 'userName'
                }, {
                    title: '身份证号',
                    field: 'idNo'
                }, {
                    title: '车辆型号',
                    field: 'carS'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true,
                    required: true
                }, {
                    title: '银行实际利率',
                    field: 'bankRate'
                }, {
                    title: '基准利率',
                    field: 'bankRate2'
                }, {
                    title: '手续费',
                    field: 'fee',
                    amount: true
                }, {
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
                    valueName: 'value'
                }, {
                    title: '金额小写',
                    field: 'repointAmount',
                    amount: true,
                    required: true
                }, {
                    title: '账号',
                    field: 'accountCode',
                    required: true
                }, {
                    title: '开户行',
                    field: 'subbranch',
                    required: true
                }, {
                    title: '户名',
                    field: 'companyName',
                    required: true
                }]
            }
        }, {
            title: '总金额',
            field: 'totalAmount',
            amount: true,
            readonly: true
        }, {
            title: '缘由',
            field: 'reason',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }, {
            title: '结算方式',
            field: 'settleType',
            type: 'select',
            key: 'settle_way',
            readonly: true
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            type: 'select',
            key: 'repoint_status',
            readonly: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            type: 'textarea',
            normalArea: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632246,
            buttons: [{
                title: '通过',
                handler: (param) => {
                    param.approveResult = '1';
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632242, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    param.approveResult = '0';
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632242, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default RebatesCompanyCheck;