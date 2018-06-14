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
        field: 'companyCode',
        readonly: true
    }, {
        title: '银行卡号',
        field: 'budgetAmount',
        readonly: true
    }, {
        title: '制卡银行',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '状态',
        field: 'status',
        readonly: true
    }, {
        title: '跟新人',
        field: 'useDatetime',
        readonly: true
    }, {
        title: '备注',
        field: 'remark',
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

export default CancelApply;
