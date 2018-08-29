import React from 'react';
import { Form, Select, Input, Button, Tooltip, Icon, Spin,
  Modal, TreeSelect, Cascader } from 'antd';
import fetch from 'common/js/fetch';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import { showSucMsg, getUserId } from 'common/js/util';
import cityData from 'common/js/lib/city';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TreeNode } = TreeSelect;

const rule1 = {
  required: true,
  message: '必填字段'
};
const rule2 = {
  min: 1,
  max: 30,
  message: '请输入一个长度最多是30的字符串'
};
const rule3 = {
  pattern: /^-?\d+$/,
  message: '请输入整数'
};

@Form.create()
class CompAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      userList: []
    };
  }
  componentDidMount() {
    fetch(630066).then(userList => {
      this.setState({
        userList,
        fetching: false
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  cancelFetching() {
    this.setState({ fetching: false });
  }
  doFetching() {
    this.setState({ fetching: true });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return false;
        }
        if (values['provinceNo']) {
          let mid = values['provinceNo'].map(a => a === '全部' ? '' : a);
          ['provinceNo', 'cityNo', 'areaNo'].forEach((f, i) => {
            values[f] = mid[i];
          });
        }
        values.updater = getUserId();
        this.doFetching();
        fetch(630100, values).then((data) => {
          showSucMsg('操作成功');
          this.cancelFetching();
          this.props.addComp({
            ...values,
            code: data.code
          });
          this.hideModal();
        }).catch(() => this.cancelFetching());
    });
  }
  // 生成treeSelect结构
  renderTreeNodes(data) {
    if (!data) return null;
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} value={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} value={item.key}/>;
    });
  }
  hideModal = () => {
    this.props.setCompVisible(false);
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { fetching, userList } = this.state;
    let isCompany = getFieldValue('type') === '1';
    return (
      <Modal
        className="build-modal-detail"
        destroyOnClose
        visible={this.props.compVisible}
        title='新增公司/部门'
        onCancel={this.hideModal}
        style={{minWidth: 820}}
        footer={null}>
        <Spin spinning={fetching}>
          <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
            <FormItem key='parentCode' {...formItemLayout} label='上级'>
              {
                getFieldDecorator('parentCode', {
                  rules: [rule1],
                  initialValue: this.props.parentCode
                })(
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择"
                    allowClear
                    treeDefaultExpandAll
                  >
                    {this.renderTreeNodes(this.props.compList)}
                  </TreeSelect>
                )
              }
            </FormItem>
            <FormItem key='name' {...formItemLayout} label='名称'>
              {
                getFieldDecorator('name', {
                  rules: [rule1, rule2]
                })(<Input />)
              }
            </FormItem>
            <FormItem key='leadUserId' {...formItemLayout} label='负责人'>
              {
                getFieldDecorator('leadUserId', {
                  rules: [rule1]
                })(
                  <Select showSearch={true}
                    allowClear={true}
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    style={{width: '100%'}}
                    placeholder='请选择'>
                    {
                      userList.map(d => <Option key={d.userId} value={d.userId}>{`${d.realName}-${d.mobile}`}</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
            <FormItem key='orderNo' {...formItemLayout}
              label={
                <span>UI次序<Tooltip title='数字越小，排序越靠前'>
                  <Icon type="question-circle-o"/>
                </Tooltip></span>
              }>
              {
                getFieldDecorator('orderNo', {
                  rules: [rule1, rule3]
                })(<Input />)
              }
            </FormItem>
            <FormItem key='type' {...formItemLayout} label='类型'>
              {
                getFieldDecorator('type', {
                  rules: [rule1]
                })(
                  <Select showSearch={true}
                    allowClear={true}
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    style={{width: '100%'}}
                    placeholder='请选择'>
                    <Option key='1' value='1'>公司</Option>
                    <Option key='2' value='2'>部门</Option>
                  </Select>
                )
              }
            </FormItem>
            {
              isCompany ? <FormItem key='provinceNo' {...formItemLayout} label='区域'>
                {
                  getFieldDecorator('provinceNo', {
                    rules: [rule1]
                  })(<Cascader placeholder="请选择" options={cityData}/>)
                }
              </FormItem> : null
            }
            <FormItem key='btns' {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">确认</Button>
              <Button style={{marginLeft: 20}} onClick={this.hideModal}>取消</Button>
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default CompAdd;
