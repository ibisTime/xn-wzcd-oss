import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/estimate-apply';
import {
  getQueryString,
  showSucMsg,
  getUserId,
  getCompanyCode
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getCompanyBankList } from 'api/company';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.loanstoolsEstimateApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class EstimateApply extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {}
  render() {
    const fields = [{
      field: 'applyUser',
      value: getUserId(),
      hidden: true
    }, {
      title: '收款账号',
      field: 'receiptBank',
      type: 'select',
      listCode: '632007',
      params: {
        companyCode: getCompanyCode(),
        type: '1'
      },
      keyName: 'code',
      valueName: '{{bankName.DATA}} {{subbranch.DATA}} {{bankcardNumber.DATA}}'
    }, {
      title: '预算金额',
      field: 'budgetAmount',
      amount: true,
      required: true
    }, {
      title: '用款日期',
      field: 'useDatetime',
      type: 'date',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      buttons: [{
        title: '发送',
        check: true,
        handler: (params) => {
          this.props.doFetching();
          let bank = this.props.selectData.receiptBank.find(v => v.code === params.receiptBank);
          params.receiptAccount = bank.bankcardNumber;
          params.receiptBank = bank.bankName;
          params.buttonCode = 1;
          fetch(632100, params).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1500);
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
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

export default EstimateApply;
