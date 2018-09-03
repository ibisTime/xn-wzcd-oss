import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-pay';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class redListaPay extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.arr = [{
            key: '0',
            value: '否'
        }, {
            key: '1',
            value: '是'
        }];
        this.state = {
          ...this.state,
          isPawnshopName: true
        };
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '是否典当行赎回',
            field: 'pawnshopIsRedeem',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.pawnshopIsRedeem;
            },
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            onChange: (v) => {
                this.isPawnshopName = v !== '0';
            },
            keyName: 'key',
            valueName: 'value',
            readonly: true
        }, {
            title: '典当行名称',
            field: 'pawnshopName',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.pawnshopName;
            },
            hidden: !this.state.isPawnshopName,
            readonly: true
        }, {
            title: '赎金小写',
            field: 'ransom',
            formatter: (v, d) => {
                return moneyFormat(d.curMonthRepayPlan.ransom);
            },
            amount: true,
            hidden: !this.state.isPawnshopName,
            readonly: true
        }, {
            title: '收车费用',
            field: 'tsCarAmount',
            formatter: (v, d) => {
                return moneyFormat(d.curMonthRepayPlan.tsCarAmount);
            },
            readonly: true
        }, {
            title: '收款人名称',
            field: 'tsUserName',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsUserName;
            },
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'tsBankName',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsBankName;
            },
            readonly: true
        }, {
            title: '收款人开户支行',
            field: 'tsSubbranch',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsSubbranch;
            },
            readonly: true
        }, {
            title: '收款人账号',
            field: 'tsBankcardNumber',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsBankcardNumber;
            },
            readonly: true
        }, {
            title: '付款日期',
            field: 'remitDatetime',
            type: 'date',
            required: true
        }, {
            title: '付款银行',
            field: 'remitBankCode',
            type: 'select',
            listCode: 632007,
            params: {
                type: '1',
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: '{{bankcardNumber.DATA}}-{{realName.DATA}}',
            required: true
        }, {
            title: '银行回单',
            field: 'remitBillPdf',
            type: 'img',
            required: true
        }];
        return this
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                buttons: [{
                    title: '确定',
                    handler: (param) => {
                        param.code = this.code;
                        param.operator = getUserId();
                        param.code = this.code;
                        this.doFetching();
                        fetch(630555, param).then(() => {
                            showSucMsg('操作成功');
                            this.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(() => this.cancelFetching());
                    },
                    check: true,
                    type: 'primary'
                }, {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }]
            });
    }
}