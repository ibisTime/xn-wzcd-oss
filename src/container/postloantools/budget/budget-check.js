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
  getUserId
} from 'common/js/util';
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
            field: 'companyCode',
            readonly: true
        }, {
            title: '业务编号',
            field: 'receiptBank',
            readonly: true
        }, {
            title: '预算金额',
            field: 'receiptAccount',
            amount: true,
            readonly: true
        }, {
            title: '预算金额大写',
            field: 'budgetAmount',
            readonly: true
        }, {
            title: '收款人姓名',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '收款人账号',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '申请人',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '申请时间',
            field: 'useDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '是否加急',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '代偿说明',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '审核说明',
            field: 'financeCheckNote',
            readonly: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632106,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.approveUser = getUserId();
                this.props.doFetching();
                fetch(632101, param).then(() => {
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
                param.approveUser = getUserId();
                this.props.doFetching();
                fetch(632101, param).then(() => {
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