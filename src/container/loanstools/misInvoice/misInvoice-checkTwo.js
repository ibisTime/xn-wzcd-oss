import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class MisInvoiceCheckTwo extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      isRemark: false
    };
  }
  render() {
    const fields = [{
      title: '客户姓名',
      field: 'customerName',
      readonly: true
    }, {
      title: '业务编号',
      field: 'code',
      readonly: true
    }, {
      title: '身份证',
      field: 'idNo',
      readonly: true
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true,
      readonly: true
    }, {
      title: '贷款银行',
      field: 'loanBankName',
      readonly: true
    }, {
      title: '审核意见',
      field: 'approveNote',
      required: true,
      type: 'select',
      key: 'approve_note',
      onChange: (v) => {
          this.setState({
              isRemark: v === '99'
          });
      }
    }, {
        title: '备注',
        field: 'remark',
        required: true,
        hidden: !this.state.isRemark
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.operator = getUserId();
          this.doFetching();
          fetch(632232, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '重写预算单',
        handler: (param) => {
          showSucMsg('待完善');
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