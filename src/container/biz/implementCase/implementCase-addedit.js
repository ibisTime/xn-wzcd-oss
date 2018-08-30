import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/implementCase/implementCase-addedit';
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

@DetailWrapper(state => state.bizImplementCaseAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class ImplementCaseAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName'
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            }
        }, {
            title: '身份证',
            field: 'idNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '申请人',
            field: 'exeApplyUser',
            formatter: (v, d) => {
                return d.judge.exeApplyUser;
            }
        }, {
            title: '被执行人',
            field: 'beExeUser',
            formatter: (v, d) => {
                return d.judge.beExeUser;
            }
        }, {
            title: '申请标的额',
            field: 'executeMarkAmount',
            formatter: (v, d) => {
                return moneyFormat(d.judge.executeMarkAmount);
            }
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.applyDatetime);
            },
            amount: true
        }, {
            title: '经办法官',
            field: 'handleJudge',
            formatter: (v, d) => {
                return d.judge.handleJudge;
            }
        }, {
            title: '执行案号',
            field: 'hearCaseNumber',
            formatter: (v, d) => {
                return d.judge.hearCaseNumber;
            }
        }, {
            title: '优先权标的物',
            field: 'caseSubject',
            formatter: (v, d) => {
                return d.judge.caseSubject;
            }
        }, {
            title: '标的物拍卖时间',
            field: 'saleDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.saleDatetime);
            }
        }, {
            title: '有关公告时间',
            field: 'noticeDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.saleDatetime);
            }
        }, {
            title: '执行结果',
            field: 'exeResult',
            type: 'select',
            key: 'exe_result'
        }, {
            title: '备注',
            field: 'remark1',
            formatter: (v, d) => {
                return formatDate(d.judge.remark);
            }
        }, {
            title: '查封裁定到期时间',
            field: 'adjudicationDeadline',
            formatter: (v, d) => {
                return formatDate(d.judge.adjudicationDeadline);
            }
        }, {
            title: '收款时间',
            field: 'judgeReceiptDatetime',
            type: 'date'
        }, {
            title: '收款金额',
            field: 'judgeReceiptAmount',
            amount: true
        }, {
            title: '收款银行',
            field: 'judgeReceiptBankCode'
        }, {
            title: '收款账号',
            field: 'judgeReceiptBankcard'
        }, {
            title: '银行回单',
            field: 'judgeBillPdf',
            type: 'img'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521
        });
    }
}

export default ImplementCaseAddEdit;