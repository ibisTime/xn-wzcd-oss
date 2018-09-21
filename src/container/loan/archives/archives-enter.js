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
                field: 'insuranceCompanyCode',
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
                field: 'carBrand',
                formatter: (v, d) => {
                    return d.carBrand + d.carModel;
                },
                readonly: true
            }, {
                title: '车架号码',
                field: 'frameNo',
                readonly: true
            }],
            [{
                title: '发动机号码',
                field: 'engineNo',
                readonly: true
            }, {
                title: '商业险合计',
                field: 'commerceInsurance',
                amount: true,
                required: true
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
                valueName: 'bankName',
                readonly: true
            }, {
                title: '业务员',
                field: 'saleUserName',
                readonly: true
            }],
            [{
                title: '登记证书号',
                field: 'regCertificateCode'
            }],
            [{
                title: '担保人姓名',
                field: 'guarantor1Name',
                readonly: !!this.props.pageData.guarantor1Name
            }, {
                title: '担保人手机',
                field: 'guarantor1Mobile',
                mobile: true,
                readonly: !!this.props.pageData.guarantor1Mobile
            }],
            [{
                title: ' 首期还款金额',
                field: 'repayFirstMonthAmount',
                amount: true,
                readonly: 'true'
            }, {
                title: '每期还款额',
                field: 'repayMonthAmount',
                amount: true,
                readonly: true
            }],
            [{
                title: '对账单日',
                field: 'billDatetime',
                readonly: true
            }, {
                title: '首期还款日期',
                field: 'repayFirstMonthDatetime',
                type: 'date',
                readonly: 'true'
            }],
            [{
                title: '已入档清单',
                field: 'fileList',
                type: 'checkbox',
                key: 'file_list',
                checkAll: true
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
                type: 'select',
                listCode: 632827,
                keyName: 'code',
                valueName: 'name',
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
