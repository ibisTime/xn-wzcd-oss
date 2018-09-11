import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/finance/prepayment-addedit';
import { getQueryString, dateTimeFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.financePrepaymentAddEdit,
    { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class PrepaymentAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyName'
        }, {
            field: 'totalAdvanceFund',
            title: '垫资总额',
            amount: true
        }, {
            field: 'hasAdvanceFund',
            title: '已垫资金额',
            amount: true
        }, {
            field: 'unAdvanceFund',
            title: '未垫资金额',
            amount: true
        }, {
            title: '垫资客户',
            field: 'list',
            type: 'o2m',
            listCode: 632187,
            params: {
                companyCode: this.code
            },
            options: {
                noSelect: true,
                fields: [{
                    title: '客户姓名',
                    field: 'customerName'
                }, {
                    title: '贷款银行',
                    field: 'loanBankName'
                }, {
                    title: '贷款金额',
                    field: 'loanAmount',
                    amount: true
                }, {
                    title: '手续费',
                    field: 'fee',
                    amount: true
                }, {
                    title: '手续费收取方式',
                    field: 'serviceChargeWay',
                    type: 'select',
                    key: 'fee_way'
                }, {
                    title: 'GPS费',
                    field: 'gpsFee',
                    amount: true
                }, {
                    title: 'GPS费收取方式',
                    field: 'gpsFeeWay',
                    type: 'select',
                    key: 'gps_fee_way'
                }, {
                    title: '应退按揭款',
                    field: 'receiptAccount',
                    amount: true
                }, {
                    title: '当前节点',
                    field: 'curNodeCode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            key: 'companyCode',
            code: this.code,
            view: this.view,
            detailCode: 632178
        });
    }
}

export default PrepaymentAddedit;
