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
} from '@redux/risk/greenList-addedit';
import {listWrapper} from 'common/js/build-list';
import {getQueryString} from 'common/js/util';

@listWrapper(state => ({
  ...state.riskGreenListAddedit
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
class GreenListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code'
    }, {
      title: '客户姓名',
      field: 'realName'
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date'
    }, {
      title: '逾期金额',
      field: 'overdueAmount',
      amount: true
    }];
    return this
      .props
      .buildList({
        fields,
        pageCode: 630540,
        searchParams: {
          userId: this.code
        }
      });
  }
}

export default GreenListAddedit;
