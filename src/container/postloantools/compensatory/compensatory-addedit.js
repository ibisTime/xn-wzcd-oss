import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/compensatory-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsCompensatoryAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class compensatoryAddedit extends React.Component {
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
            title: '偿还类型',
            field: 'budgetAmount'
        }, {
            title: '预算金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '预算金额大写',
            field: 'useDatetime'
        }, {
            title: '收款人姓名',
            field: 'useDatetime'
        }, {
            title: '收款人开户行',
            field: 'useDatetime'
        }, {
            title: '收款人账号',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '是否加急',
            field: 'useDatetime'
        }, {
            title: '代偿说明',
            field: 'useDatetime'
        }, {
            title: '已代偿金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '代偿清单',
            field: 'useDatetime'
        }, {
            title: '与我司过往是否有纠纷',
            field: 'useDatetime'
        }, {
            title: '垫款后采取的方式',
            field: 'useDatetime'
        }, {
            title: '暂缓起诉(天)',
            field: 'useDatetime'
        }, {
            title: '申请垫款理由',
            field: 'useDatetime'
        }, {
            title: '欠款人及配偶信息',
            field: 'useDatetime'
        }, {
            title: '担保人信息及其名下财产信息',
            field: 'useDatetime'
        }, {
            title: '特殊情况说明',
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

export default compensatoryAddedit;