import {
  getQueryString,
  getUserId,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class EnchashmentsAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.check = getQueryString('check', this.props.location.search);
    this.state = {
      isRemark: false
    };
  }
  render() {
    let fields = [{
      title: '编号',
      field: 'code'
    }, {
      title: '账号',
      field: 'accountNumber',
      required: true
    }, {
      title: '户名',
      field: 'accountName',
      required: true
    }, {
      field: 'type',
      title: '账户类型',
      type: 'select',
      key: 'account_type',
      required: true
    }, {
      field: 'amount',
      title: '金额',
      amount: true
    }, {
      field: 'fee',
      title: '手续费',
      amount: true
    }, {
      field: 'channelType',
      title: '支付渠道',
      type: 'select',
      key: 'channel_type'
    }, {
      field: 'payCardInfo',
      title: '银行类型'
    }, {
      field: 'payCardNo',
      title: '银行卡号'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'jour_status'
    }, {
      field: 'applyUser',
      title: '申请人'
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      type: 'datetime'
    }, {
      field: 'applyNote',
      title: '申请说明'
    }, {
      field: 'approveUser',
      title: '审核人'
    }, {
      field: 'approveDatetime',
      title: '审核时间',
      type: 'datetime'
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
    }, {
      field: 'payUser',
      title: '回录人'
    }, {
      field: 'payDatetime',
      title: '回录时间',
      type: 'datetime'
    }, {
      field: 'payNote',
      title: '回录说明'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: true,
      detailCode: 802756
    });
  }
}