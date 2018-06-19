import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/takeEstimate-addedit';
import {
    getQueryString,
    showSucMsg,
    getUserId,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsTakeEstimateAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TakeEstimateAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyCode',
            readonly: true
        }, {
            title: '打款金额',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '垫资总额',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '垫资日期',
            field: 'dzDatetime',
            readonly: true,
            type: 'date'
        }, {
            title: '应收金额',
            field: 'receiptAccount',
            readonly: true,
            amount: true,
            formatter: (v, data) => {
                return moneyFormat(data.loanAmount);
            }
        }, {
            title: '收款金额',
            field: 'receiptAccount',
            required: true,
            amount: true
        }, {
            title: '11',
            field: 'receiptAccount',
            required: true,
            amount: true
        }, {
            title: '收款账号',
            field: 'receiptAccount'
        }, {
            title: '收款时间',
            field: 'dzDatetime',
            type: 'date',
            amount: true
        }, {
            title: '备注',
            field: 'receiptAccount'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    fetch(632102, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default TakeEstimateAddedit;