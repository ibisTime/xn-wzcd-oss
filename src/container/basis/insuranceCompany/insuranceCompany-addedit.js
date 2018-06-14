import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/basis/insuranceCompany-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper,
  beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
  state => state.basisInsuranceCompanyAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class InsuranceCompanyAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '公司名称',
      field: 'name',
      required: true
    }, {
      title: '联系人',
      field: 'contact',
      required: true
    }, {
      title: '联系电话',
      field: 'mobile',
      mobile: true,
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 632040,
      editCode: 632042,
      detailCode: 632047
    });
  }
}

export default InsuranceCompanyAddedit;