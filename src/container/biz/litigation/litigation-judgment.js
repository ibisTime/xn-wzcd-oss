import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-judgment';
import {
    getQueryString,
    getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationJudgment, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class LitigationJudgment extends React.Component {
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
            title: '判决结果',
            field: 'judgeResult',
            required: true
        }, {
            title: '判决日期',
            field: 'judgeDatetime',
            type: 'date',
            required: true
        }, {
            title: '判决书送达时间',
            field: 'judgePdfDeliveryTime',
            type: 'date',
            required: true
        }, {
            title: '生效时间',
            field: 'effectiveTime',
            type: 'date',
            required: true
        }, {
            title: '判决书',
            field: 'judgePdf',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630568,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.repayBizCode = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default LitigationJudgment;