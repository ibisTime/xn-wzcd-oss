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
            field: 'code',
            type: 'select',
            listCode: 630542,
            params: {
                repayBizCode: this.code
            },
            keyName: 'code',
            valueName: 'code'
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