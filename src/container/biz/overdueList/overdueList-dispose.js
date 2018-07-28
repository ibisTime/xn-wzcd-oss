import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-dispose';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListDispose, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListDispose extends React.Component {
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
            field: 'overdueAmount',
            amount: true,
            readonly: true
        }, {
            title: '处理历史',
            field: 'remindLogList',
            type: 'o2m',
            options: {
                fields: [{
                    title: '催收方式',
                    field: 'way',
                    type: 'select',
                    select: true,
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
                    type: 'datetime'
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
            title: '催收结果',
            field: 'collectionResult',
            type: 'select',
            key: 'collection_result',
            required: true
        }, {
            title: '是否提供押金',
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
            required: true
        }, {
            title: '违约押金',
            field: 'overdueDeposit',
            amount: true,
            number: true,
            required: true
        }, {
            title: '实际还款金额',
            field: 'realRepayAmount',
            amount: true,
            number: true,
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
            field: 'collectionNote',
            type: 'textarea',
            normalArea: true,
            required: true
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
                        param.code = this.code;
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(630532, param).then(() => {
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

export default OverdueListDispose;
