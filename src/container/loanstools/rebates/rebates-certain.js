import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/rebates-certain';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanstoolsRebatesCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RebatesCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '缘由',
            field: 'reason',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }, {
            title: '总金额',
            field: 'totalAmount',
            amount: true,
            readonly: true
        }, {
            title: '返点列表',
            field: 'repointDetailCodeList',
            required: true,
            readonly: true,
            type: 'o2m',
            onChange: (data) => {
                let totalAmount = this.props.pageData.totalAmount;
                data.map(v => {
                    if (v.useMoneyPurpose !== '1') {
                        totalAmount += v.repointAmount;
                    }
                });
                this.props.setPageData({
                    ...this.props.pageData,
                    totalAmount: totalAmount
                });
            },
            options: {
                delete: true,
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
                    field: 'carType'
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
                    field: 'benchmarkRate'
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
                    field: 'openBankName',
                    required: true
                }, {
                    title: '户名',
                    field: 'companyName',
                    required: true
                }]
            }
        }, {
            title: '申请公司',
            field: 'carDealerName',
            readonly: true
        }, {
            title: '申请人',
            field: 'applyUserName',
            readonly: true
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '付款时间',
            field: 'payDatetime',
            type: 'date',
            required: true
        }, {
            title: '付款账号',
            field: 'payBankcardCode',
            type: 'select',
            listCode: 632007,
            params: {
                type: '1'
            },
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}-{{realName.DATA}}',
            required: true
        }, {
            title: '银行回单',
            field: 'billPdf',
            required: true,
            type: 'img'
        }, {
            title: '备注',
            field: 'payRemark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632246,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632241, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.props.cancelFetching();
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

export default RebatesCertain;
