import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/budget-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsBudgetAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class budgetAddEdit extends React.Component {
        constructor(props) {
            super(props);
            this.code = getQueryString('code', this.props.location.search);
            this.view = !!getQueryString('v', this.props.location.search);
        }
        render() {
            const fields = [{
                    title: '代偿性质',
                    field: 'type',
                    type: 'select',
                    key: 'replace_repay_type'
                }, {
                    title: '业务编号',
                    field: 'code1',
                    formatter: (v, d) => {
                        return d.budgetOrder.code;
                    }
                }, {
                    title: '预算金额',
                    field: 'amount',
                    amount: true
                }, {
                    title: '收款人姓名',
                    field: 'receiptRealName'
                }, {
                    title: '收款人开户行',
                    field: 'receiptBank',
                    type: 'select',
                    listCode: '632037',
                    keyName: 'bankCode',
                    valueName: 'bankName'
                }, {
                    title: '收款人账号',
                    field: 'receiptAccount'
                }, {
                    title: '是否加急',
                    field: 'isUrgent',
                    type: 'select',
                    data: [{
                        key: '0',
                        value: '否'
                    }, {
                        key: '1',
                        value: '是'
                    }],
                    keyName: 'key',
                    valueName: 'value'
                }, {
                    title: '申请说明',
                    field: 'applyNote'
                }, {
                    title: '流程日志',
                    field: 'list',
                    type: 'o2m',
                    listCode: 630176,
                    rowkey: 'id',
                    params: {
                        refOrder: this.code
                    },
                    options: {
                        fields: [{
                            title: '操作人',
                            field: 'operatorName'
                        }, {
                            title: '开始时间',
                            field: 'startDatetime',
                            type: 'datetime'
                        }, {
                            title: '结束时间',
                            field: 'endDatetime',
                            type: 'datetime'
                        }, {
                            title: '花费时长',
                            field: 'speedTime'
                        }, {
                            title: '审核意见',
                            field: 'dealNote'
                        }, {
                            title: '当前节点',
                            field: 'dealNode',
                            type: 'select',
                            listCode: 630147,
                            keyName: 'code',
                            valueName: 'name'
                        }]
                    }
                }];
                return this.props.buildDetail({
                    fields,
                    code: this.code,
                    view: this.view,
                    detailCode: 632326
                });
            }
        }

        export default budgetAddEdit;