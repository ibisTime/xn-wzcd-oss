import React from 'react';
import { Form, Row, Col } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };

export default class WzhyReport extends React.Component {
  showReport = () => {
    const { report } = this.props;
    if (report.result_desc) {
      $.showReport([ report ]);
    }
  }
  render() {
    return (
      <Form className="detail-form-wrapper">
        <Row gutter={24}>
          <Col {...col2Props}>
            <FormItem key='name' {...formItemLayout}>
              <a onClick={this.showReport}>查看报告</a>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
