import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/advMoney-areaCheck';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyUppercase,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanAdvMoneyAreaCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class AdvMoneyAreaCheck extends React.Component {
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
            title: '业务公司',
            field: 'bizCompanyName',
            readonly: true
        }, {
            title: '汽车经销商',
            field: 'carDealerName',
            readonly: true
        }, {
            title: '用款小写',
            field: 'useAmount',
            amount: true,
            readonly: true
        }, {
            title: '用款大写',
            field: 'money',
            formatter: (v, d) => {
                return moneyUppercase(moneyFormat(d.useAmount));
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            readonly: true
        }, {
            title: '收款单位名称',
            field: '111',
            readonly: true,
            hidden: true
        }, {
            title: '收款银行账号',
            field: 'collectionAccountNo',
            readonly: true
        }, {
            title: '收款银行',
            field: 'collectBankName',
            readonly: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632186,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632171, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true,
              type: 'primary'
            }, {
              title: '不通过',
              handler: (param) => {
                param.approveResult = '0';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632171, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default AdvMoneyAreaCheck;
