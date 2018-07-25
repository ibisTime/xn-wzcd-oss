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
  }
  render() {
    const fields = [{
      title: '客户姓名',
      field: 'customerName',
      type: 'select',
      pageCode: 632145,
      keyName: 'code',
      valueName: '{{customerName.DATA}}-{{code.DATA}}',
      searchName: 'customerName',
      required: true,
      onChange: (v, data) => {
        if (v) {
          fetch(632146, {
            code: data.code
          }).then(info => {
            this.props.setPageData({
              ...this.props.pageData,
              code: info.code,
              loanAmount: info.loanAmount,
              idNo: info.idNo,
              loanBankName: info.loanBankName
            });
          });
        } else {
          this.props.setPageData({
            ...this.props.pageData,
            code: '',
            loanAmount: '',
            idNo: '',
            loanBankName: ''
          });
        }
      }
    }, {
      field: 'code',
      hidden: true
    }, {
      title: '身份证',
      field: 'idNo',
      hidden: !this.props.pageData.idNo,
      readonly: true
    }, {
      title: '贷款银行',
      field: 'loanBankName',
      hidden: !this.props.pageData.loanBankName,
      readonly: true
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      readonly: true,
      hidden: !this.props.pageData.loanAmount,
      amount: true
    }, {
      field: 'operator',
      value: getUserId(),
      hidden: true
    }, {
      title: '收款类型',
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
      required: true
    }, {
      title: '收款金额',
      field: 'zfSkAmount',
      amount: true,
      required: true
    }, {
      title: '收款账号',
      field: 'zfSkBankcardCode',
      type: 'select',
      listCode: 632007,
      params: {
        companyCode: getCompanyCode()
      },
      keyName: 'code',
      valueName: 'bankcardNumber',
      required: true
    }, {
      title: '收款时间',
      field: 'zfSkReceiptDatetime',
      type: 'date',
      required: true
    }, {
      title: '备注',
      field: 'zfFinanceRemark'
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
            fetch(632280, params).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          } else {
            showWarnMsg('未选择用户');
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
