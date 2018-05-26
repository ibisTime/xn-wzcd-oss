import React from 'react';
import { Form, Card, Spin, Row, Col, Input, Select } from 'antd';
import { getQueryString } from 'common/js/util';

const { Item } = Form;
const { options } = Select;
const colProps = { xs: 32, sm: 24, md: 12, lg: 8 };
const col3Props = { xs: 32, sm: 24, md: 24, lg: 8 };
const rules = [{
  required: true,
  message: '必填字段'
}];

class BudgetAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      fetching: true
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Card title="基础信息">
            <Row gutter={16}>
              <Col {...colProps}>
                <Item key='name' label="客户姓名">
                  <div className="readonly-text">遛弯儿</div>
                </Item>
              </Col>
              <Col {...colProps}>
                <Item key='code' label="业务编号">
                  <div className="readonly-text">sodif12324342342342</div>
                </Item>
              </Col>
              <Col {...col3Props}>
                <Item key='type' label="客户类型">
                  {getFieldDecorator('type', {
                    rules,
                    initialValue: '0'
                  })(<Select>
                    <Option key='0' value='0'>个人</Option>
                    <Option key='1' value='1'>企业</Option>
                  </Select>)}
                </Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...colProps}>
                <Item key='jxs' label="汽车经销商">
                  <div className="readonly-text">遛弯儿</div>
                </Item>
              </Col>
              <Col {...colProps}>
                <Item key='bank' label="贷款银行">
                  <div className="readonly-text">sodif12324342342342</div>
                </Item>
              </Col>
              <Col {...col3Props}>
                <Item key='price' label="厂商指导价">
                  {getFieldDecorator('price', {
                    // rules,
                    // initialValue: initVal
                  })(<Input />)}
                </Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
    );
  }
}

export default Form.create()(BudgetAddEdit);
