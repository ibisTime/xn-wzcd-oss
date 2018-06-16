import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/moneyCheck-compBill';
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
    state => state.loanAdvMoneyCompBill, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class AdvMoneyCompBill extends React.Component {
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
            field: 'code',
            amount: true,
            readonly: true
        }, {
            title: '已垫资金额',
            field: '22',
            amount: true,
            readonly: true
        }, {
            title: '未垫资金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '垫资客户',
            field: 'loanBankName',
            type: 'o2m',
            options: {
                delete: true,
                fields: [{
                    title: '客户姓名',
                    field: '33'
                }, {
                    title: '贷款金额',
                    field: '44',
                    amount: true
                }, {
                    title: '手续费',
                    field: '44',
                    amount: true
                }, {
                    title: '手续费收取方式',
                    field: '44',
                    type: 'select',
                    key: '444'
                }, {
                    title: 'GPS费',
                    field: '44',
                    amount: true
                }, {
                    title: 'GPS费收取方式',
                    field: '44',
                    type: 'select',
                    key: '444'
                }, {
                    title: '应退按揭款',
                    field: '44',
                    amount: true
                }]
            }
        }, {
            title: '垫资金额',
            field: '3333',
            amount: true,
            readonly: true
        }, {
            title: '意见说明',
            field: 'makeBillNote'
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
                fetch(632174, params).then(() => {
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

export default AdvMoneyCompBill;