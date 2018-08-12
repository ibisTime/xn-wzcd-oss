import React from 'react';
import { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore } from '@redux/loanstools/take-enter';
import { getQueryString, showSucMsg, showWarnMsg, getUserId, getCompanyCode, moneyFormat } from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsTakeEnter, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class TakeEnter extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.isZfReason = true;
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      type: 'select',
      pageCode: 632145,
      keyName: 'code',
      valueName: '{{customerName.DATA}}-{{code.DATA}}',
      searchName: 'customerName',
      required: true
    }, {
      title: '业务类型',
      field: 'type',
      type: 'select',
      data: [{
        key: '1',
        value: '客户作废'
      }, {
        key: '2',
        value: '垫资款退回'
      }],
      keyName: 'key',
      valueName: 'value',
      onChange: (v) => {
        if(v === '1') {
          this.isZfReason = false;
        } else {
          this.isZfReason = true;
        }
      },
      required: true
    }, {
      title: '付款金额',
      field: 'zfSkAmount',
      amount: true,
      required: true
    }, {
      title: '作废原因',
      field: 'zfReason',
      hidden: this.isZfReason,
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          if (params.code) {
            this.props.doFetching();
            params.operator = getUserId();
            fetch(632280, params).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          } else {
            showWarnMsg('未选择预算单');
          }
        }
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default TakeEnter;
