import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/bankMoney-receive';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanBankMoneyReceive, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BankMoneyReceive extends React.Component {
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
            title: '身份证',
            field: 'idNo',
            render: (v, d) => {
                return d.user.idNo;
            },
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
            title: '服务费',
            field: 'fee',
            amount: true,
            readonly: true
        }, {
            title: '应退按揭款',
            field: 'shouldBackAmount',
            amount: true,
            readonly: true
        }, {
            title: '银行利率类型',
            field: 'rateType',
            type: 'select',
            key: 'bank_rate_type',
            readonly: true
        }, {
            title: '放款金额',
            field: 'bankFkAmount',
            amount: true,
            required: true
        }, {
            title: '放款时间',
            field: 'bankFkDatetime',
            type: 'date',
            required: true
        }, {
            title: '收款银行',
            field: 'bankReceiptCode',
            type: 'select',
            listCode: 632007,
            params: {
                type: '1'
            },
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
            required: true,
            onChange: (value, data) => {
                this.props.form.setFieldsValue({
                    bankReceiptNumber: data.bankcardNumber
                });
            }
        }, {
            title: '收款账号',
            field: 'bankReceiptNumber',
            hidden: true,
            required: true
        }, {
            title: '打款凭证',
            field: 'bankReceiptPdf',
            type: 'img',
            required: true
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
                    params.operator = getUserId();
                    fetch(632141, params).then(() => {
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

export default BankMoneyReceive;