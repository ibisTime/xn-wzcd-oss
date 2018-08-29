import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/budget-check';
import {
  getQueryString,
  showSucMsg,
  getUserId,
  moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsBudgetCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class budgetCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '代偿性质',
            field: 'type',
            type: 'select',
            key: 'replace_repay_type',
            readonly: true
        }, {
            title: '业务编号',
            field: 'bizCode',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '预算金额',
            field: 'amount',
            amount: true,
            readonly: true
        }, {
            title: '收款人姓名',
            field: 'receiptRealName',
            readonly: true
        }, {
            title: '收款人身份证',
            field: 'idNo',
            formatter: (v, d) => {
                return d.budgetOrder.idNo;
            },
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'receiptBank',
            type: 'select',
            listCode: '632037',
            keyName: 'bankCode',
            valueName: 'bankName',
            readonly: true
        }, {
            title: '收款人账号',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.budgetOrder.loanAmount);
            },
            amount: true,
            readonly: true
        }, {
            title: '是否加急',
            field: 'isUrgent',
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
            title: '申请说明',
            field: 'applyNote',
            readonly: true
        }, {
            title: '审核意见',
            field: 'financeCheckNote',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632326,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632321, param).then(() => {
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
                param.approveNote = this.projectCode;
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632321, param).then(() => {
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

export default budgetCheck;