import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-processAddedit';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListProcessAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListProcessAddedit extends React.Component {
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
                return d.repayPlan.repayBiz.budgetOrder.customerName;
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.repayPlan.repayBiz.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            formatter: (v, d) => {
                return d.repayPlan.user.idNo;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayPlan.repayBiz.loanAmount);
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => {
                return d.repayPlan.repayBiz.loanBankName;
            },
            readonly: true
        }, {
            title: '逾期金额',
            field: 'restOverdueAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayPlan.repayBiz.restOverdueAmount);
            },
            readonly: true
        }, {
            title: '处理历史',
            field: 'remindLogList',
            type: 'o2m',
            _keys: ['repayPlan', 'remindLogList'],
            options: {
                noSelect: true,
                fields: [{
                    title: '催收方式',
                    field: 'way',
                    type: 'select',
                    key: 'way'
                }, {
                    title: '催收对象',
                    field: 'toUser'
                }, {
                    title: '催收文本',
                    field: 'content'
                }, {
                    title: '催收时间',
                    field: 'createDatetime',
                    type: 'date'
                }]
            }
        }, {
            title: '催收方式',
            field: 'collectionWay',
            type: 'select',
            key: 'collection_way',
            required: true,
            readonly: true
        }, {
            title: '催收对象',
            field: 'collectionTarget',
            type: 'select',
            key: 'collection_target',
            multiple: true,
            required: true,
            readonly: true
        }, {
            title: '催收过程',
            field: 'collectionProcess',
            type: 'select',
            key: 'collection_process',
            required: true,
            readonly: true
        }, {
            title: '客户意愿',
            field: 'collectionWish',
            type: 'select',
            key: 'collection_wish',
            required: true,
            readonly: true
        }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
            _keys: ['repayPlan', 'costList'],
            options: {
                noSelect: true,
                fields: [{
                    title: '费用项',
                    field: 'item'
                }, {
                    title: '金额（元）',
                    field: 'amount',
                    amount: true
                }, {
                    title: '发生时间',
                    field: 'payDatetime',
                    type: 'date'
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }, {
            title: '催收情况说明',
            field: 'collectionProcessNote',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630539
            });
    }
}

export default OverdueListProcessAddedit;
