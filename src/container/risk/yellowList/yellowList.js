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
} from '@redux/risk/yellowList';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    moneyFormat
} from 'common/js/util';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.riskYellowList,
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
class YellowList extends React.Component {
    render() {
      const fields = [
        {
          title: '客户姓名',
          field: 'realName',
          search: true
        }, {
          title: '证件号',
          field: 'idNo',
          nowrap: true
        }, {
          title: '手机号',
          field: 'mobile'
        }, {
          title: '标记日期',
          field: 'signDatetime',
          type: 'date'
        }, {
          title: '累计逾期次数',
          field: 'totalGreenCount'
        }
      ];
      return this.props.buildList({
          fields,
          rowKey: 'userId',
            pageCode: 805120,
            searchParams: {
              sign: '2'
            }
        });
    }
}

export default YellowList;
