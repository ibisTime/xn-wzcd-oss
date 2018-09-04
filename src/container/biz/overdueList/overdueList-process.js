import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-process';
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

@DetailWrapper(state => state.bizOverdueListProcess, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListProcess extends React.Component {
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
                    type: 'checkbox',
                    multiple: true,
                    key: 'collection_target'
                }, {
                    title: '催收过程',
                    field: 'collectionProcess',
                    type: 'checkbox',
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
            title: '催收方式',
            field: 'collectionWay',
            type: 'select',
            key: 'collection_way',
            required: true
        }, {
            title: '催收对象',
            field: 'collectionTarget',
            type: 'select',
            key: 'collection_target',
            multiple: true,
            required: true
        }, {
            title: '催收过程',
            field: 'collectionProcess',
            type: 'select',
            key: 'collection_process',
            required: true
        }, {
            title: '客户意愿',
            field: 'collectionWish',
            type: 'select',
            key: 'collection_wish',
            required: true
        }, {
            title: '清收成本清单',
            field: 'costList',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
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
            normalArea: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541,
                buttons: [{
                    title: '确定',
                    handler: (param) => {
                        let list = this.props.o2mSKeys.costList;
                        let len = list.length;
                        let length = param.costList.length;
                        let arr = [];
                        // if(!len) {
                        //     showWarnMsg('请选择至少一条清收成本清单');
                        //     return;
                        // }
                        for(let i = 0; i < len; i++) {
                            for(let j = 0; j < length; j++) {
                                if (list[i] === param.costList[j].code) {
                                    arr.push(param.costList[j]);
                                }
                            }
                        }
                        param.costList = arr;
                        param.code = this.code;
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630537, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    },
                    check: true,
                    type: 'primary'
                }, {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }]
            });
    }
}

export default OverdueListProcess;
