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
} from '@redux/personalarchives/parchives';
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
  receiveGoods,
  cancelBill
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.personalarchivesParchives,
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
class parchives extends React.Component {
  render() {
    const fields = [{
      title: '姓名',
      field: 'realName',
      search: true
    }, {
      title: '工号',
      field: 'jobNo'
    }, {
      title: '性别',
      field: 'gender',
      type: 'select',
      key: 'gender'
    }, {
      title: '部门',
      field: 'departmentCode',
      type: 'select',
      listCode: 630106,
      params: {
        typeList: ['2']
      },
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '岗位',
      field: 'postCode',
      type: 'select',
      listCode: 630106,
      params: {
        typeList: ['3']
      },
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '生日',
      field: 'birthday',
      type: 'date'
    }, {
      title: '当前节点',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      keyName: 'code',
      valueName: 'name'
    }];
    return this.props.buildList({
      fields,
      deleteCode: 632801,
      pageCode: 632805,
      btnEvent: {
        companyCheck: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '015_01') {
            showWarnMsg('当前节点不是分公司总经理审批');
          } else {
            this.props.history.push(`/personalarchives/parchives/companyCheck?code=${selectedRowKeys[0]}`);
          }
        },
        check: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '015_02') {
            showWarnMsg('当前节点不是行政部审批');
          } else {
            this.props.history.push(`/personalarchives/parchives/check?code=${selectedRowKeys[0]}`);
          }
        },
        technology: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '015_03') {
            showWarnMsg('当前节点不是网络技术审批');
          } else {
            this.props.history.push(`/personalarchives/parchives/technology?code=${selectedRowKeys[0]}`);
          }
        },
        again: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].curNodeCode !== '015_04') {
            showWarnMsg('当前节点不是重新申请');
          } else {
            this.props.history.push(`/personalarchives/parchives/addedit?code=${selectedRowKeys[0]}`);
          }
        },
        apply: (selectedRowKeys, selectedRows) => {
          let code = selectedRowKeys ? selectedRowKeys[0] : '';
          if (code) {
              if (selectedRows[0].curNodeCode !== '015_04') {
                  showWarnMsg('当前节点不是重新申请');
                  return;
              }
              this.props.history.push(`/personalarchives/parchives/apply?code=${selectedRowKeys[0]}`);
          } else {
              this.props.history.push(`/personalarchives/parchives/apply`);
          }
        }
      }
    });
  }
}

export default parchives;