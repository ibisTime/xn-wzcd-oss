import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/invoice-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.loanstoolsInvoiceAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class InvoiceAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
        }, {
            title: '业务公司',
            field: 'companyCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'companyCode',
            search: true
        }, {
            title: '贷款额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '垫资日期',
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '发保和预警天数',
            field: 'name',
            search: true
        }, {
            title: '车辆发票价',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '新发票价格',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '状态',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '更新人',
            field: 'budgetAmount'
        }, {
            title: '跟新时间',
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'budgetAmount',
            amount: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106
        });
    }
}

export default InvoiceAddedit;