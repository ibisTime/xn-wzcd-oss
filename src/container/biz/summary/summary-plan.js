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
    state => state.summaryAddEdit, {
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
            formatter: (v, d) => {
                return d.user.realName;
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
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            formatter: (v, d) => {
                return d.repayBiz.loanBankName;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayBiz.loanAmount);
            },
            readonly: true
        }, {
            title: '还款计划表',
            field: 'repayPlanList',
            type: 'o2m',
            options: {
                fields: [{
                    title: '当前期数',
                    field: 'curPeriods'
                }, {
                    title: '月供金额',
                    field: 'repayCapital',
                    amount: true
                }, {
                    title: '实还金额',
                    field: 'payedAmount',
                    amount: true
                }, {
                    title: '逾期金额',
                    field: 'overdueAmount',
                    amount: true
                }, {
                    title: '催收回逾期金额',
                    field: '22',
                    amount: true
                }, {
                    title: '清收成本',
                    field: '33',
                    amount: true
                }, {
                    title: '代偿金额',
                    field: '44',
                    amount: true
                }, {
                    title: '代偿时间',
                    field: '55',
                    amount: true
                }, {
                    title: '收回代偿金额',
                    field: '66',
                    amount: true
                }, {
                    title: '收回代偿时间',
                    field: '77',
                    amount: true
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