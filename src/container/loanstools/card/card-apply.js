import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/card-apply';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsCardApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class CancelApply extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '业务编号',
        field: 'code',
        readonly: true
    }, {
        title: '客户姓名',
        field: 'customerName',
        readonly: true
    }, {
        title: '银行卡号',
        field: 'bankCardNumber',
        readonly: true
    }, {
        title: '制卡银行',
        field: 'loanBankName',
        readonly: true
    }, {
        title: '状态',
        field: 'makeCardStatus',
        readonly: true
    }, {
        title: '更新人',
        field: 'makeCardOperator',
        readonly: true
    }, {
        title: '备注',
        field: 'makeCardRemark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          this.props.doFetching();
          params.operator = getUserId();
          fetch(632210, params).then(() => {
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

export default CancelApply;
