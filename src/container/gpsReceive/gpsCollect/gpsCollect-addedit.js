import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/gpsReceive/gpsCollect-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.dataReceiveGpsCollectAddEdit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class GpsCollectAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '客户姓名',
        field: 'userName'
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'logistics_type'
    }, {
        title: '传递方式',
        field: 'sendType',
        type: 'select',
        data: [{
            key: '1',
            value: '线下'
        }, {
            key: '2',
            value: '快递'
        }],
        keyName: 'key',
        valueName: 'value',
        required: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'logistics_type'
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company'
    }, {
        title: '快递单号',
        field: 'logisticsCode'
    }, {
        title: '发货时间',
        field: 'sendDatetime',
        type: 'datetime'
    }, {
        title: '补件原因',
        field: 'supplementReason',
        required: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156
      });
  }
}

export default GpsCollectAddEdit;
