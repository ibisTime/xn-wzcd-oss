import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/handleApply';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  lowerFrameSys,
  onShelfSys
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizHandleApply,
    parentCode: state.menu.subMenuCode
  }), {
    setTableData,
    clearSearchParam,
    doFetching,
    setBtnList,
    cancelFetching,
    setPagination,
    setSearchParam,
    setSearchData
  }
)
class HandleApply extends React.Component {
  render() {
    const fields = [{
      title: '订单编号',
      field: 'code'
    }, {
      title: '申请人',
      field: 'userId'
    }, {
      title: '意向车辆',
      field: 'status',
      render: (v, d) => {
        return (d.brandName + d.carName + d.seriesName);
      }
    }, {
      title: '车辆总价',
      field: 'price',
      amount: true
    }, {
      title: '首付金额',
      field: 'sfAmount',
      amount: true
    }, {
      title: '申请时间',
      field: 'createDatetime',
      type: 'datetime'
    }, {
      title: '车贷计算器信息',
      field: 'saleDesc'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630435,
      searchParams: {
        status: '0'
      },
      btnEvent: {
        dispose: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/handleApply/check?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default HandleApply;