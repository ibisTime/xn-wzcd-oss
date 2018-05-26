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
} from '@redux/biz/carShape';
import { listWrapper } from 'common/js/build-list';
import UpDown from 'component/up-down/up-down';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { Button, Upload, Modal } from 'antd';
import { lowerFrameShape, onShelfShape } from 'api/biz';

@listWrapper(
  state => ({
    ...state.bizCarShape,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CarShape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfVisible: false,
      selectKey: ''
    };
  }
  setShelfVisible = (shelfVisible) => {
    this.setState({ shelfVisible });
  }
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      search: true,
      nowrap: true
    }, {
      title: '品牌',
      field: 'brandName',
      search: true
    }, {
      title: '车系',
      field: 'seriesName',
      search: true,
      nowrap: true
    }, {
      title: '厂商指导价',
      field: 'originalPrice',
      amount: true
    }, {
      title: '经销商参考价',
      field: 'salePrice',
      amount: true
    }, {
      title: '首付参考价',
      field: 'sfAmount',
      amount: true
    }, {
      title: 'UI位置',
      field: 'location',
      search: true,
      key: 'location'
    }, {
      title: 'UI次序',
      field: 'orderNo',
      search: true,
      key: 'order_no'
    }, {
      title: '状态',
      field: 'status',
      search: true,
      type: 'select',
      key: 'status'
    }, {
      title: '最新修改人',
      field: 'updater'
    }, {
      title: '最新修改时间',
      field: 'updateDatetime',
      type: 'datetime',
      nowrap: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    const btnEvent = {
      lowerShe: (key, item) => {
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
              return lowerFrameShape(key[0]).then(() => {
                this.props.cancelFetching();
                showWarnMsg('操作成功');
                this.props.getPageData();
              }).catch(() => {
                this.props.cancelFetching();
              });
            }
          });
        }
      },
      onShelfShe: (key, item) => {
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
      }
    };
    return (
      <div>
        {this.props.buildList({
          fields,
          btnEvent,
          pageCode: 630425
        })}
        <UpDown
          code={this.state.selectKey}
          bizCode={630423}
          updownVisible={this.state.shelfVisible}
          setModalVisible={this.setShelfVisible} />
      </div>
    );
  }
}

export default CarShape;
