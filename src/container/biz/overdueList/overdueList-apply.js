import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-apply';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListApply extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('staffCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.arr = [{
            key: '0',
            value: '否'
        }, {
            key: '1',
            value: '是'
        }];
    }
    render() {
        const fields = [{
            field: '业务编号',
            value: this.code
        }, {
            title: '客户姓名',
            field: 'name',
            readonly: true,
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true,
            formatter: (v, d) => {
                return d.user.idNo;
            }
        }, {
            title: '选择预算单',
            field: '111',
            type: 'select',
            listCode: 632107,
            keyName: 'code',
            valueName: '{{code.DATA}}-{{applyUser.DATA}}',
            required: true
        }, {
            title: '代偿类型',
            field: 'type',
            formatter: (v, d) => {
                return d.replaceRepayApply.type;
            },
            readonly: true
        }, {
            title: '预算金额',
            field: 'amount',
            formatter: (v, d) => {
                return moneyFormat(d.replaceRepayApply.amount);
            },
            readonly: true
        }, {
            title: '预算金额大写',
            field: 'moneyUppercase',
            formatter: (v, d) => {
                return moneyUppercase(moneyFormat(d.replaceRepayApply.amount));
            },
            readonly: true
        }, {
            title: '收款人姓名',
            field: 'receiptRealName',
            formatter: (v, d) => {
                return d.replaceRepayApply.receiptRealName;
            },
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'receiptBank',
            formatter: (v, d) => {
                return d.replaceRepayApply.receiptBankName;
            },
            readonly: true
        }, {
            title: '收款人账号',
            field: 'receiptAccount',
            formatter: (v, d) => {
                return d.replaceRepayApply.receiptAccount;
            },
            readonly: true
        }, {
            title: '是否加急',
            field: 'isUrgent',
            formatter: (v, d) => {
                let index = d.replaceRepayApply.isUrgent;
                let isUrgent = this.arr[index].value;
                return isUrgent;
            },
            readonly: true
        }, {
            title: '代偿说明',
            field: 'remark',
            formatter: (v, d) => {
                return d.replaceRepayApply.remark;
            },
            readonly: true
        }, {
            title: '与我司过往是否有纠纷',
            field: 'isPlatIssue',
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
            title: '代偿后采取的方式',
            field: 'takeWay',
            type: 'select',
            key: 'take_way'
        }, {
            title: '申请代偿理由',
            field: 'applyReason'
        }, {
            title: '暂缓起诉(天)',
            field: 'deferDays',
            number: true
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

export default OverdueListApply;
