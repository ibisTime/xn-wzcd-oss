import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/misInvoice-certain';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsMisInvoiceCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MisInvoiceCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.hiddenStatus = true;
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
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '原应退按揭款',
            field: 'preLoanAmount',
            amount: true,
            readonly: true
        }, {
            title: '新应退按揭款',
            field: 'amount1',
            amount: true,
            readonly: true,
            formatter: (v, data) => {
                if (moneyFormat(data.preLoanAmount) > moneyFormat(data.loanAmount)) {
                    this.hiddenStatus = true;
                } else {
                    this.hiddenStatus = false;
                }
            }
        }, {
            title: '付款金额',
            field: 'amount',
            required: true,
            amount: true,
            hidden: this.hiddenStatus
        }, {
            title: '付款时间',
            field: 'datetime',
            required: true,
            type: 'datetime',
            hidden: this.hiddenStatus
        }, {
            title: '付款账号',
            field: 'bankcardCode',
            type: 'select',
            listCode: 632007,
            params: {
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: '{{bankcardNumber.DATA}}-{{realName.DATA}}',
            required: true,
            hidden: this.hiddenStatus
        }, {
            title: '银行回单（水单）',
            field: 'billPdf',
            required: true,
            type: 'img',
            hidden: this.hiddenStatus
        }, {
            title: '收款金额',
            field: 'collectionAmount',
            required: true,
            amount: true,
            hidden: !this.hiddenStatus
        }, {
            title: '收款时间',
            field: 'collectionDatetime',
            required: true,
            type: 'datetime',
            hidden: !this.hiddenStatus
        }, {
            title: '付款账号',
            field: 'collectionBankcardCode',
            type: 'select',
            listCode: 632007,
            params: {
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: '{{bankcardNumber.DATA}}-{{realName.DATA}}',
            required: true,
            hidden: !this.hiddenStatus
        }, {
            title: '银行回单（水单）',
            field: 'collectionBillPdf',
            required: true,
            type: 'img',
            hidden: !this.hiddenStatus
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            data: [{
                key: '2',
                value: '发票不匹配补打款'
            }, {
                key: '3',
                value: '发票不匹配收回款'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '备注',
            field: 'remark'
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
                    this.props.doFetching();
                    fetch(632233, params).then(() => {
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

export default MisInvoiceCertain;
