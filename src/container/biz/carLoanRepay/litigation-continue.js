import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation-continue';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    formatDate
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationContinue, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationContinue extends React.Component {
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
            title: '案号',
            field: 'caseNumber',
            formatter: (v, d) => {
                return d.judgeList[0].caseNumber;
            },
            required: true,
            readonly: true
        }, {
            title: '原告',
            field: 'plaintiff',
            formatter: (v, d) => {
                return d.judgeList[0].plaintiff;
            },
            required: true,
            readonly: true
        }, {
            title: '被告',
            field: 'defendant',
            formatter: (v, data) => {
                return data.realName;
            },
            required: true,
            readonly: true
        }, {
            title: '诉讼标的',
            field: 'caseSubject',
            formatter: (v, d) => {
                return d.judgeList[0].caseSubject;
            },
            required: true,
            readonly: true
        }, {
            title: '涉案车辆',
            field: 'caseCar',
            formatter: (v, d) => {
                return d.judgeList[0].caseCar;
            },
            required: true,
            readonly: true,
            hidden: true
        }, {
            title: '起诉日期',
            field: 'caseStartDatetime',
            formatter: (v, d) => {
                return formatDate(d.judgeList[0].caseStartDatetime);
            },
            required: true,
            readonly: true
        }, {
            title: '起诉附件',
            field: 'casePdf',
            formatter: (v, d) => {
                return d.judgeList[0].casePdf;
            },
            type: 'img',
            readonly: true
        }, {
            title: '诉讼费',
            field: 'caseFee',
            amount: true,
            required: true
        }, {
            title: '诉讼状态',
            field: 'caseStatus',
            type: 'select',
            key: 'case_status',
            required: true
        }, {
            title: '开庭日期',
            field: 'courtDatetime',
            type: 'date',
            required: true
        }, {
            title: '判决日期',
            field: 'judgeDatetime',
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
            editCode: 630561,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.code = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default litigationContinue;