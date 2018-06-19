import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/misInvoice-checkTwo';
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
  state => state.loanstoolsMisInvoiceCheckTwo, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class MisInvoiceCheckTwo extends React.Component {
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
      field: 'inNo',
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
    }, {
      title: '备注',
      field: 'approveNote'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.operator = getUserId();
          this.props.doFetching();
          fetch(632232, param).then(() => {
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
        title: '重写预算单',
        handler: (param) => {
          showSucMsg('待完善');
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

export default MisInvoiceCheckTwo;