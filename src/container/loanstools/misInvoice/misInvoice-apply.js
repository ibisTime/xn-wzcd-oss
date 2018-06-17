import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/misInvoice-apply';
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
  state => state.loanstoolsMisInvoiceApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class MisInvoiceApply extends React.Component {
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
      field: 'code',
      readonly: true
    }, {
      title: '身份证',
      field: '22',
      readonly: true
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true,
      readonly: true
    }, {
      title: '贷款银行',
      field: 'loanBankName',
      readonly: true
    }, {
      title: '征信结果',
      field: '33',
      readonly: true
    }, {
      title: '预算单',
      field: '44',
      readonly: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '保存',
        check: true,
        handler: (params) => {
          params.code = this.code;
          params.operator = getUserId();
          params.dealType = '0';
          params.loanAmount = this.props.pageData.loanAmount;
          this.props.doFetching();
          fetch(632230, params).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
        }
      }, {
        title: '发送',
        check: true,
        handler: (params) => {
          params.code = this.code;
          params.operator = getUserId();
          params.dealType = '1';
          params.loanAmount = this.props.pageData.loanAmount;
          this.props.doFetching();
          fetch(632230, params).then(() => {
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

export default MisInvoiceApply;