import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/refund-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.loanstoolsRefundCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RefundCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode',
            readonly: true
        }, {
            title: '业务编号',
            field: 'receiptBank',
            readonly: true
        }, {
            title: '身份证',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '履约保证金',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '担保风险金',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '手续费收取方式',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: 'GPS收费',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: 'GPS收费方式',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '厂家贴息',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '应退按揭款',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '手续费到账清单',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '付款时间',
            field: 'payDatetime',
            type: 'date',
            required: true
        }, {
            title: '付款银行',
            field: 'payBank',
            pageCode: 802115,
            keyName: 'bankCode',
            valueName: 'bankName',
            type: 'select',
            required: true
        }, {
            title: '付款账号',
            field: 'receiptAccount',
            required: true
        }, {
            title: '付款凭证',
            field: 'receiptAccount',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    fetch(632102, params).then(() => {
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

export default RefundCertain;