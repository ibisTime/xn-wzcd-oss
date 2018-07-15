import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsApplyGpsAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '申领类型',
        field: 'type',
        type: 'select',
        data: [{
            key: '1',
            value: '公司'
        }, {
            key: '2',
            value: '个人'
        }],
        keyName: 'key',
        valueName: 'value'
    }, {
      title: '所属公司',
      field: 'companyName'
    }, {
      title: '申领个数',
      field: 'applyCount'
    }, {
      title: '申领人',
      field: 'applyUserName'
    }, {
      title: 'GPS列表',
      field: 'gpsList',
      type: 'o2m',
      options: {
        fields: [{
          title: 'GPS设备号',
          field: 'gpsDevNo'
        }]
      }
    }, {
      title: '申领原因',
      field: 'applyReason'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716
    });
  }
}

export default applyGpsAddedit;
