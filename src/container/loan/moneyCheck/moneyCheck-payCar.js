import React from 'react';
import moment from 'moment';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/moneyCheck-payCar';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    dateFormat,
    moneyFormat,
    getCompanyCode,
    moneyReplaceComma
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanMoneyCheckPayCar, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class AdvMoneyPayCar extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'budgetCode',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            formatter: (v, d) => {
                return d.budgetOrder.idNo;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.budgetOrder.loanAmount);
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '应退按揭款',
            field: 'useAmount',
            amount: true,
            readonly: true
        }, {
            title: '垫资金额',
            field: 'advanceFundAmount',
            formatter: (v, d) => {
                return moneyFormat(d.useAmount);
            },
            amount: true,
            required: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date',
            formatter: (v) => {
              return this.props.isLoaded && v ? moment(dateFormat(v)) : moment();
            },
            required: true
        }, {
            title: '付款账号',
            field: 'payBankcardCode',
            type: 'select',
            listCode: 632007,
            params: {
                companyCode: getCompanyCode(),
                type: '1'
            },
            initValue: true,
            keyName: 'code',
            valueName: 'bankcardNumber',
            required: true
        }, {
            title: '银行回单',
            field: 'billPdf',
            type: 'img',
            required: true
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
                fetch(632175, params).then(() => {
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

export default AdvMoneyPayCar;
