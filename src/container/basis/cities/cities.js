import React from 'react';
import { Modal } from 'antd';
import { setTableData, setPagination, setBtnList, setSearchParam,
  clearSearchParam, doFetching, cancelFetching, setSearchData } from '@redux/basis/cities';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.basisCities,
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
class Cities extends React.Component {
  render() {
    const fields = [{
        title: '城市ID',
        field: 'cityId'
    }, {
        title: '城市名称',
        field: 'cityName'
    }, {
        title: '所属省份ID',
        field: 'provId'
    }, {
        title: '所属省份名称',
        field: 'provName'
    }, {
        title: '更新时间',
        field: 'createDatetime',
        type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630445,
      rowKey: 'id',
      btnEvent: {
        refresh: () => {
          Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: '确定刷新数据吗？',
            onOk: () => {
              this.props.doFetching();
              return fetch(630440).then(() => {
                showSucMsg('操作成功');
                setTimeout(() => {
                  this.props.getPageData();
                }, 500);
              }).catch(() => {
                this.props.cancelFetching();
              });
            }
          });
        }
      }
    });
  }
}

export default Cities;
