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
} from '@redux/loanstools/takeEstimate';
import {
  showWarnMsg,
  moneyFormat,
  getRoleCode
} from 'common/js/util';
import { listWrapper } from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.loanstoolsTakeEstimate,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class TakeEstimate extends React.Component {
  render() {
    const fields = [{
      title: '预算单号',
      field: 'code',
      search: true
    }, {
      title: '业务公司',
      field: 'companyName',
      search: true
    }, {
      title: '打款金额',
      field: 'payAmount',
      amount: true
    }, {
      title: '垫资总额',
      field: 'dzAmount',
      amount: true
    }, {
      title: '应收金额',
      field: 'shouldCollectionAmount '
    }, {
      title: '实收金额',
      field: 'collectionAmount',
      amount: true
    }, {
      title: '收款时间',
      field: 'useDatetime',
      type: 'date'
    }, {
      title: '办理状态',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      params: {
        type: '005'
      },
      keyName: 'code',
      valueName: 'name'
    }];
    return this.props.buildList({
      fields,
      pageCode: 632108,
      searchParams: {
        roleCode: getRoleCode(),
        curNodeCodeList: ['005_04', '005_05', '005_06']
      },
      btnEvent: {
        check: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/loanstools/takeEstimate/certain?code=${selectedRowKeys[0]}`);
          }
        },
        enter: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/loanstools/takeEstimate/enter?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default TakeEstimate;
