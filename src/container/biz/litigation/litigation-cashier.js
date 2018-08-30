import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-cashier';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    formatDate
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationCashier, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class LitigationCashier extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            },
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
            title: '原告',
            field: 'plaintiff',
            type: 'select',
            key: 'plaintiff',
            readonly: true
        }, {
            title: '被告',
            field: 'defendant',
            formatter: (v, d) => {
                return d.judge.defendant;
            },
            readonly: true
        }, {
            title: '案款',
            field: 'caseFee',
            formatter: (v, d) => {
                return moneyFormat(d.judge.caseFee);
            },
            readonly: true
        }, {
            title: '受理时间',
            field: 'acceptanceTime',
            formatter: (v, d) => {
                return formatDate(d.judge.acceptanceTime);
            },
            readonly: true
        }, {
            title: '受理费',
            field: 'acceptanceFee',
            formatter: (v, d) => {
                return moneyFormat(d.judge.acceptanceFee);
            },
            amount: true,
            readonly: true
        }, {
            title: '受理案号',
            field: 'caseNumber',
            formatter: (v, d) => {
                return d.judge.caseNumber;
            },
            readonly: true
        }, {
            title: '收款凭证',
            field: 'payAmountProve',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630565,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.repayBizCode = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default LitigationCashier;