import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/cancel-finance';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanstoolsCancelFinance, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class CancelFinance extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '作废原因',
            field: 'zfReason',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true,
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            required: true,
            readonly: true,
            formatter: (v, data) => {
                return data.bankSubbranch && (data.bankSubbranch.bank.bankName + '-' + data.bankSubbranch.abbrName);
            }
        }, {
            title: '应收金额',
            field: 'receiptAccount',
            required: true,
            readonly: true,
            formatter: (v, data) => {
                return moneyFormat(data.loanAmount);
            }
        }, {
            title: '收款金额',
            field: 'zfSkAmount',
            amount: true,
            required: true
        }, {
            title: '收款账号',
            field: 'zfSkBankcardCode',
            type: 'select',
            listCode: 632007,
            params: {
                type: 1
            },
            keyName: 'code',
            valueName: '{{bankCode.DATA}}-{{subbranch.DATA}}-{{bankcardNumber.DATA}}',
            required: true
        }, {
            title: '收款时间',
            field: 'zfSkReceiptDatetime',
            type: 'date',
            required: true
        }, {
            title: '备注',
            field: 'zfFinanceRemark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632272, params).then(() => {
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

export default CancelFinance;