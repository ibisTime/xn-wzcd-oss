import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/implementCase/implementCase-finance';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    formatDate,
    moneyFormat,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizImplementCaseFinance, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class ImplementCaseFinance extends React.Component {
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
            formatter: (v, d) => {
                return d.judge.handleJudge;
            },
            readonly: true
        }, {
            title: '执行案号',
            field: 'hearCaseNumber',
            formatter: (v, d) => {
                return d.judge.hearCaseNumber;
            },
            readonly: true
        }, {
            title: '优先权标的物',
            field: 'caseSubject',
            formatter: (v, d) => {
                return d.judge.caseSubject;
            },
            readonly: true
        }, {
            title: '标的物拍卖时间',
            field: 'saleDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.saleDatetime);
            },
            readonly: true
        }, {
            title: '有关公告时间',
            field: 'noticeDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.saleDatetime);
            },
            readonly: true
        }, {
            title: '执行结果',
            field: 'exeResult',
            formatter: (v, d) => {
                return d.judge.exeResult;
            },
            type: 'select',
            key: 'exe_result',
            readonly: true
        }, {
            title: '备注',
            field: 'remark1',
            formatter: (v, d) => {
                return d.judge.remark;
            },
            readonly: true
        }, {
            title: '收款时间',
            field: 'judgeReceiptDatetime',
            type: 'date',
            required: true
        }, {
            title: '收款金额',
            field: 'judgeReceiptAmount',
            amount: true,
            required: true
        }, {
            title: '收款银行',
            field: 'judgeReceiptBankCode',
            type: 'select',
            listCode: 632007,
            params: {
                type: '1',
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: 'bankName',
            required: true
        }, {
            title: '收款账号',
            field: 'judgeReceiptBankcard',
            type: 'select',
            listCode: 632007,
            params: {
                type: '1',
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: 'bankcardNumber',
            required: true
        }, {
            title: '银行回单',
            field: 'judgeBillPdf',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630563,
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

export default ImplementCaseFinance;