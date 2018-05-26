import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/refundBusiness-plan';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundBusinessPlan, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class refundBusinessPlan extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款人',
            field: 'realName',
            readonly: true,
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true
        }, {
            title: '期数',
            field: 'periods',
            readonly: true
        }, {
            title: '还款计划表',
            field: 'repayPlanList',
            searchParams: {
                limit: 24
            },
            type: 'o2m',
            options: {
                scroll: {
                    x: 1300
                },
                fields: [{
                    title: '期数',
                    field: 'curPeriods'
                }, {
                    title: '应还本金',
                    field: 'repayCapital',
                    amount: true
                }, {
                    title: '应还利息',
                    field: 'repayInterest',
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
                    title: '剩余欠款',
                    field: 'overplusAmount',
                    amount: true
                }]
            }
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521,
                beforeDetail: (param) => {
                    param['userId'] = this.userId;
                }
            });
    }
}

export default refundBusinessPlan;