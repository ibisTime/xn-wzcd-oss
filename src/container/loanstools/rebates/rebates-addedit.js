import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/rebates-addedit';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsRebatesAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class RebatesAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '缘由',
        field: 'companyCode',
        readonly: true
    }, {
        title: '总金额',
        field: 'receiptAccount',
        amount: true,
        readonly: true
    }, {
        title: '客户列表',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '申请公司',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '申请人',
        field: 'receiptAccount',
        readonly: true
    }, {
        title: '申请时间',
        field: 'collectionDatetime',
        type: 'date',
        readonly: true
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

export default RebatesAddedit;
