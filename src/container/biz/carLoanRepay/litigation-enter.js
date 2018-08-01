import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation-enter';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationEnter, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationEnter extends React.Component {
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
            field: 'exeCaseNumber',
            required: true
        }, {
            title: '申请人姓名',
            field: 'exeApplyUser',
            required: true
        }, {
            title: '被执行人',
            field: 'exeUserName',
            required: true,
            formatter: (v, data) => {
                return data.realName;
            }
        }, {
            title: '执行标的额',
            field: 'executeMarkAmount',
            amount: true,
            required: true
        }, {
            title: '执行日期',
            field: 'exeDatetime',
            type: 'date',
            required: true
        }, {
            title: '执行结果',
            field: 'exeResult',
            type: 'select',
            key: 'exe_result',
            required: true
        }, {
            title: '执行日期',
            field: 'saleDatetime',
            type: 'date'
        }, {
            title: '附件',
            field: 'exePdf',
            type: 'img'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630562,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.code = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default litigationEnter;