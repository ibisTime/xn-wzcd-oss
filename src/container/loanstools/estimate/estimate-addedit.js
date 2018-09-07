import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/estimate-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsEstimateAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class EstimateAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '预算单号',
      field: 'code'
    }, {
      title: '业务公司',
      field: 'companyName'
    }, {
      title: '收款银行',
      field: 'bankName'
    }, {
      title: '收款账号',
      field: 'bankcardNumber'
    }, {
      title: '预算金额',
      field: 'budgetAmount',
      amount: true
    }, {
      title: '用款日期',
      field: 'useDatetime',
      type: 'date'
    }, {
      title: '用款日期',
      field: 'useDatetime',
      type: 'date'
    }, {
      title: '打款时间',
      field: 'payDatetime',
      search: true,
      type: 'date'
    }, {
      title: '打款金额',
      field: 'payAmount',
      amount: true
    }, {
      title: '申请人',
      field: 'applyUserName',
      search: true
    }, {
      title: '申请时间',
      field: 'applyDatetime',
      search: true,
      type: 'date'
    }, {
      title: '办理状态',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      params: {
        type: '005'
      },
      keyName: 'code',
      valueName: 'name',
      search: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632106
    });
  }
}

export default EstimateAddEdit;
