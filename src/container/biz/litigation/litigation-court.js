import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-court';
import {
    getQueryString,
    getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationCourt, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class LitigationCourt extends React.Component {
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
            title: '收款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '开庭日期',
            field: 'courtDatetime',
            type: 'date',
            required: true
        }, {
            title: '开庭地点',
            field: 'courtAddress',
            required: true
        }, {
            title: '经办法官',
            field: 'handleJudge',
            required: true
        }, {
            title: '审理案号',
            field: 'hearCaseNumber',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630567,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.repayBizCode = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default LitigationCourt;