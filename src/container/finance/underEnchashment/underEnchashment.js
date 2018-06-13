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
} from '@redux/finance/underEnchashment';
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';
import EnchashmentHuilu from 'component/enchashment-huilu/enchashment-huilu';

@listWrapper(
  state => ({
    ...state.financeUnderEnchashment,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class UnderEnchashment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeList: [],
      visible: false
    };
  }
  setModalVisible = (visible) => {
    this.setState({ visible });
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'type',
      title: '角色类型',
      type: 'select',
      key: 'account_type',
      search: true
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'accountName',
      title: '户名',
      search: true
    }, {
      field: 'amount',
      title: '取现金额',
      amount: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'withdraw_status',
      search: true
    }, {
      field: 'applyUser',
      title: '申请人'
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      type: 'date',
      rangedate: ['applyDateStart', 'applyDateEnd'],
      render: dateTimeFormat,
      search: true
    }, {
      field: 'approveDatetime',
      title: '审核时间',
      type: 'date',
      rangedate: ['approveDateStart', 'approveDateEnd'],
      render: dateTimeFormat,
      search: true
    }, {
      field: 'payDatetime',
      title: '回录时间',
      type: 'date',
      rangedate: ['payDateStart', 'payDateEnd'],
      render: dateTimeFormat,
      search: true
    }];
    const btnEvent = {
      examine: (keys, items) => {
        if (!keys.length) {
          showWarnMsg('请选择记录');
        } else if (keys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else if (items[0].status !== '1') {
          showWarnMsg('状态不能审核!');
        } else {
          this.props.history.push(`/finance/underEnchashment/check?code=${keys[0]}&check=1`);
        }
      },
      huilu: (keys, items) => {
        if (!keys.length) {
          showWarnMsg('请选择记录');
        } else if (keys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          for (var i = 0; i < keys.length; i++) {
            if (items[i].status !== '3') {
              showWarnMsg(keys[i] + '状态不能回录!');
              return;
            }
          }
          this.setState({
            codeList: keys,
            visible: true
          });
        }
      },
      detail: (keys, items) => {
        if (!keys.length) {
          showWarnMsg('请选择记录');
        } else if (keys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/finance/underEnchashment/check?code=${keys[0]}`);
        }
      }
    };
    return (
      <div>
        {this.props.buildList({
          fields,
          btnEvent,
          pageCode: 802755,
          searchParams: {
            channelType: 90
          }
        })}
        <EnchashmentHuilu
          visible={this.state.visible}
          codeList={this.state.codeList}
          setModalVisible={this.setModalVisible} />
      </div>
    );
  }
}

export default UnderEnchashment;
