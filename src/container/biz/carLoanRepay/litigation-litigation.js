import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation-litigation';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationLitigation, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationLitigation extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.user.realName;
            },
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
            formatter: (v, d) => {
                return d.user.idNo;
            },
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
            required: true
        }, {
            title: '原告',
            field: 'plaintiff',
            required: true
        }, {
            title: '被告',
            field: 'defendant',
            readonly: true,
            formatter: (v, data) => {
                return data.user.realName;
            },
            required: true
        }, {
            title: '被告人',
            field: 'userId',
            formatter: (v, data) => {
                return data.user.userId;
            },
            hidden: true
        }, {
            title: '诉讼标的',
            field: 'caseSubject',
            required: true
        }, {
            title: '涉案车辆',
            field: 'caseCar',
            required: true,
            hidden: true
        }, {
            title: '诉讼费',
            field: 'caseFee',
            amount: true,
            required: true
        }, {
            title: '起诉日期',
            field: 'caseStartDatetime',
            type: 'date',
            required: true
        }, {
            title: '起诉附件',
            field: 'casePdf',
            type: 'img'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630560,
            detailCode: 630521,
            beforeSubmit: (params) => {
                console.log(this.props.pageDate);
                params.repayBizCode = this.code;
                params.defendant = params.userId;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default litigationLitigation;