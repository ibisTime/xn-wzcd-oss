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
} from '@redux/biz/carSeries';
import { listWrapper } from 'common/js/build-list';
import OnOrDownShelf from 'component/onordownshelf/onordownshelf';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrameSys, onShelfSys } from 'api/biz';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.bizCarSeries,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CarSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfVisible: false,
      selectKey: ''
    };
  }
  setShelfVisible = (shelfVisible) => {
    this.setState({ shelfVisible });
    setTimeout(() => {
        this.props.getPageData();
    }, 500);
  }
  render() {
    const fields = [{
      title: '名称',
      field: 'name'
    }, {
      title: '品牌',
      field: 'brandCode',
      type: 'select',
      listCode: 630406,
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: 'UI位置',
      field: 'location',
      type: 'select',
      data: [{
        key: 0,
        value: '首页推荐'
      }, {
        key: 1,
        value: '普通'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      field: 'orderNo',
      title: 'UI次序'
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
    const btnEvent = {
      // 修改
      edit: (key, item) => {
        if (!key || !key.length || !item || !item.length) {
          showWarnMsg('请选择记录');
        } else if (item[0].status === '1') {
          showWarnMsg('该状态不可修改');
        } else {
          this.props.history.push(`/biz/carSeries/addedit?code=${key[0]}`);
        }
      },
      lowerSys: (key, item) => {
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
              return lowerFrameSys(key[0]).then(() => {
                this.props.getPageData();
                showWarnMsg('操作成功');
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
      onShelfSys: (key, item) => {
        if (!key || !key.length || !item || !item.length) {
          showWarnMsg('请选择记录');
        } else if (item[0].status === '1') {
          showWarnMsg('该状态不可上架');
        } else {
          this.setState({
            selectKey: key[0],
            shelfVisible: true
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
            return fetch(630418).then(() => {
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
    };
    return (
      <div>
        {this.props.buildList({
          fields,
          btnEvent,
          pageCode: 630415
        })}
        <OnOrDownShelf
          selectKey={this.state.selectKey}
          addCode={630413}
          onOk={this.props.getPageData}
          shelfVisible={this.state.shelfVisible}
          setShelfVisible={this.setShelfVisible} />
      </div>
    );
  }
}

export default CarSeries;
