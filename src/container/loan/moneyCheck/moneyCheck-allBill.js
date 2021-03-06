import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/moneyCheck-allBill';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanMoneyCheckAllBill, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class AdvMoneyAllBill extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '垫资总金额',
            field: 'totalAdvanceFund',
            amount: true,
            readonly: true
        }, {
            title: '已垫资金额',
            field: 'hasAdvanceFund',
            amount: true,
            readonly: true
        }, {
            title: '未垫资金额',
            field: 'unAdvanceFund',
            amount: true,
            readonly: true
        }, {
            title: '垫资金额',
            field: 'payAmount',
            amount: true,
            readonly: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632186,
            buttons: [{
              title: '确认',
              check: true,
              handler: (params) => {
                this.props.doFetching();
                params.operator = getUserId();
                params.payAmount = this.props.pageData.payAmount;
                params.totalAdvanceFund = this.props.pageData.totalAdvanceFund;
                fetch(632173, params).then(() => {
                  showSucMsg('操作成功');
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                  this.props.cancelFetching();
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

export default AdvMoneyAllBill;