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
  ...state.riskGreenListAddedit,
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
class greenListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.userId = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '还款计划表',
      field: 'list',
      type: 'o2m',
      options: {
        fields: [{
          title: '业务编号',
          field: 'code'
        }, {
          title: '客户姓名',
          field: 'realName',
          formatter: (v, d) => {
            return d.user.realName;
          }
        }, {
          title: '逾期日期',
          field: 'repayDatetime',
          type: 'date'
        }, {
          title: '逾期金额',
          field: 'overdueAmount',
          amount: true
        }]
      }
    }];
    return this
      .props
      .buildList({
        fields,
        pageCode: 630540,
        searchParams: {
          userId: this.code,
          start: '0',
          limit: '10'
        }
      });
  }
}

export default greenListAddedit;
