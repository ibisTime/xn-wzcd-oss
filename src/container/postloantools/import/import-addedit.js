import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/import-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsImportAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class ImportAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode'
        }, {
            title: '业务编号',
            field: 'receiptBank'
        }, {
            title: '身份证',
            field: 'receiptAccount'
        }, {
            title: '贷款金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'useDatetime'
        }, {
            title: '征信结果',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '预算单',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '还款计划表',
            field: 'useDatetime',
            type: 'date'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106
        });
    }
}

export default ImportAddEdit;