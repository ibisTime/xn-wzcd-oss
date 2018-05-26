import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/misInvoice-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsMisInvoiceCertain, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class MisInvoiceCertain extends React.Component {
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
    }, {
        title: '原应退按揭款',
        field: 'receiptAccount',
        readonly: true,
        amount: true
    }, {
        title: '新应退按揭款',
        field: 'receiptAccount',
        readonly: true,
        amount: true
    }, {
        title: '付款金额',
        field: 'receiptAccount',
        required: true,
        amount: true
    }, {
        title: '付款时间',
        field: 'collectionDatetime',
        required: true,
        type: 'datetime'
    }, {
        title: '付款银行',
        field: 'receiptAccount',
        required: true
    }, {
        title: '付款账号',
        field: 'receiptAccount',
        required: true
    }, {
        title: '水单',
        field: 'receiptAccount',
        required: true,
        type: 'img'
    }, {
        title: '收款金额',
        field: 'receiptAccount',
        required: true,
        amount: true
    }, {
        title: '收款时间',
        field: 'collectionDatetime',
        required: true,
        type: 'datetime'
    }, {
        title: '收款银行',
        field: 'receiptAccount',
        required: true
    }, {
        title: '付款账号',
        field: 'receiptAccount',
        required: true
    }, {
        title: '水单',
        field: 'receiptAccount',
        required: true,
        type: 'img'
    }, {
        title: '备注',
        field: 'remark'
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

export default MisInvoiceCertain;
