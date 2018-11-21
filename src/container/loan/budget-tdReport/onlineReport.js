import React from 'react';
import { Form, Row, Col } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const consDict = {
  '0': '查询成功有数据',
  '2': '库无记录'
};
const timeDict = {
  '(0,6]': '6 年(含)以内',
  '(6,12]': '6 年(不含)以上,12 年(含)以内',
  '(12,24]': '12 年(不含)以上,24 年(含)以内',
  '(24,+)': '24 年(不含)以上',
  '库无记录': '库无记录'
};

export default class OnlineReport extends React.Component {
  render() {
    const { report } = this.props;
    let mobileDuration = {};
    if (report.result_desc) {
      mobileDuration = report.result_desc.ANTIFRAUD_INFOQUERY.mobileDuration;
    }
    return (
      <Form className="detail-form-wrapper">
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='mobile_online_time_consistence' {...formItemLayout} label="调用结果">
              <div className="readonly-text">{consDict[mobileDuration.mobile_online_time_consistence] || ''}</div>
            </FormItem>
          </Col>
          <Col {...col2Props}>
            <FormItem key='mobile_online_time_info' {...formItemLayout} label="在网时长信息">
              <div className="readonly-text">{timeDict[mobileDuration.mobile_online_time_info] || ''}</div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
