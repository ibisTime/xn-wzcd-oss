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
      title: '业务公司',
      field: 'companyCode'
    }, {
      title: '收款银行',
      field: 'receiptBank'
    }, {
      title: '收款账号',
      field: 'receiptAccount'
    }, {
      title: '预算金额',
      field: 'budgetAmount',
      amount: true
    }, {
      title: '用款日期',
      field: 'useDatetime',
      type: 'date'
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
