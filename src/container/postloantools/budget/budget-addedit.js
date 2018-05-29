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
            field: 'companyCode'
        }, {
            title: '业务编号',
            field: 'receiptBank'
        }, {
            title: '预算金额',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '预算金额大写',
            field: 'budgetAmount'
        }, {
            title: '收款人姓名',
            field: 'useDatetime'
        }, {
            title: '收款人开户行',
            field: 'useDatetime'
        }, {
            title: '收款人账号',
            field: 'useDatetime'
        }, {
            title: '申请人',
            field: 'useDatetime'
        }, {
            title: '申请时间',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '是否加急',
            field: 'useDatetime'
        }, {
            title: '代偿说明',
            field: 'useDatetime'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106
        });
    }
}

export default budgetAddEdit;