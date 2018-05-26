import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/node-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityNodeAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class NodeAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '节点信息',
      field: 'name'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 630156
    });
  }
}

export default NodeAddEdit;
