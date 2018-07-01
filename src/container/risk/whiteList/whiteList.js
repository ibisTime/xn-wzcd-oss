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
} from '@redux/biz/whiteList/whiteList';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getUserId,
    moneyFormat,
    dateFormat
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.bizWhiteList,
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
class WhiteList extends React.Component {
    render() {
      const fields = [
        {
          title: '客户姓名',
          field: 'realName',
          search: true,
          render: (v, d) => {
            return d.user.realName;
          }
        }, {
          title: '证件号',
          field: 'idNo',
          search: true,
          render: (v, d) => {
            return d.user.idNo;
          }
        }, {
          title: '手机号',
          field: 'mobile',
          search: true,
          render: (v, d) => {
            return d.user.mobile;
          }
        }, {
          title: '标记日期',
          field: 'repayDatetime',
          type: 'date'
        }, {
          title: '累计逾期期数(元)',
          field: 'totalOverdueCount',
          amount: true
        }
      ];
        return this.props.buildList({
            fields,
            pageCode: 630540,
            btnEvent: {
              plan: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/summary/plan?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default WhiteList;
