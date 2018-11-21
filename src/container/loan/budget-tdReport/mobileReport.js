import React from 'react';
import { Form, Row, Col } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const resultDict = {
  0: '一致',
  1: '不一致',
  2: '无记录'
};

export default class MobileReport extends React.Component {
  render() {
    const { report, budget } = this.props;
    let result = '';
    if (report.result_desc) {
      result = resultDict[report.result_desc.ANTIFRAUD_INFOQUERY.mobileAndNameAndIDCheck.mobile_three_element_consistence];
    }
    return (
      <Form className="detail-form-wrapper">
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='customerName' {...formItemLayout} label="姓名">
              <div className="readonly-text">{budget.customerName}</div>
            </FormItem>
          </Col>
          <Col {...col2Props}>
            <FormItem key='idNo' {...formItemLayout} label="身份证号">
              <div className="readonly-text">{budget.idNo}</div>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='mobile' {...formItemLayout} label="手机号">
              <div className="readonly-text">{budget.mobile}</div>
            </FormItem>
          </Col>
          <Col {...col2Props}>
            <FormItem key='resultMsg' {...formItemLayout} label="匹配结果">
              <div className="readonly-text">{result}</div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
