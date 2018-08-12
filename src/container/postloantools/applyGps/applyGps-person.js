import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/postloantools/applyGps-person';
import {
  getQueryString,
  getCompanyCode,
  getUserId,
  showSucMsg,
  showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
  state => state.postloantoolsApplyGpsPerson, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class applyGpsPerson extends React.Component {
  constructor(props) {
    super(props);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '申领个数',
      field: 'applyCount',
      number: true
    }, {
      title: '申请说明',
      field: 'applyReason'
    }];
    return this.props.buildDetail({
      fields,
      view: this.view,
      buttons: [{
        title: '确认',
        handler: (param) => {
          param.applyUser = getUserId();
          this.props.doFetching();
          fetch(632711, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default applyGpsPerson;