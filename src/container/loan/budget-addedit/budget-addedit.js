import React from 'react';
import { Form, Spin, Row, Col, Input, Select, Collapse,
  Table, Popconfirm, Icon, Button } from 'antd';
import { getQueryString } from 'common/js/util';
import GpsEdit from 'component/gps-edit/gps-edit';

const { Item } = Form;
const { options } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const colProps = { xs: 32, sm: 24, md: 12, lg: 8 };
const col3Props = { xs: 32, sm: 24, md: 24, lg: 8 };
const col4Props = { xs: 32, sm: 24, md: 12, lg: 6 };
const col5Props = { xs: 32, sm: 24, md: 12, lg: 5 };
const col55Props = { xs: 32, sm: 24, md: 12, lg: 4 };
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
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
      fetching: true,
      dataSource: [{
        code: '0',
        gpsCode: '0',
        type: '1'
      }, {
        code: '1',
        gpsCode: '1',
        type: '0'
      }],
      gpsdVisible: false,
      gpsData: null,
      selectedRowKeys: [],
      selectedRows: []
    };
    this.columns = [{
      title: 'GPS设备号',
      dataIndex: 'gpsCode'
    }, {
      title: 'GPS类型',
      dataIndex: 'type',
      render: (v) => ({'0': '无线', '1': '有线'}[v])
    }];
  }
  setGpsVisible = (gpsdVisible) => {
    this.setState({ gpsdVisible });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  }
  handleAdd = () => {
    this.setGpsVisible(true);
  }
  handleEdit = () => {
    let { selectedRows } = this.state;
    if (selectedRows.length) {
      this.setState({
        gpsData: selectedRows[0],
        gpsdVisible: true
      });
    }
  }
  handleDelete = () => {
    let { selectedRowKeys } = this.state;
    if (selectedRowKeys.length) {
      this.setState({
        selectedRows: [],
        selectedRowKeys: []
      });
    }
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }
  updateGps = (params) => {
    let { dataSource } = this.state;
    let idx = dataSource.findIndex(v => v.code === params.code);
    if (idx > -1) {
      dataSource.splice(idx, 1, params);
      this.setState({ dataSource });
    } else {
      this.setState({
        dataSource: [...dataSource, params]
      });
    }
    this.setState({
      gpsData: null,
      selectedRows: [],
      selectedRowKeys: []
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, gpsdVisible, selectedRowKeys, gpsData } = this.state;
    const columns = this.columns;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio'
    };
    return (
      <div>
        <Form className="budget-addedit-form" onSubmit={this.handleSubmit}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="基础信息" key="1">
              <Row gutter={24}>
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
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>个人</Option>
                      <Option key='2' value='2'>企业</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...colProps}>
                  <Item key='jxs' label="汽车经销商">
                    {getFieldDecorator('jxs', {
                      rules,
                      initialValue: '0'
                    })(<Select>
                      <Option key='0' value='0'>a经销商</Option>
                      <Option key='1' value='1'>b经销商</Option>
                    </Select>)}
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
              <Row gutter={24}>
                <Col {...colProps}>
                  <Item key='carXh' label="车辆型号">
                    {getFieldDecorator('carXh', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...colProps}>
                  <Item key='bank' label="贷款周期(期)">
                    {getFieldDecorator('times', {
                      rules,
                      initialValue: '12'
                    })(<Select>
                      <Option key='0' value='12'>12期</Option>
                      <Option key='1' value='24'>24期</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...col3Props}>
                  <Item key='fpPrice' label="发票价格">
                    {getFieldDecorator('fpPrice', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...colProps}>
                  <Item key='buyWay' label="购车途径">
                    <div className="readonly-text">新车</div>
                  </Item>
                </Col>
                <Col {...colProps}>
                  <Item key='rateType' label="利率类型">
                    {getFieldDecorator('rateType', {
                      rules,
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>传统利率</Option>
                      <Option key='2' value='2'>建行直客</Option>
                      <Option key='3' value='3'>中行直客</Option>
                      <Option key='4' value='4'>建行直客垫资</Option>
                      <Option key='5' value='5'>中行直客垫资</Option>
                      <Option key='6' value='6'>传统利率A</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...col3Props}>
                  <Item key='loanPrice' label="贷款金额">
                    {getFieldDecorator('loanPrice', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...colProps}>
                  <Item key='search' label="是否需要贷前调查">
                    {getFieldDecorator('search', {
                      rules,
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>是</Option>
                      <Option key='0' value='0'>否</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...colProps}>
                  <Item key='rate' label="银行利率(%)">
                    <Row gutter={8}>
                      <Col span={12}>
                        <Select>
                          <Option key='1' value='3.6'>3.6</Option>
                          <Option key='2' value='2.4'>2.4</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        {getFieldDecorator('rate', {
                          rules
                        })(
                          <Input />
                        )}
                      </Col>
                    </Row>
                  </Item>
                </Col>
                <Col {...col3Props}>
                  <Item key='loanPrice' label="我司贷款成数(%)">
                    <div className="readonly-text">64</div>
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...colProps}>
                  <Item key='dz' label="是否垫资">
                    {getFieldDecorator('dz', {
                      rules,
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>是</Option>
                      <Option key='0' value='0'>否</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...colProps}>
                  <Item key='rate' label="综合利率(%)">
                    <div className="readonly-text">2.4</div>
                  </Item>
                </Col>
                <Col {...col3Props}>
                  <Item key='loanPrice' label="服务费">
                    {getFieldDecorator('fwf', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...colProps}>
                  <Item key='tx' label="厂家贴息">
                    {getFieldDecorator('tx', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...colProps}>
                </Col>
                <Col {...col3Props}>
                  <Item key='loanPrice' label="银行贷款成数(%)">
                    <div className="readonly-text">64</div>
                  </Item>
                </Col>
              </Row>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Button onClick={this.handleAdd} type="primary" style={{ marginRight: 16 }}>
                    新增
                  </Button>
                  <Button onClick={this.handleEdit} type="primary" disabled={!selectedRowKeys.length} style={{ marginRight: 16 }}>
                    修改
                  </Button>
                  <Button onClick={this.handleDelete} type="primary" disabled={!selectedRowKeys.length} style={{ marginRight: 16 }}>
                    删除
                  </Button>
                </div>
                <Table
                  bordered
                  rowKey={record => record.code}
                  rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns} />
              </div>
              <GpsEdit updateGps={this.updateGps} gpsdVisible={gpsdVisible} gpsData={gpsData} setGpsVisible={this.setGpsVisible}/>
            </Panel>
            <Panel header="职业及收入情况" key="2">
              <Row gutter={24}>
                <Col {...col4Props}>
                  <Item key='name' label="申请人就职单位">
                    {getFieldDecorator('dw', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col4Props}>
                  <Item key='code' label="申请人职务">
                    {getFieldDecorator('zw')(<Input />)}
                  </Item>
                </Col>
                <Col {...col4Props}>
                  <Item key='relation' label="申请人共还人关系">
                    <div className="readonly-text">配偶</div>
                  </Item>
                </Col>
                <Col {...col4Props}>
                  <Item key='hyzt' label="婚姻状态">
                    {getFieldDecorator('hyzt', {
                      rules
                    })(<Select>
                      <Option key='1' value='未婚'>未婚</Option>
                      <Option key='2' value='已婚'>已婚</Option>
                      <Option key='3' value='离异'>离异</Option>
                      <Option key='4' value='丧偶'>丧偶</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col5Props}>
                  <Item key='ysr' label="申请人月收入">
                    {getFieldDecorator('ysr', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='jx' label="申请人结息">
                    {getFieldDecorator('jx', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='ye' label="申请人余额">
                    {getFieldDecorator('ye', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='txysr' label="流水是否体现月收入">
                    {getFieldDecorator('txysr', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col55Props}>
                  <Item key='sfdj' label="是否打件">
                    {getFieldDecorator('sfdj', {
                      rules
                    })(<Select>
                      <Option key='1' value='0'>否</Option>
                      <Option key='2' value='1'>是</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col5Props}>
                  <Item key='ysrGhr' label="共还人月收入">
                    {getFieldDecorator('ysrGhr')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='jxGhr' label="共还人结息">
                    {getFieldDecorator('jxGhr')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='yeGhr' label="共还人余额">
                    {getFieldDecorator('yeGhr')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='txysrGhr' label="流水是否体现月收入">
                    {getFieldDecorator('txysrGhr')(<Input />)}
                  </Item>
                </Col>
                <Col {...col55Props}>
                  <Item key='sfdjGhr' label="是否打件">
                    {getFieldDecorator('sfdjGhr')(<Select>
                      <Option key='1' value='0'>否</Option>
                      <Option key='2' value='1'>是</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col5Props}>
                  <Item key='ysrDbr1' label="担保人1月收入">
                    {getFieldDecorator('ysrDbr1')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='jxDbr1' label="担保人1结息">
                    {getFieldDecorator('jxDbr1')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='yeDbr1' label="担保人1余额">
                    {getFieldDecorator('yeDbr1')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='txysrDbr1' label="流水是否体现月收入">
                    {getFieldDecorator('txysrDbr1')(<Input />)}
                  </Item>
                </Col>
                <Col {...col55Props}>
                  <Item key='sfdjDbr1' label="是否打件">
                    {getFieldDecorator('sfdjDbr1')(<Select>
                      <Option key='1' value='0'>否</Option>
                      <Option key='2' value='1'>是</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col5Props}>
                  <Item key='ysrDbr2' label="担保人2月收入">
                    {getFieldDecorator('ysrDbr2')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='jxDbr2' label="担保人2结息">
                    {getFieldDecorator('jxDbr2')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='yeDbr2' label="担保人2余额">
                    {getFieldDecorator('yeDbr2')(<Input />)}
                  </Item>
                </Col>
                <Col {...col5Props}>
                  <Item key='txysrDbr2' label="流水是否体现月收入">
                    {getFieldDecorator('txysrDbr2')(<Input />)}
                  </Item>
                </Col>
                <Col {...col55Props}>
                  <Item key='sfdjDbr2' label="是否打件">
                    {getFieldDecorator('sfdjDbr2')(<Select>
                      <Option key='1' value='0'>否</Option>
                      <Option key='2' value='1'>是</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Item key='oRemark' label="其他收入备注">
                {getFieldDecorator('oRemark')(<TextArea rows={4} />)}
              </Item>
            </Panel>
            <Panel header="资产情况" key="3">
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='fczqk' label="房产证情况">
                    {getFieldDecorator('fczqk', {
                      rules,
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>有</Option>
                      <Option key='0' value='0'>无</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='yyzz' label="营业执照">
                    {getFieldDecorator('yyzz', {
                      rules,
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>有</Option>
                      <Option key='0' value='0'>无</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
      </div>
    );
  }
}

export default Form.create()(BudgetAddEdit);
