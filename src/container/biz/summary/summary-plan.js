import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/summary/summary-plan';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.summaryPlan, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class SummaryPlan extends React.Component {
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
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '还款计划表',
            field: 'repayPlanList',
            type: 'o2m',
            options: {
                noSelect: true,
                fields: [{
                    title: '当前期数',
                    field: 'curPeriods',
                    nowrap: true
                }, {
                    title: '还款日期',
                    field: 'repayDatetime',
                    type: 'date',
                    nowrap: true
                }, {
                    title: '月供金额',
                    field: 'repayCapital',
                    amount: true,
                    nowrap: true
                }, {
                    title: '实还金额',
                    field: 'payedAmount',
                    amount: true,
                    nowrap: true
                }, {
                    title: '逾期金额',
                    field: 'overdueAmount',
                    amount: true,
                    nowrap: true
                }, {
                    title: '催收回逾期金额',
                    field: 'payedFee',
                    amount: true,
                    nowrap: true
                }, {
                    title: '清收成本',
                    field: 'totalFee',
                    amount: true,
                    nowrap: true
                }, {
                    title: '代偿金额',
                    field: 'replaceRealRepayAmount',
                    amount: true,
                    nowrap: true
                }, {
                    title: '代偿时间',
                    field: 'replaceRepayDatetime',
                    type: 'date',
                    nowrap: true
                }, {
                    title: '收回代偿金额',
                    field: 'replaceBackRepayAmount',
                    amount: true,
                    nowrap: true
                }, {
                    title: '收回代偿时间',
                    field: 'replaceBackRepayDatetime',
                    type: 'date',
                    nowrap: true
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521
        });
    }
}

export default SummaryPlan;