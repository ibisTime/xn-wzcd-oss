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
    getUserId,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

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
            readonly: true,
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true,
            required: true,
            formatter: (v, data) => {
                return data.bankSubbranch && (data.bankSubbranch.bank.bankName + '-' + data.bankSubbranch.abbrName);
            }
        }, {
            title: '履约保证金',
            field: 'lyAmount',
            amount: true,
            readonly: true
        }, {
            title: '担保风险金',
            field: 'fxAmount',
            amount: true,
            readonly: true
        }, {
            title: 'GPS收费',
            field: 'gpsFee',
            amount: true,
            readonly: true
        }, {
            title: 'GPS收费方式',
            field: 'gpsFeeWay',
            type: 'select',
            key: 'gps_fee_way',
            readonly: true
        }, {
            title: '手续费',
            field: 'fee',
            amount: true,
            readonly: true
        }, {
            title: '手续费收取方式',
            field: 'serviceChargeWay',
            type: 'select',
            key: 'fee_way',
            readonly: true
        }, {
            title: '厂家贴息',
            field: 'carDealerSubsidy',
            amount: true,
            readonly: true
        }, {
            title: '应退按揭款',
            field: 'shouldBackAmount',
            amount: true,
            readonly: true
        }, {
            title: '付款时间',
            field: 'shouldBackDatetime',
            type: 'date',
            required: true
        }, {
            title: '付款银行',
            field: 'shouldBackBankcardCode',
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
            field: 'shouldBackBillPdf',
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
                    let data = {};
                    data.code = this.code;
                    data.shouldBackDatetime = params.shouldBackDatetime;
                    data.shouldBackBankcardCode = params.shouldBackBankcardCode;
                    data.shouldBackBillPdf = params.shouldBackBillPdf;
                    this.props.doFetching();
                    fetch(632260, data).then(() => {
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