import {
  getQueryString,
  showSucMsg,
  showWarnMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class TakeEnter extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      isZfReason: true
    };
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
        this.setState({
          isZfReason: v !== '1'
        });
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
      hidden: this.state.isZfReason,
      required: true
    }, {
      title: '打款凭证',
      field: 'billPdf',
      type: 'img',
      required: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          if (params.code) {
            this.doFetching();
            params.operator = getUserId();
            fetch(632280, params).then(() => {
              showSucMsg('操作成功');
              this.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.cancelFetching);
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