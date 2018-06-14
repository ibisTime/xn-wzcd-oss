import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import { isUndefined } from 'common/js/util';

class GpsEdit extends React.Component {
  render() {
    const options = {
      fields: [{
        field: 'code',
        hidden: true
      }, {
        field: 'gpsCode',
        title: 'GPS',
        type: 'select',
        data: [{
          dkey: '0',
          dvalue: '设备0 - 无线',
          type: 0
        }, {
          dkey: '1',
          dvalue: '设备1 - 有线',
          type: 1
        }, {
          dkey: '2',
          dvalue: '设备2 - 有线',
          type: 1
        }],
        keyName: 'dkey',
        valueName: 'dvalue',
        required: true
      }],
      buttons: [{
        title: '确认',
        handler: (params, doFetching, cancelFetching, handleCancel, selectData) => {
          params.code = isUndefined(params.code) ? new Date().getTime() : params.code;
          let item = selectData.gpsCode.find(v => v.dkey === params.gpsCode);
          params.type = item.type;
          handleCancel();
          this.props.updateGps(params);
        },
        check: true
      }],
      useData: this.props.gpsData
    };
    return (
      <ModalDetail
        title='GPS'
        visible={this.props.gpsdVisible}
        hideModal={() => this.props.setGpsVisible(false)}
        options={options} />
    );
  }
}

export default GpsEdit;
