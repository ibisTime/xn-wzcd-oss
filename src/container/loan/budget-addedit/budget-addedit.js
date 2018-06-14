import React from 'react';
import { Form, Spin, Row, Col, Input, Select, Collapse,
  Table, Popconfirm, Icon, Button, Upload, Modal } from 'antd';
import { formatFile, formatImg, getQueryString, showErrMsg } from 'common/js/util';
import { UPLOAD_URL, PIC_PREFIX } from 'common/js/config';
import { getQiniuToken } from 'api/general';
import GpsEdit from 'component/gps-edit/gps-edit';

const { Item } = Form;
const { Option } = Select;
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
const imgUploadBtn = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">上传</div>
  </div>
);
const fileUploadBtn = (
  <Button>
    <Icon type="upload" /> 上传
  </Button>
);

class BudgetAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      fetching: true,
      gpsSource: [{
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
      selectedRows: [],
      previewVisible: false,
      previewImage: '',
      token: '',
      rebateSource: [{
        code: 0,
        type: '应退按揭款',
        amount: '28000.00',
        bigAmount: '贰万捌仟元整',
        name: '成都恒钰汽车销售服务有限公司',
        account: '583248407800015',
        bankName: '浙江民泰成都高新支行'
      }, {
        code: 1,
        type: '应退返点1',
        amount: '28000.00',
        bigAmount: '贰万捌仟元整',
        name: '成都恒钰汽车销售服务有限公司',
        account: '583248407800015',
        bankName: '浙江民泰成都高新支行'
      }, {
        code: 2,
        type: '应退返点2',
        amount: '28000.00',
        bigAmount: '贰万捌仟元整',
        name: '成都恒钰汽车销售服务有限公司',
        account: '583248407800015',
        bankName: '浙江民泰成都高新支行'
      }]
    };
    this.gpsColumns = [{
      title: 'GPS设备号',
      dataIndex: 'gpsCode'
    }, {
      title: 'GPS类型',
      dataIndex: 'type',
      render: (v) => ({'0': '无线', '1': '有线'}[v])
    }];
    this.rebateColumns = [{
      title: '用款用途',
      dataIndex: 'type'
    }, {
      title: '金额小写',
      dataIndex: 'amount'
    }, {
      title: '金额大写',
      dataIndex: 'bigAmount'
    }, {
      title: '单位名称',
      dataIndex: 'name'
    }, {
      title: '账号',
      dataIndex: 'account'
    }, {
      title: '开户行',
      dataIndex: 'bankName'
    }];
  }
  setGpsVisible = (gpsdVisible) => {
    this.setState({ gpsdVisible });
  }
  // 获取上传按钮
  getUploadBtn(item, isImg) {
    let btn = isImg ? imgUploadBtn : fileUploadBtn;
    return item.readonly
      ? null
      : item.single
        ? this.props.form.getFieldValue(item.field)
          ? null : btn
        : btn;
  }
  setUploadFileUrl(fileList, isImg) {
    let format = isImg ? formatImg : formatFile;
    fileList.forEach(f => {
      if (!f.url && f.status === 'done' && f.response) {
        f.url = format(f.response.key);
      }
    });
  }
  // 获取文件上传的值
  normFile = (e) => {
    if (e) {
      return e.fileList.map(v => {
        if (v.status === 'done') {
          return v.key || v.response.key;
        } else if (v.status === 'error') {
          showErrMsg('文件上传失败');
        }
        return '';
      }).filter(v => v).join('||');
    }
    return '';
  }
  // 隐藏展示图片的modal
  handleCancel = () => this.setState({ previewVisible: false })
  // 显示展示图片的modal
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }
  // 文件点击事件
  handleFilePreview = (file) => {
    if (file.status === 'done') {
      let key = file.key || (file.response && file.response.key) || '';
      window.open(formatFile(key), true);
    } else {
      let msg = file.status === 'uploading' ? '文件还未上传完成' : '文件上传失败';
      showErrMsg(msg);
    }
  }
  getLabel(item) {
    return (
      <span>
        {item.title + (item.single ? '(单)' : '')}
      </span>
    );
  }
  // 获取7牛token
  getToken() {
    if (!this.tokenFetch) {
      this.tokenFetch = true;
      getQiniuToken().then(data => {
        this.setState({ token: data.uploadToken });
      }).catch(() => this.tokenFetch = false);
    }
  }
  // 获取图片上传的额外参数
  getUploadData = (file) => {
    return { token: this.state.token };
  }
  getFileComp(item, initVal, rules, getFieldDecorator, isImg) {
    let initValue = this.getFileInitVal(initVal);
    return (
      item.hidden ? null : (
        <Item key={item.field} label={this.getLabel(item)}>
          {getFieldDecorator(item.field, {
            rules,
            initialValue: initVal,
            getValueFromEvent: this.normFile
          })(
            this.check && !initValue.length && item.required
              ? <div></div>
              : (
                <Upload {...this.getUploadProps(item, initValue, isImg)}>
                  {this.getUploadBtn(item, isImg)}
                </Upload>
              )
          )}
        </Item>
      )
    );
  }
  getImgComp(item, initVal, rules, getFieldDecorator) {
    return this.getFileComp(item, initVal, rules, getFieldDecorator, true);
  }
  getUploadProps(item, initValue, isImg) {
    const commProps = {
      action: UPLOAD_URL,
      multiple: !item.single,
      defaultFileList: initValue,
      data: this.getUploadData,
      showUploadList: {
        showPreviewIcon: true,
        showRemoveIcon: !item.readonly
      }
    };
    const fileProps = {
      ...commProps,
      onChange: ({fileList}) => this.setUploadFileUrl(fileList),
      onPreview: this.handleFilePreview
    };
    const imgProps = {
      ...commProps,
      onChange: ({fileList}) => this.setUploadFileUrl(fileList, true),
      onPreview: this.handlePreview,
      listType: 'picture-card',
      accept: 'image/*'
    };
    return isImg ? imgProps : fileProps;
  }
  getFileInitVal(initVal, isImg) {
    const { token } = this.state;
    !token && this.getToken();
    let initValue = [];
    if (initVal) {
      initValue = initVal.split('||').map(key => ({
        key,
        uid: key,
        name: key,
        status: 'done',
        url: isImg ? formatImg(key) : formatFile(key),
        thumbUrl: isImg ? formatImg(key) : formatFile(key)
      }));
    }
    return initValue;
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
    let { gpsSource } = this.state;
    let idx = gpsSource.findIndex(v => v.code === params.code);
    if (idx > -1) {
      gpsSource.splice(idx, 1, params);
      this.setState({ gpsSource });
    } else {
      this.setState({
        gpsSource: [...gpsSource, params]
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
    const { gpsSource, gpsdVisible, selectedRowKeys, gpsData, previewVisible,
      previewImage, rebateSource } = this.state;
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
                  dataSource={gpsSource}
                  columns={this.gpsColumns} />
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
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'fczPic',
                    title: '房产证'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'yyzz',
                    title: '营业执照',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='xycl' label="现有车辆">
                    {getFieldDecorator('xycl', {
                      rules
                    })(<Select>
                      <Option key='1' value='自有'>自有</Option>
                      <Option key='0' value='租用'>租用</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='cdzm' label="提供场地证明">
                    {getFieldDecorator('cdzm', {
                      rules,
                      initialValue: '1'
                    })(<Select>
                      <Option key='1' value='1'>是</Option>
                      <Option key='0' value='0'>否</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='ywjz' label="有无驾照">
                    {getFieldDecorator('ywjz', {
                      rules
                    })(<Select>
                      <Option key='1' value='1'>有</Option>
                      <Option key='0' value='0'>无</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'cdzm',
                    title: '场地证明'
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'jz',
                    title: '驾照',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  <Item key='jycdmj' label="经营场地面积">
                    {getFieldDecorator('jycdmj')(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Item key='otRemark' label="其他资产说明">
                {getFieldDecorator('otRemark')(<TextArea rows={4} />)}
              </Item>
            </Panel>
            <Panel header="其他情况" key="4">
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='sqrhjd' label="申请人户籍地">
                    {getFieldDecorator('sqrhjd', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='xzdz' label="现住地址">
                    {getFieldDecorator('xzdz', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='ghrhjd' label="共还人户籍地">
                    {getFieldDecorator('ghrhjd')(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='type1' label="类型">
                    {getFieldDecorator('type1', {
                      rules
                    })(<Select>
                      <Option key='1' value='自有'>自有</Option>
                      <Option key='0' value='租用'>租用</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='dbr1hjd' label="担保1户籍地">
                    {getFieldDecorator('dbr1hjd')(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='dbr2hjd' label="担保2户籍地">
                    {getFieldDecorator('dbr2hjd', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Item key='othRemark' label="其他情况备注">
                {getFieldDecorator('othRemark')(<TextArea rows={4} />)}
              </Item>
            </Panel>
            <Panel header="收费情况" key="5">
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='yb' label="油补">
                    {getFieldDecorator('yb', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='ybgls' label="油补公里数">
                    {getFieldDecorator('ybgls', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='wsxb' label="我司续保">
                    {getFieldDecorator('wsxb', {
                      rules
                    })(<Select>
                      <Option key='1' value='是'>是</Option>
                      <Option key='0' value='否'>否</Option>
                    </Select>)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='gpssf' label="GPS收费">
                    {getFieldDecorator('gpssf', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='lybzj' label="履约保证金">
                    {getFieldDecorator('lybzj', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='gpstc' label="GPS提成">
                    {getFieldDecorator('gpstc', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='dbfxj' label="担保风险金">
                    {getFieldDecorator('dbfxj', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='gpssffs' label="GPS收费方式">
                    {getFieldDecorator('gpssffs', {
                      rules
                    })(<Select>
                      <Option key='0' value='0'>转账</Option>
                      <Option key='1' value='1'>按揭款扣</Option>
                      <Option key='2' value='2'>返点扣</Option>
                      <Option key='3' value='3'>不收费</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  <Item key='zf' label="杂费">
                    {getFieldDecorator('zf', {
                      rules
                    })(<Input />)}
                  </Item>
                </Col>
                <Col {...col2Props}>
                  <Item key='sxfsffs' label="手续费收费方式">
                    {getFieldDecorator('sxfsffs', {
                      rules
                    })(<Select>
                      <Option key='0' value='0'>转账</Option>
                      <Option key='1' value='1'>按揭款扣</Option>
                      <Option key='2' value='2'>返点扣</Option>
                      <Option key='3' value='3'>不收费</Option>
                    </Select>)}
                  </Item>
                </Col>
              </Row>
              <Item key='sxfhj' label="收客户手续费合计">
                <div className="readonly-text"></div>
              </Item>
            </Panel>
            <Panel header="返点情况" key="6">
              <Table
                bordered
                rowKey={record => record.code}
                rowSelection={rowSelection}
                dataSource={rebateSource}
                columns={this.rebateColumns} />
            </Panel>
            <Panel header="贷款材料" key="7">
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'jhzPic',
                    title: '结婚证(离婚证)'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkb',
                    title: '户口本(主贷本人页)',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'yhlsPic',
                    title: '银行流水'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'dszmPic',
                    title: '单身证明',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'srzmPic',
                    title: '收入证明'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'jzzmPic',
                    title: '居住证明',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'gffpPic',
                    title: '购房发票'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'zjfzmPic',
                    title: '自建房证明',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbPic',
                    title: '户口本（首页）'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbhzPic',
                    title: '户口本（户主页）',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbghrPic',
                    title: '共还人户口本'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbdbr1Pic',
                    title: '担保人1身份证',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbdbr1hPic',
                    title: '担保人1户口本'
                  }, null, [], getFieldDecorator)}
                </Col>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbdbr2Pic',
                    title: '担保人2身份证',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...col2Props}>
                  {this.getImgComp({
                    field: 'hkbdbr2hPic',
                    title: '担保人2户口本',
                    single: true
                  }, null, [], getFieldDecorator)}
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="图片" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(BudgetAddEdit);
