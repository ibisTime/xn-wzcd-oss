import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/takeEstimate-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsTakeEstimateCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TakeEstimateCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyName',
            readonly: true
        }, {
            title: '打款金额',
            field: 'payAmount',
            amount: true,
            readonly: true
        }, {
            title: '垫资总额',
            field: 'dzAmount',
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
            formatter: (v, d) => {
                return (d.payAmount - d.dzAmount) / 1000;
            },
            readonly: true
        }, {
            title: '收款金额',
            field: 'collectionAmount',
            required: true,
            amount: true
        }, {
            title: '收款款银行',
            field: 'collectionBank',
            type: 'select',
            listCode: 632037,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '收款账号',
            field: 'collectionAccount',
            required: true,
            bankCard: true
        }, {
            title: '收款时间',
            field: 'collectionDatetime',
            type: 'date'
        }, {
            title: '备注',
            field: 'collectionRemark'
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
                    params.code = this.code;
                    params.operator = getUserId();
                    fetch(632103, params).then(() => {
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

export default TakeEstimateCertain;