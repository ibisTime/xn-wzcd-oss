import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/import-plan';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsImportPlan, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class ImportPlan extends React.Component {
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
            title: '还款计划表',
            field: 'useDatetime',
            required: true,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {
                    x: 300
                },
                fields: [{
                        title: '期数',
                        field: 'subbranch'
                    },
                    {
                        title: '月供金额',
                        field: 'realname',
                        amount: true
                    },
                    {
                        title: '实还金额',
                        field: 'bankcardNumber',
                        amount: true
                    },
                    {
                        title: '逾期金额',
                        field: 'bankcardNumber',
                        amount: true
                    },
                    {
                        title: '催收回逾期金额',
                        field: 'bankcardNumber',
                        amount: true
                    },
                    {
                        title: '清收成本',
                        field: 'bankcardNumber',
                        amount: true
                    },
                    {
                        title: '代偿金额',
                        field: 'bankcardNumber',
                        amount: true
                    },
                    {
                        title: '代偿时间',
                        field: 'bankcardNumber',
                        type: 'date'
                    },
                    {
                        title: '收回代偿金额',
                        field: 'bankcardNumber',
                        amount: true
                    },
                    {
                        title: '收回代偿时间',
                        field: 'bankcardNumber',
                        type: 'date'
                    }
                ]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106
        });
    }
}

export default ImportPlan;