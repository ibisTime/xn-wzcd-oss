import React from 'react';
import { Form, Row, Col } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const resultDict = {
  0: '一致',
  1: '不一致',
  2: '库无记录'
};

export default class HomeAddrReport extends React.Component {
  getAddr(budget) {
    if (budget.applyNowAddressProvince) {
      return budget.applyNowAddressProvince + budget.applyNowAddressCity +
        budget.applyNowAddressArea + budget.applyNowAddress;
    }
    return '';
  }
  render() {
    const { report, budget } = this.props;
    let result = '';
    if (report.result_desc) {
      result = resultDict[report.result_desc.ANTIFRAUD_INFOQUERY.FamilyAddressCheck.home_address_consistence];
    }
    return (
      <Form className="detail-form-wrapper">
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='address' {...formItemLayout} label="家庭地址">
              <div className="readonly-text">{this.getAddr(budget)}</div>
            </FormItem>
          </Col>
          <Col {...col2Props}>
            <FormItem key='idNo' {...formItemLayout} label="核验结果">
              <div className="readonly-text">{resultDict[result] || ''}</div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
