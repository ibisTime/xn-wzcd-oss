import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-resultAddedit';
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

@DetailWrapper(state => state.bizOverdueListResultAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListResultAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isOverdueDeposit = true;
        this.isRealRepayAmount = true;
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.repayBiz.budgetOrder.customerName;
            },
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.repayBiz.budgetOrder.code;
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
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayBiz.loanAmount);
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => {
                return d.repayBiz.loanBankName;
            },
            readonly: true
        }, {
            title: '逾期金额',
            field: 'restOverdueAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayBiz.restOverdueAmount);
            },
            readonly: true
        }, {
            title: '处理历史',
            field: 'overdueTreatmentList',
            type: 'o2m',
            options: {
                noSelect: true,
                fields: [{
                    title: '催收方式',
                    field: 'collectionWay',
                    type: 'select',
                    key: 'collection_way'
                }, {
                    title: '催收对象',
                    field: 'collectionTarget',
                    type: 'select',
                    key: 'collection_target'
                }, {
                    title: '催收过程',
                    field: 'collectionProcess',
                    type: 'select',
                    key: 'collection_process'
                }, {
                    title: '客户意愿',
                    field: 'collectionWish',
                    type: 'select',
                    key: 'collection_wish'
                }, {
                    title: '催收过程说明',
                    field: 'collectionProcessNote'
                }, {
                    title: '催收结果',
                    field: 'collectionResult',
                    type: 'select',
                    key: 'collection_result'
                }, {
                    title: '催收结果说明',
                    field: 'collectionResultNote'
                }]
            }
        }, {
            title: '催收结果',
            field: 'collectionResult',
            type: 'select',
            key: 'collection_result',
            onChange: (v) => {
                if (v === 'part_repay') {
                    this.isRealRepayAmount = false;
                } else {
                    this.isRealRepayAmount = true;
                }
            },
            required: true,
            readonly: true
        }, {
            title: '是否提供保证金',
            field: 'depositIsProvide',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            onChange: (v) => {
                if (v === '1') {
                    this.isOverdueDeposit = false;
                } else {
                    this.isOverdueDeposit = true;
                }
            },
            required: true,
            readonly: true
        }, {
            title: '违约保证金',
            field: 'overdueDeposit',
            amount: true,
            number: true,
            required: true,
            formatter: (v, d) => {
                return '';
            },
            hidden: this.isOverdueDeposit,
            readonly: true
        }, {
            title: '实际还款金额',
            field: 'realRepayAmount',
            amount: true,
            number: true,
            required: true,
            formatter: (v, d) => {
                return '';
            },
            hidden: this.isRealRepayAmount,
            readonly: true
        }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
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
            field: 'collectionResultNote',
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
                detailCode: 630541
            });
    }
}

export default OverdueListResultAddedit;