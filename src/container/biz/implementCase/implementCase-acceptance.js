import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/implementCase/implementCase-acceptance';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    formatDate,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizImplementCaseAcceptance, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class ImplementCaseAcceptance extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
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
            title: '申请人',
            field: 'exeApplyUser',
            formatter: (v, d) => {
                return d.judge.exeApplyUser;
            },
            readonly: true
        }, {
            title: '被执行人',
            field: 'beExeUser',
            formatter: (v, d) => {
                return d.judge.beExeUser;
            },
            readonly: true
        }, {
            title: '申请标的额',
            field: 'executeMarkAmount',
            formatter: (v, d) => {
                return moneyFormat(d.judge.executeMarkAmount);
            },
            amount: true,
            readonly: true
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.applyDatetime);
            },
            amount: true,
            readonly: true
        }, {
            title: '经办法官',
            field: 'handleJudge',
            required: true
        }, {
            title: '执行案号',
            field: 'exeCaseNumber',
            required: true
        }, {
            title: '优先权标的物',
            field: 'caseSubject',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630581,
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

export default ImplementCaseAcceptance;