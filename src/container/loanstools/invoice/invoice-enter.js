import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/invoice-enter';
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
    state => state.loanstoolsInvoiceEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class InvoiceEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode',
            select: true,
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
            readonly: true,
            amount: true
        }, {
            title: '贷款银行',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '购车途径',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '是否垫资',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '提车日期',
            field: 'dzDatetime',
            type: 'date'
        }, {
            title: '发票价',
            field: 'receiptAccount',
            readonly: true,
            amount: true
        }, {
            title: '发票是否正确',
            field: 'dzDatetime',
            required: true
        }, {
            title: '现发票价',
            field: 'receiptAccount',
            required: true,
            amount: true
        }, {
            title: '准入贷款成数标准',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '新贷款成数',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '发票',
            field: 'receiptAccount',
            required: true,
            type: 'img'
        }, {
            title: '合格证',
            field: 'receiptAccount',
            required: true,
            type: 'img'
        }, {
            title: '交强险',
            field: 'receiptAccount',
            required: true,
            type: 'img'
        }, {
            title: '商业险',
            field: 'receiptAccount',
            required: true,
            type: 'img'
        }, {
            title: '机动车登记证书',
            field: 'receiptAccount',
            required: true,
            type: 'img'
        }, {
            title: '批单',
            field: 'receiptAccount',
            required: true,
            type: 'img'
        }, {
            title: '备注',
            field: 'remark'
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

export default InvoiceEnter;