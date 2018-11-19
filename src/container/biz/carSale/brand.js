import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/brand';
import { lowerFrame, onShelf } from 'api/biz';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.bizBrand,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Brand extends React.Component {
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true
    }, {
      title: '字母序号',
      field: 'letter'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '最新修改人',
      field: 'updaterName'
    }, {
      title: '最新修改时间',
      field: 'updateDatetime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630405,
      btnEvent: {
        // 修改
        edit: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status === '1') {
            showWarnMsg('该状态不可修改');
          } else {
            this.props.history.push(`/biz/brand/addedit?code=${key[0]}`);
          }
        },
        // 下架
        lower: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status !== '1') {
            showWarnMsg('该状态不可下架');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定下架？',
              onOk: () => {
                this.props.doFetching();
                return lowerFrame(key[0]).then(() => {
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
        },
        // 上架
        onShelf: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else if (item[0].status === '1') {
            showWarnMsg('该状态不可上架');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定上架？',
              onOk: () => {
                this.props.doFetching();
                return onShelf(key[0]).then(() => {
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
        },
        // 刷新
        refresh: () => {
          Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: '确定刷新数据吗？',
            onOk: () => {
              this.props.doFetching();
              return fetch(630408).then(() => {
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

export default Brand;
