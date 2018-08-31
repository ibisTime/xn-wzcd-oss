import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/companySettlement/companySettlement-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    formatDate,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizCompanySettlementAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class CompanySettlementAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '历史处理记录',
            field: 'list',
            type: 'o2m',
            listCode: 632357,
            params: {
                repaybizCode: this.code
            },
            options: {
                noSelect: true,
                fields: [{
                    title: '处理意见',
                    field: 'remark'
                }, {
                    title: '更新人',
                    field: 'updaterName'
                }, {
                    title: '更新时间',
                    field: 'updateDatetime',
                    type: 'date'
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

export default CompanySettlementAddEdit;