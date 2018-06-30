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
            title: '业务编号',
            field: 'code',
            search: true
          }, {
            title: '贷款人',
            field: 'realName',
            search: true,
            render: (v, d) => {
              return d.user.realName;
            }
          }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date'
          }, {
            title: '清收成本(元)',
            field: 'totalFee',
            amount: true
          }, {
            title: '未还清收成本(元)',
            field: 'restTotalCost',
            amount: true
          }, {
            title: '逾期保证金(元)',
            field: 'overdueDeposit',
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
