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
} from '@redux/biz/overdueList/overdueList';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  moneyFormat
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  sendMsg
} from 'api/biz';

@listWrapper(state => ({
  ...state.bizOverdueList,
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
})
class overdueList extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      render: (v, d) => {
        return d.repayBiz.budgetOrder.code;
      }
    }, {
      title: '客户姓名',
      field: 'realName',
      render: (v, d) => {
        return d.user.realName;
      },
      search: true
    }, {
      title: '期数',
      field: 'periods'
    }, {
      title: '逾期期数',
      field: 'curPeriods',
      render: (v, d) => {
        return d.periods + '-' + v;
      }
    }, {
      title: '逾期金额',
      field: 'restOverdueAmount',
      render: (v, d) => {
        return moneyFormat(d.repayBiz.restOverdueAmount);
      }
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date'
    }, {
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name',
      search: true
  }];
    return this.props.buildList({
      fields,
      pageCode: 630540,
      searchParams: {
        // curNodeCodeList: ['022_03', '022_04', '022_05', '022_06', '022_07', '022_08']
        curNodeCodeList: ['022_03']
      },
      btnEvent: {
        message: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定发送？',
              onOk: () => {
                this.props.doFetching();
                return sendMsg(key[0], '0').then(() => {
                  this.props.cancelFetching();
                  showWarnMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        process: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '022_03') {
            showWarnMsg('当前节点不是已逾期待处理');
          } else {
            this.props.history.push(`/biz/overdueList/process?code=${selectedRowKeys[0]}`);
          }
        },
        result: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '022_03') {
            showWarnMsg('当前节点不是已逾期待处理');
          } else {
            this.props.history.push(`/biz/overdueList/result?code=${selectedRowKeys[0]}`);
          }
        },
        apply: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/overdueList/apply?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default overdueList;
