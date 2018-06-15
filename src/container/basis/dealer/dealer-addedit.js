import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col,
  Checkbox, Button, AutoComplete, Table, DatePicker, Card, Popconfirm } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import { getQueryString } from 'common/js/util';
import './dealer-addedit.css';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const ruleRequired = {
  required: true,
  message: '必填字段'
};
const col2Props = {xs: 32, sm: 24, md: 12, lg: 12};
const col3Props = {xs: 32, sm: 24, md: 12, lg: 8};
const col33Props = {xs: 32, sm: 24, md: 24, lg: 8};
const tabList = [{
  key: 'tab1',
  tab: '工行'
}, {
  key: 'tab2',
  tab: '中行'
}, {
  key: 'tab3',
  tab: '建行'
}];
const feeTypeList = (
  <Select>
    <Option value="1" >固定金额</Option>
    <Option value="2" >百分比</Option>
  </Select>
);
const insuAgencyList = (
  <Select>
    <Option value='1'>平台</Option>
    <Option value='2'>车行</Option>
  </Select>
);
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'select') {
      return (
        <Select>
          <Option value='1'>item1</Option>
          <Option value='2'>item2</Option>
        </Select>
      );
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`
                    }],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class DealerAddedit extends React.Component {
    constructor(props) {
      super(props);
      this.code = getQueryString('code', this.props.location.search);
      this.view = !!getQueryString('v', this.props.location.search);
      this.state = {
        data: [{
          key: '1',
          realName: 'John Brown',
          bankCode: '￥300,000.00',
          subbranch: 'New York No. 1 Lake Park',
          bankcardNumber: '23456765432213'
        }, {
          key: '2',
          realName: 'John Brown1',
          bankCode: '￥300,000.00',
          subbranch: 'New York No. 1 Lake Park',
          bankcardNumber: '23456765432213'
        }, {
          key: '3',
          realName: 'John Brown2',
          bankCode: '￥300,000.00',
          subbranch: 'New York No. 1 Lake Park',
          bankcardNumber: '23456765432213'
        }],
        tabKey: 'tab1',
        editingKey: ''
      };
      this.columns = [{
        title: '户名',
        dataIndex: 'realName'
      }, {
        title: '开户行',
        dataIndex: 'bankCode'
      }, {
        title: '开户支行',
        dataIndex: 'subbranch'
      }, {
        title: '账号',
        dataIndex: 'bankcardNumber'
      }];
      const operator = {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >保存</a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    cancelText='取消'
                    okText='确定'
                    title='确定取消吗?'
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>修改</a>
              )}
            </div>
          );
        }
      };
      if (!this.view) {
        this.columns.push(operator);
      }
    }
    componentDidMount() {
      // ajax    getListProduct().then((data) => {this.setState({data1: data});})
    }
    isEditing = (record) => {
      return record.key === this.state.editingKey;
    }
    edit(key) {
      this.setState({ editingKey: key });
    }
    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row
          });
          this.setState({ data: newData, editingKey: '' });
        } else {
          newData.push(row);
          this.setState({ data: newData, editingKey: '' });
        }
      });
    }
    cancel = () => {
      this.setState({ editingKey: '' });
    };
    onTabChange = (key) => {
      this.setState({ tabKey: key });
    }
    render() {
      const { data } = this.state;
      const RangePicker = DatePicker.RangePicker;
      const { getFieldDecorator } = this.props.form;
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell
        }
      };
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'bankCode' ? 'select' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record)
          })
        };
      });
      return (
        <Form>
          <Card title="基本信息">
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="全称">
                  {getFieldDecorator('fullName', {
                    rules: [ruleRequired]
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="简称">
                  {getFieldDecorator('abbrName', {
                    rules: [ruleRequired]
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="是否自主开发">
                  {getFieldDecorator('isSelfDevelop', {
                    rules: [ruleRequired]
                  })(
                    <Select>
                      <Option value="0" >否</Option>
                      <Option value="1" >是</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="地址">
                  {getFieldDecorator('address')(
                    <TextArea />
                  )}
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="车行经营性质">
                  {getFieldDecorator('carDealerType', {
                    rules: [ruleRequired]
                  })(
                    <Select>
                      <Option value="0" >综合店</Option>
                      <Option value="1" >4S店</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="主营品牌">
                  {getFieldDecorator('mainBrand')(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="主要联系人">
                  {getFieldDecorator('mainContact')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="联系人电话">
                  {getFieldDecorator('contactPhone')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="所属集团">
                  {getFieldDecorator('parentGroup')(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card
            style={{ marginTop: 16 }}
            title="协议政策"
            tabList={tabList}
            onTabChange={this.onTabChange}>
            <Card title='我司基准利率' type='inner'>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="12期传统利率">
                    {getFieldDecorator('platCtRate12')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="12期直客利率">
                    {getFieldDecorator('platZkRate12')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="24期传统利率">
                    {getFieldDecorator('platCtRate24')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="24期直客利率">
                    {getFieldDecorator('platZkRate24')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="36期传统利率">
                    {getFieldDecorator('platCtRate36')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="36期直客利率">
                    {getFieldDecorator('platZkRate36')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Card>
            <Card title='其他费用' type='inner' style={{ marginTop: 16 }}>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="担保费">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('assureType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('assureFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="垫资费">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('dzType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('dzFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="履约保证金">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('lyAmountType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('lyAmountFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="GPS">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('gpsType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('gpsFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="杂费">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('otherType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('otherFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="介绍费">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('introduceType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('introduceFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={54}>
                <Col {...col2Props}>
                  <FormItem label="返点税点">
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('returnPointType', {
                          rules: [ruleRequired]
                        })(feeTypeList)}
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('returnPointFee', {
                          rules: [ruleRequired]
                        })(<Input />)}
                      </Col>
                    </Row>
                  </FormItem>
                </Col>
                <Col {...col2Props}>
                  <FormItem label="是否垫资">
                    {getFieldDecorator('isDz', {
                      rules: [ruleRequired]
                    })(
                      <Select>
                        <Option value='1'>是</Option>
                        <Option value='0'>否</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Card>
            <Card title='保险代理费' type='inner' style={{ marginTop: 16 }}>
              <Row gutter={54}>
                <Col {...col3Props}>
                  <FormItem label="1年">
                    {getFieldDecorator('insuAgencyYear1Type', {
                      rules: [ruleRequired]
                    })(insuAgencyList)}
                  </FormItem>
                </Col>
                <Col {...col3Props}>
                  <FormItem label="2年">
                    {getFieldDecorator('insuAgencyYear2Type', {
                      rules: [ruleRequired]
                    })(insuAgencyList)}
                  </FormItem>
                </Col>
                <Col {...col3Props}>
                  <FormItem label="3年">
                    {getFieldDecorator('insuAgencyYear3Type', {
                      rules: [ruleRequired]
                    })(insuAgencyList)}
                  </FormItem>
                </Col>
              </Row>
            </Card>
          </Card>
          <Card title="返点帐号" style={{ marginTop: 16 }}>
            <Card title="工行" type='inner'>
              <Table
                components={components}
                columns={columns}
                dataSource={data}
                bordered
              />
            </Card>
          </Card>
            <FormItem label="合作协议有效期">
              {getFieldDecorator('range-picker', {
                rules: [ruleRequired]
              })(
                <RangePicker />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="协议状态">
              {getFieldDecorator('agreementStatus', {
                rules: [ruleRequired]
              })(
                <Select>
                  <Option value="1" >正常</Option>
                  <Option value="0" >注销</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="车商合作协议">
              {getFieldDecorator('agreementPic')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="结算方式">
              {getFieldDecorator('settleWay', {
                rules: [ruleRequired]
              })(
                <Select>
                  <Option value="0" >月结</Option>
                  <Option value="1" >季节</Option>
                  <Option value="2" >现结</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="业务区域">
              {getFieldDecorator('email')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="归属分公司">
              {getFieldDecorator('email', {
                rules: [ruleRequired]
              })(
                <Input />
              )}
            </FormItem>
        </Form>
      );
    }
}

export default Form.create()(DealerAddedit);
