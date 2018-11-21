import React from 'react';
import { Form, Row, Col } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const timesDict = {
  '[0,0.25)': '0.25 年(即 3 个月)(不含)以内',
  '[0.25,0.5)': '0.25 年(即 3 个月)以上,0.5 年(即 6 个月)(不含)以内',
  '[0.5,1)': '0.5 年(即 6 个月)以上,1 年(不 含)以内',
  '[1,2)': '1 年以上,2 年(不含)以内',
  '[2,5)': '2 年以上,5 年(不含)以内',
  '[5,10)': '5 年以上,10 年(不含)以内',
  '[10,15)': '10 年以上,15 年(不含)以内',
  '[15,20)': '15 年以上,20 年(不含)以内',
  '[24,+)': '20 年(含)以上'
};
// const consDict = {
//
// };

export default class PoliceReport extends React.Component {
  render() {
    const { report } = this.props;
    let criminalInfo = {};
    let policeMessage = {};
    if (report.result_desc) {
      criminalInfo = report.result_desc.ANTIFRAUD_INFOQUERY.criminalInfo;
      policeMessage = criminalInfo.police_message;
    }
    return (
      <Form className="detail-form-wrapper">
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='police_consistence' {...formItemLayout} label="公安不良记录调用结果">
              <div className="readonly-text">{criminalInfo.police_consistence}</div>
            </FormItem>
          </Col>
          <Col {...col2Props}>
            <FormItem key='police_criminal_msg' {...formItemLayout} label="公安不良记录犯罪描述">
              <div className="readonly-text">{policeMessage.police_criminal_msg}</div>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='police_criminal_times' {...formItemLayout} label="公安不良记录犯罪时间">
              <div className="readonly-text">{timesDict[policeMessage.police_criminal_times] || '无'}</div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
