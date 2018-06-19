import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loan/archives-addedit.js';
import {
  getQueryString,
  getUserId,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
  state => state.loaNarchivesAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class ArchivesAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '车辆信息列表',
        items: [
            [{
                title: '客户姓名',
                field: 'customerName',
                readonly: true
            }, {
                title: '业务编号',
                field: 'code',
                readonly: true
            }, {
                title: '保险公司',
                field: 'insuranceCompanyName',
                type: 'select',
                listCode: 632046,
                keyName: 'code',
                valueName: 'name'
            }],
            [{
                title: '车辆颜色',
                field: 'carColor'
            }, {
                title: '车辆品牌(品牌车型)',
                field: 'carBrand'
            }, {
                title: '车架号码',
                field: 'frameNo'
            }],
            [{
                title: '发动机号码',
                field: 'engineNo'
            }, {
                title: '交强险',
                field: 'forceInsurance',
                amount: true
            }, {
                title: '商业险合计',
                field: 'commerceInsurance',
                amount: true
            }],
            [{
                title: '保险生效日期',
                field: 'insuranceEffectDatetime',
                type: 'date'
            }, {
                title: '经办银行',
                field: 'insuranceBank',
                type: 'select',
                listCode: 632037,
                keyName: 'bankCode',
                valueName: 'bankName'
            }, {
                title: '业务员',
                field: 'saleUserName'
            }],
            [{
                title: '抵押合同编号',
                field: 'pledgeContractCode'
            }],
            [{
                title: '登记证书号',
                field: 'regCertificateCode',
                type: 'img'
            }],
            [{
                title: '其他联系人',
                field: 'otherContact'
            }, {
                title: '联系人手机',
                field: 'contactMobile',
                mobile: true
            }],
            [{
                title: '担保人姓名',
                field: 'guarantorName'
            }, {
                title: '担保人手机',
                field: 'guarantorMobile',
                mobile: true
            }],
            [{
                title: '银行卡号',
                field: 'bankCardNumber',
                bankCard: true
            }, {
                title: '对账单日',
                field: 'billDatetime',
                type: 'date'
            }, {
                title: '月还款额',
                field: 'repayMonthAmount',
                amount: true
            }],
            [{
                title: ' 首期还款金额',
                field: 'repayFirstMonthAmount',
                amount: true,
                required: 'true'
            }, {
                title: '首期还款日期',
                field: 'repayFirstMonthDatetime',
                type: 'date',
                required: 'true'
            }],
            [{
                title: '银行还款日',
                field: 'repayBankDate',
                number: true
            }, {
                title: '身份证',
                field: 'idNoPic',
                type: 'img'
            }],
            [{
                title: '已入档清单',
                field: 'fileList',
                type: 'checkbox',
                data: [{
                    key: '1',
                    value: '身份证'
                }, {
                    key: '2',
                    value: '户口本'
                }, {
                    key: '3',
                    value: '结婚证'
                }, {
                    key: '4',
                    value: '行驶证'
                }],
                keyName: 'key',
                valueName: 'value'
            }],
            [{
                title: '资料是否完善',
                field: 'isComplete',
                type: 'select',
                data: [{
                    key: '0',
                    value: '不完善'
                }, {
                    key: '1',
                    value: '完善'
                }],
                keyName: 'key',
                valueName: 'value',
                required: 'true'
            }, {
                title: '存放位置',
                field: 'storePlace',
                required: 'true'
            }],
            [{
                title: '备注',
                field: 'fileRemark'
            }]
        ]
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
            this.props.doFetching();
            params.operator = this.props.pageData.operator;
            params.operateDatetime = this.props.pageData.operateDatetime;
            params.operateDepartment = this.props.pageData.operateDepartment;
            params.operator = getUserId();
            fetch(632200, params).then(() => {
              showSucMsg('操作成功');
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
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

export default ArchivesAddedit;
