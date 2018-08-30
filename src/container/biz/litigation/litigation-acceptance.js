import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-acceptance';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    dateFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationAcceptance, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class LitigationAcceptance extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.bizCode = getQueryString('bizCode', this.props.location.search);
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
            type: 'date',
            required: true
        }, {
            title: '受理费',
            field: 'acceptanceFee',
            amount: true,
            required: true
        }, {
            title: '受理案号',
            field: 'caseNumber',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630566,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.operator = getUserId();
                params.repayBizCode = params.code;
                delete params.code;
                return params;
            }
        });
    }
}

export default LitigationAcceptance;
