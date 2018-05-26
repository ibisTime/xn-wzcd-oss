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
import { DetailWrapper } from 'common/js/build-detail';

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
        field: 'companyCode',
        readonly: true
    }, {
        title: '业务编号',
        field: 'receiptBank',
        readonly: true
    }, {
        title: '身份证',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '贷款金额',
        field: 'receiptAccount',
        amount: true,
        readonly: true
    }, {
        title: '贷款银行',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '征信结果',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '预算单',
        field: 'receiptAccount',
        readonly: true
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
          fetch(632100, params).then(() => {
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
