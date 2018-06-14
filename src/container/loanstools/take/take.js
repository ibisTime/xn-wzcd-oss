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
} from '@redux/loanstools/take';
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
    listWrapper
} from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanstoolsTake,
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
class take extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
            field: 'companyCode',
            search: true
        }, {
            title: '收款金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '是否垫资',
            field: 'receiptAccount',
            search: true
        }, {
            title: '收款日期',
            field: 'useDatetime',
            search: true,
            type: 'date'
        }, {
            title: '是否提交作废申请',
            field: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              entering: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/take/enter?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default take;