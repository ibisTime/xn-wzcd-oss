import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/card-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper,
  beforeDetail
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
  state => state.loanstoolsCardAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class CancelAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '客户姓名',
      field: 'companyCode',
      select: true,
      requied: true
    }, {
      title: '作废原因',
      field: 'receiptBank',
      requied: true
    }, {
      title: '预算单',
      field: 'receiptAccount'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632106
    });
  }
}

export default CancelAddedit;