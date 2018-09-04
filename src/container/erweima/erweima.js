import React from 'react';
// const QRCode = require("js-qrcode");
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/erweima/erweima';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.erweimaErweima, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class Erweima extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
    const fields = [{
        title: '关联的业务编号',
        field: 'codeList',
        type: 'select',
        pageCode: 632155,
        params: {
            status: '1'
        },
        keyName: 'bizCode',
        valueName: '{{bizCode.DATA}}-{{customerName.DATA}}'
    }];
    return this
      .props
      .buildDetail({
        fields,
        detailCode: 632156,
        buttons: [{
            title: '下载',
            handler: () => {
            },
            check: true
        }, {
            title: '返回',
            handler: () => {
                this.props.history.go(-1);
            }
        }]
      });
  }
}

export default Erweima;
