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
} from '@redux/risk/yellowList-addedit';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(state => ({
  ...state.riskYellowListAddedit
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
class YellowListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      render: (v, d) => {
        return d.repayBiz.budgetOrder.code;
      }
    }, {
      title: '客户姓名',
      field: 'realName'
    }, {
      title: '共还人',
      field: 'ghRealName',
      render: (v, d) => {
        return d.repayBiz.budgetOrder.ghRealName;
      }
    }, {
      title: '担保人1',
      field: 'guarantor1Name',
      render: (v, d) => {
        return d.repayBiz.budgetOrder.guarantor1Name;
      }
    }, {
      title: '担保人2',
      field: 'guarantor2Name',
      render: (v, d) => {
        return d.repayBiz.budgetOrder.guarantor2Name;
      }
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date'
    }, {
      title: '逾期金额',
      field: 'restOverdueAmount',
      render: (v, d) => {
        return moneyFormat(d.repayBiz.restOverdueAmount);
      }
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

export default YellowListAddedit;
