import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/basis/oilpercentage-addedit';
import {
  getQueryString,
  getUserId,
  showWarnMsg
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.basisOilpercentageAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class OilpercentageAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '参数名',
        field: 'remark',
        readonly: true
    }, {
        title: '参数值',
        field: 'cvalue'
    }, {
        title: '更新时间',
        field: 'updateDatetime',
        type: 'datetime',
        readonly: true
    }];
    return this.props.buildDetail({
        fields,
        key: 'id',
        code: this.code,
        view: this.view,
        editCode: '630042',
        detailCode: '630046'
    });
  }
}

export default OilpercentageAddedit;
