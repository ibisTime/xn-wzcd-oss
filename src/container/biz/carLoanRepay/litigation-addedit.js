import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    formatDate
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
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
            field: 'caseNumber',
            formatter: (v, d) => {
                return d.judgeList[0].caseNumber;
            },
            required: true,
            readonly: true
        }, {
            title: '原告',
            field: 'plaintiff',
            formatter: (v, d) => {
                return d.judgeList[0].plaintiff;
            },
            required: true,
            readonly: true
        }, {
            title: '被告',
            field: 'defendant',
            formatter: (v, data) => {
                return data.realName;
            },
            required: true,
            readonly: true
        }, {
            title: '诉讼标的',
            field: 'caseSubject',
            formatter: (v, d) => {
                return d.judgeList[0].caseSubject;
            },
            required: true,
            readonly: true
        }, {
            title: '涉案车辆',
            field: 'caseCar',
            formatter: (v, d) => {
                return d.judgeList[0].caseCar;
            },
            required: true,
            readonly: true,
            hidden: true
        }, {
            title: '起诉日期',
            field: 'caseStartDatetime',
            formatter: (v, d) => {
                return formatDate(d.judgeList[0].caseStartDatetime);
            },
            required: true,
            readonly: true
        }, {
            title: '起诉附件',
            field: 'casePdf',
            formatter: (v, d) => {
                return d.judgeList[0].casePdf;
            },
            type: 'img',
            readonly: true
        }, {
            title: '流程日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
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
                    title: '审核说明',
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
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521
            });
    }
}

export default litigationAddedit;