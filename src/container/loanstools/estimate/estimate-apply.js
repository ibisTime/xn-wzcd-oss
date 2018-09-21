import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { getUserId, getCompanyCode } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class EstimateApply extends DetailUtil {
  render() {
    const fields = [{
      field: 'applyUser',
      value: getUserId(),
      hidden: true
    }, {
      title: '收款账号',
      field: 'receiptAccount',
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
      disabledDate: (current) => {
        let todayEnd = moment().endOf('day');
        return current ? current < todayEnd || current > todayEnd.add(1, 'day') : null;
      },
      required: true
    }];
    return this.buildDetail({
      fields,
      addCode: 632100,
      okText: '发送'
    });
  }
}

export default EstimateApply;
