import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/refund-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsRefundAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RefundAddedit extends React.Component {
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
            field: 'lyAmountFee',
            amount: true,
            readonly: true
        }, {
            title: '担保风险金',
            field: 'assureFee',
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
            field: 'feeWay',
            type: 'select',
            key: 'fee_way',
            readonly: true
        }, {
            title: '厂家贴息',
            field: 'cardealerSubsidy',
            amount: true,
            readonly: true
        }, {
            title: '应退按揭款',
            field: 'receiptAccount',
            readonly: true,
            formatter: (v, data) => {
                let loanAmount = data.loanAmount;
                let cardealerSubsidy = data.cardealerSubsidy;
                let otherFee = data.otherFee;
                let gpsFee = data.gpsFee;
                let refund = 0;

                if (data.gpsFeeWay !== '2') {
                    gpsFee = 0;
                }
                if (data.feeWay !== '2') {
                    otherFee = 0;
                }

                refund = moneyFormat(loanAmount - cardealerSubsidy - gpsFee - otherFee);

                return refund;
            }
        }, {
            title: '手续费到账清单',
            field: 'receiptAccount',
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
                type: 1
            },
            keyName: 'code',
            valueName: '{{bankCode.DATA}}-{{subbranch.DATA}}-{{bankcardNumber.DATA}}',
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
            detailCode: 632146
        });
    }
}

export default RefundAddedit;
