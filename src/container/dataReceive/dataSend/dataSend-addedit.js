import React from 'react';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
class DataSendAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '客户姓名',
        field: 'customerName'
    }, {
        title: '业务编号',
        field: 'bizCode'
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'logistics_type'
    }, {
        title: '发件节点',
        field: 'fromNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name'
    }, {
        title: '收件节点',
        field: 'toNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name'
    }, {
        title: '传递方式',
        field: 'sendType',
        type: 'select',
        data: [{
            key: '1',
            value: '线下'
        }, {
            key: '2',
            value: '快递'
        }],
        keyName: 'key',
        valueName: 'value',
        required: true
    }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'logistics_type'
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company'
    }, {
        title: '快递单号',
        field: 'logisticsCode'
    }, {
        title: '发件时间',
        field: 'sendDatetime',
        type: 'datetime'
    }, {
        title: '发件备注',
        field: 'sendNote'
    }];
    return this.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156
      });
  }
}

export default DataSendAddEdit;
